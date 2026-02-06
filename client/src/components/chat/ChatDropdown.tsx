import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat, type ChatThread, type User, type ChatMessage } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  Plus,
  Users,
  Search,
  ArrowLeft,
  X,
  Paperclip,
  Video,
  Image as ImageIcon,
  Play,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

type View = "threads" | "chat" | "new" | "newGroup";

export default function ChatDropdown() {
  const {
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
  } = useChat();

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("threads");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (selectedThread) {
      setView("chat");
    }
  }, [selectedThread]);

  if (!isAuthenticated) return null;

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    const content = messageInput;
    setMessageInput("");
    await sendMessage(content);
  };

  const handleSelectThread = (thread: ChatThread) => {
    setSelectedThread(thread);
    setView("chat");
  };

  const handleStartDirect = async (targetUser: User) => {
    await startDirectChat(targetUser);
    setSearchQuery("");
    setView("chat");
  };

  const handleCreateGroup = async () => {
    if (!newGroupTitle.trim() || selectedUsers.length === 0) return;
    await createGroupChat(newGroupTitle, selectedUsers.map((u) => u.id));
    setNewGroupTitle("");
    setSelectedUsers([]);
    setSearchQuery("");
    setView("chat");
  };

  const handleBack = () => {
    if (view === "chat") {
      clearSelectedThread();
      setView("threads");
    } else if (view === "new" || view === "newGroup") {
      setSearchQuery("");
      setSelectedUsers([]);
      setNewGroupTitle("");
      setView("threads");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedThread) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Only images and videos are allowed");
      return;
    }

    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File too large. Max ${isVideo ? "50MB" : "10MB"}`);
      return;
    }

    setUploading(true);

    try {
      // Request upload URL
      const urlRes = await fetch("/api/chat/upload-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: file.name,
          size: file.size,
          contentType: file.type,
        }),
      });

      if (!urlRes.ok) {
        const err = await urlRes.json();
        throw new Error(err.error || "Failed to get upload URL");
      }

      const { uploadURL, objectPath, mediaType } = await urlRes.json();

      // Upload directly to storage
      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }

      // Send message with media attachment
      const msgRes = await fetch(`/api/chat/threads/${selectedThread.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: isVideo ? "Sent a video" : "Sent an image",
          messageType: mediaType,
          attachmentUrl: objectPath,
        }),
      });

      if (!msgRes.ok) {
        throw new Error("Failed to send media message");
      }

      toast.success(`${isVideo ? "Video" : "Image"} sent!`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const renderMessageContent = (msg: ChatMessage) => {
    const isOwn = msg.senderId === user?.id;

    if (msg.messageType === "video" && msg.attachmentUrl) {
      return (
        <div className={`rounded-xl overflow-hidden ${isOwn ? "rounded-tr-sm" : "rounded-tl-sm"}`}>
          <video
            src={msg.attachmentUrl}
            controls
            className="max-w-full max-h-48 rounded-lg"
            preload="metadata"
          />
          {msg.content && msg.content !== "Sent a video" && (
            <p className={`text-sm mt-1 ${isOwn ? "text-black" : "text-white"}`}>{msg.content}</p>
          )}
        </div>
      );
    }

    if (msg.messageType === "image" && msg.attachmentUrl) {
      return (
        <div className={`rounded-xl overflow-hidden ${isOwn ? "rounded-tr-sm" : "rounded-tl-sm"}`}>
          <img
            src={msg.attachmentUrl}
            alt="Shared image"
            className="max-w-full max-h-48 rounded-lg cursor-pointer"
            onClick={() => window.open(msg.attachmentUrl!, "_blank")}
          />
          {msg.content && msg.content !== "Sent an image" && (
            <p className={`text-sm mt-1 ${isOwn ? "text-black" : "text-white"}`}>{msg.content}</p>
          )}
        </div>
      );
    }

    return <span>{msg.content}</span>;
  };

  const renderThreadList = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-gold/20">
        <h3 className="text-gold font-semibold">Messages</h3>
        <Button
          size="sm"
          variant="ghost"
          className="text-gold hover:bg-gold/10"
          onClick={() => setView("new")}
          data-testid="button-new-chat-dropdown"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="p-4 text-center text-white/50">Loading...</div>
        ) : threads.length === 0 ? (
          <div className="p-4 text-center text-white/50">
            <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
            <Button
              size="sm"
              className="mt-3 bg-gold text-black hover:bg-gold/90"
              onClick={() => setView("new")}
              data-testid="button-start-chat-empty"
            >
              Start a Chat
            </Button>
          </div>
        ) : (
          threads.map((thread) => (
            <div
              key={thread.id}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5"
              onClick={() => handleSelectThread(thread)}
              data-testid={`dropdown-thread-${thread.id}`}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={getThreadAvatar(thread) || undefined} />
                  <AvatarFallback className="bg-gold/20 text-gold text-sm">
                    {thread.type === "group" ? (
                      <Users className="w-4 h-4" />
                    ) : (
                      getThreadDisplayName(thread)[0]?.toUpperCase() || "?"
                    )}
                  </AvatarFallback>
                </Avatar>
                {unreadCounts[thread.id] > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[10px] rounded-full flex items-center justify-center font-bold">
                    {unreadCounts[thread.id]}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium truncate">
                    {getThreadDisplayName(thread)}
                  </span>
                  {thread.lastMessage && (
                    <span className="text-white/40 text-xs">
                      {formatDistanceToNow(new Date(thread.lastMessage.createdAt), {
                        addSuffix: false,
                      })}
                    </span>
                  )}
                </div>
                {thread.lastMessage && (
                  <p className="text-white/50 text-xs truncate">
                    {thread.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );

  const renderChatView = () => {
    if (!selectedThread) return null;

    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 p-3 border-b border-gold/20">
          <Button
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-gold p-1"
            onClick={handleBack}
            data-testid="button-chat-back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src={getThreadAvatar(selectedThread) || undefined} />
            <AvatarFallback className="bg-gold/20 text-gold text-xs">
              {selectedThread.type === "group" ? (
                <Users className="w-3 h-3" />
              ) : (
                getThreadDisplayName(selectedThread)[0]?.toUpperCase() || "?"
              )}
            </AvatarFallback>
          </Avatar>
          <span className="text-white text-sm font-medium truncate flex-1">
            {getThreadDisplayName(selectedThread)}
          </span>
        </div>

        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((msg) => {
              const isOwn = msg.senderId === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${isOwn ? "flex-row-reverse" : ""}`}>
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      <AvatarImage src={msg.sender.profileImageUrl || undefined} />
                      <AvatarFallback className="bg-gold/20 text-gold text-[10px]">
                        {msg.sender.username?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`px-3 py-2 rounded-xl text-sm ${
                          isOwn
                            ? "bg-gold text-black rounded-tr-sm"
                            : "bg-white/10 text-white rounded-tl-sm"
                        }`}
                      >
                        {renderMessageContent(msg)}
                      </div>
                      <span className={`text-white/40 text-[10px] mt-1 block ${isOwn ? "text-right" : ""}`}>
                        {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-gold/20">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            data-testid="input-file-upload"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white/70 hover:text-gold h-9 px-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              title="Send photo or video"
              data-testid="button-attach-media"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Paperclip className="w-4 h-4" />
              )}
            </Button>
            <Input
              placeholder="Type a message..."
              className="bg-black/50 border-gold/30 text-white text-sm h-9 flex-1"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              data-testid="input-dropdown-message"
            />
            <Button
              size="sm"
              className="bg-gold text-black hover:bg-gold/90 h-9 px-3"
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || sending}
              data-testid="button-dropdown-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderNewChat = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-3 border-b border-gold/20">
        <Button
          size="sm"
          variant="ghost"
          className="text-white/70 hover:text-gold p-1"
          onClick={handleBack}
          data-testid="button-new-chat-back"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-gold font-semibold">New Conversation</span>
      </div>

      <div className="p-3 border-b border-gold/10">
        <div className="flex gap-2 mb-3">
          <Button
            size="sm"
            variant={view === "new" ? "default" : "ghost"}
            className={view === "new" ? "bg-gold text-black" : "text-white/70"}
            onClick={() => setView("new")}
          >
            Direct
          </Button>
          <Button
            size="sm"
            variant={view === "newGroup" ? "default" : "ghost"}
            className={view === "newGroup" ? "bg-gold text-black" : "text-white/70"}
            onClick={() => setView("newGroup")}
          >
            Group
          </Button>
        </div>

        {view === "newGroup" && (
          <Input
            placeholder="Group name..."
            className="bg-black/50 border-gold/30 text-white text-sm h-9 mb-3"
            value={newGroupTitle}
            onChange={(e) => setNewGroupTitle(e.target.value)}
            data-testid="input-dropdown-group-name"
          />
        )}

        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            placeholder="Search members..."
            className="pl-8 bg-black/50 border-gold/30 text-white text-sm h-9"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchUsers(e.target.value);
            }}
            data-testid="input-dropdown-search-users"
          />
        </div>
      </div>

      {view === "newGroup" && selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-1 p-3 border-b border-gold/10">
          {selectedUsers.map((u) => (
            <Badge
              key={u.id}
              className="bg-gold/20 text-gold cursor-pointer text-xs"
              onClick={() => setSelectedUsers((prev) => prev.filter((p) => p.id !== u.id))}
            >
              {u.username} ×
            </Badge>
          ))}
        </div>
      )}

      <ScrollArea className="flex-1">
        {searchResults
          .filter((u) => !selectedUsers.some((s) => s.id === u.id))
          .map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5"
              onClick={() => {
                if (view === "newGroup") {
                  setSelectedUsers((prev) => [...prev, u]);
                } else {
                  handleStartDirect(u);
                }
              }}
              data-testid={`dropdown-user-${u.id}`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={u.profileImageUrl || undefined} />
                <AvatarFallback className="bg-gold/20 text-gold text-xs">
                  {u.username?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-white text-sm">{u.username || "Unknown"}</span>
            </div>
          ))}
        {searchQuery.length >= 2 && searchResults.length === 0 && (
          <p className="text-white/50 text-center py-4 text-sm">No users found</p>
        )}
      </ScrollArea>

      {view === "newGroup" && selectedUsers.length > 0 && (
        <div className="p-3 border-t border-gold/20">
          <Button
            className="w-full bg-gold text-black hover:bg-gold/90"
            onClick={handleCreateGroup}
            disabled={!newGroupTitle.trim()}
            data-testid="button-dropdown-create-group"
          >
            <Users className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white/70 hover:text-gold transition-colors"
        data-testid="button-chat-dropdown"
      >
        <MessageCircle className="w-5 h-5" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-[10px] rounded-full flex items-center justify-center font-bold">
            {totalUnread > 9 ? "9+" : totalUnread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 h-[480px] bg-black/95 backdrop-blur-xl border border-gold/30 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {view === "threads" && renderThreadList()}
            {view === "chat" && renderChatView()}
            {(view === "new" || view === "newGroup") && renderNewChat()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
