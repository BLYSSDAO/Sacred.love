import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./use-auth";

interface User {
  id: string;
  username: string | null;
  profileImageUrl: string | null;
}

interface ChatParticipant {
  id: string;
  threadId: string;
  userId: string;
  role: string;
  lastReadAt: string;
  user: User;
}

interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  messageType: string;
  attachmentUrl: string | null;
  createdAt: string;
  sender: User;
}

interface ChatThread {
  id: string;
  type: "direct" | "group";
  title: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
}

export function useChat() {
  const { user, isAuthenticated } = useAuth();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const selectedThreadRef = useRef<string | null>(null);

  useEffect(() => {
    selectedThreadRef.current = selectedThread?.id || null;
  }, [selectedThread?.id]);

  const connectWebSocket = useCallback(() => {
    if (!user || wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "auth", userId: user.id }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "message":
          if (data.message.threadId === selectedThreadRef.current) {
            setMessages((prev) => [...prev, data.message]);
          }
          fetchThreads();
          break;

        case "unread_counts":
          setUnreadCounts(data.counts);
          break;
      }
    };

    socket.onclose = () => {
      wsRef.current = null;
      setTimeout(() => {
        if (user) connectWebSocket();
      }, 3000);
    };

    wsRef.current = socket;
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchThreads();
      fetchUnreadCounts();
      connectWebSocket();
    }
    return () => {
      wsRef.current?.close();
    };
  }, [isAuthenticated, user, connectWebSocket]);

  useEffect(() => {
    if (selectedThread) {
      fetchMessages(selectedThread.id);
    }
  }, [selectedThread?.id]);

  const fetchThreads = async () => {
    try {
      const res = await fetch("/api/chat/threads", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setThreads(data);
      }
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (threadId: string) => {
    try {
      const res = await fetch(`/api/chat/threads/${threadId}/messages`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        setUnreadCounts((prev) => {
          const updated = { ...prev };
          delete updated[threadId];
          return updated;
        });
        
        // Mark thread as read on server
        fetch(`/api/chat/threads/${threadId}/read`, {
          method: "POST",
          credentials: "include",
        }).catch(() => {});
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const fetchUnreadCounts = async () => {
    try {
      const res = await fetch("/api/chat/unread", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUnreadCounts(data);
      }
    } catch (error) {
      console.error("Failed to fetch unread counts:", error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedThread || sending) return false;

    setSending(true);

    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "send_message",
            threadId: selectedThread.id,
            content,
          })
        );
        return true;
      } else {
        const res = await fetch(`/api/chat/threads/${selectedThread.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content }),
        });

        if (res.ok) {
          const message = await res.json();
          setMessages((prev) => [...prev, message]);
          return true;
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
    return false;
  };

  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/chat/users/search?q=${encodeURIComponent(query)}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Failed to search users:", error);
    }
  };

  const startDirectChat = async (targetUser: User): Promise<ChatThread | null> => {
    try {
      const res = await fetch("/api/chat/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "direct",
          participantIds: [targetUser.id],
        }),
      });

      if (res.ok) {
        const thread = await res.json();
        setThreads((prev) => {
          const exists = prev.find((t) => t.id === thread.id);
          if (exists) return prev;
          return [thread, ...prev];
        });
        setSelectedThread(thread);
        return thread;
      }
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
    return null;
  };

  const createGroupChat = async (title: string, userIds: string[]): Promise<ChatThread | null> => {
    if (userIds.length === 0 || !title.trim()) return null;

    try {
      const res = await fetch("/api/chat/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "group",
          title,
          participantIds: userIds,
        }),
      });

      if (res.ok) {
        const thread = await res.json();
        setThreads((prev) => [thread, ...prev]);
        setSelectedThread(thread);
        return thread;
      }
    } catch (error) {
      console.error("Failed to create group:", error);
    }
    return null;
  };

  const getThreadDisplayName = (thread: ChatThread) => {
    if (thread.type === "group") return thread.title || "Group Chat";
    const otherParticipant = thread.participants.find((p) => p.userId !== user?.id);
    return otherParticipant?.user?.username || "Unknown";
  };

  const getThreadAvatar = (thread: ChatThread) => {
    if (thread.type === "group") return null;
    const otherParticipant = thread.participants.find((p) => p.userId !== user?.id);
    return otherParticipant?.user?.profileImageUrl;
  };

  const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);

  const clearSelectedThread = () => {
    setSelectedThread(null);
    setMessages([]);
  };

  return {
    threads,
    selectedThread,
    setSelectedThread,
    clearSelectedThread,
    messages,
    unreadCounts,
    totalUnread,
    loading,
    sending,
    searchResults,
    sendMessage,
    searchUsers,
    startDirectChat,
    createGroupChat,
    getThreadDisplayName,
    getThreadAvatar,
    user,
    isAuthenticated,
  };
}

export type { ChatThread, ChatMessage, ChatParticipant, User };
