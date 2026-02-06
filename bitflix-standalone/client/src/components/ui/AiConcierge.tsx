import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Circle, Brain, Trash2, ArrowLeft, Wind, Volume2, VolumeX } from "lucide-react";
import BreathworkGuide from "./BreathworkGuide";
import { useAuth } from "@/hooks/use-auth";

const INITIAL_MESSAGE = "Namaste, beautiful soul! I'm Blyss.Ai — your personalized holistic wellness companion. I integrate ancient wisdom traditions like Ayurveda, Traditional Chinese Medicine, Human Design, Mayan cosmology, and breathwork with modern understanding to support your journey toward vibrant health, abundance, and spiritual alignment. I'd love to learn about you! What brings you here today — wellness guidance, financial abundance, or exploring the BLYSS DAO ecosystem?";

interface Message {
  role: 'ai' | 'user';
  text: string;
}

interface Memory {
  id: string;
  category: string;
  insight: string;
  importance: number;
  createdAt: string;
}

export default function AiConcierge() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loadingMemories, setLoadingMemories] = useState(false);
  const [showBreathwork, setShowBreathwork] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string) => {
    if (!voiceEnabled) return;
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    setIsSpeaking(true);
    
    try {
      const response = await fetch("/api/ai/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text, 
          voice: "nova" // Natural, warm female voice
        }),
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
        
        await audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS error:", error);
      setIsSpeaking(false);
    }
  }, [voiceEnabled]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const toggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const fetchMemories = async () => {
    try {
      setLoadingMemories(true);
      const response = await fetch("/api/users/me", { credentials: "include" });
      if (!response.ok) return;
      const user = await response.json();
      if (!user?.id) return;
      
      const memResponse = await fetch(`/api/memories/${user.id}`, { credentials: "include" });
      if (memResponse.ok) {
        const data = await memResponse.json();
        setMemories(data);
      }
    } catch (error) {
      console.error("Error fetching memories:", error);
    } finally {
      setLoadingMemories(false);
    }
  };

  const deleteMemory = async (memoryId: string) => {
    try {
      const response = await fetch(`/api/memories/${memoryId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) {
        setMemories(prev => prev.filter(m => m.id !== memoryId));
      }
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  const toggleMemories = () => {
    if (!showMemories) {
      fetchMemories();
    }
    setShowMemories(!showMemories);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Only show for authenticated members - Sales AI handles non-authenticated users
  if (!isAuthenticated && !isLoading) {
    return null;
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput("");
    setIsTyping(true);

    try {
      const conversationHistory = messages.slice(1).map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));

      const response = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: messageText,
          conversationHistory
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        speak(data.reply);
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: "I'm having trouble connecting right now. Please try again in a moment." 
        }]);
      }
    } catch (error) {
      console.error("AI Concierge error:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "I apologize, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-40 group ${isOpen ? 'hidden' : 'flex'} flex-col items-center justify-center`}
        data-testid="button-ai-concierge"
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer glow pulses */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-radial from-gold/40 via-cyan-500/20 to-transparent blur-[25px] rounded-full"
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0 bg-gradient-radial from-cyan-400/30 via-emerald-500/20 to-transparent blur-[20px] rounded-full"
          />

          {/* Flower of Life SVG - animated */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute w-24 h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Central circle */}
            <motion.circle
              cx="50" cy="50" r="16"
              fill="none"
              stroke="url(#flowerGradient)"
              strokeWidth="0.8"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* 6 surrounding circles */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const x = 50 + 16 * Math.cos((angle * Math.PI) / 180);
              const y = 50 + 16 * Math.sin((angle * Math.PI) / 180);
              return (
                <motion.circle
                  key={i}
                  cx={x} cy={y} r="16"
                  fill="none"
                  stroke="url(#flowerGradient)"
                  strokeWidth="0.8"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                />
              );
            })}
            {/* Outer ring of 6 more circles */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => {
              const x = 50 + 28 * Math.cos((angle * Math.PI) / 180);
              const y = 50 + 28 * Math.sin((angle * Math.PI) / 180);
              return (
                <motion.circle
                  key={`outer-${i}`}
                  cx={x} cy={y} r="16"
                  fill="none"
                  stroke="url(#flowerGradient2)"
                  strokeWidth="0.5"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
              );
            })}
            <defs>
              <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="flowerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Inner pulsing core */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-6 h-6 bg-gradient-to-br from-gold via-cyan-400 to-emerald-400 rounded-full blur-[3px] shadow-[0_0_25px_rgba(255,215,0,0.6)]"
          />
          <motion.div
            animate={{ scale: [1, 0.85, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]"
          />

          {/* Particle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * 40, 0],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * 40, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Blyss.Ai Label */}
        <motion.div
          className="mt-1 flex flex-col items-center"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-bold text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] tracking-wider">
            Blyss.Ai
          </span>
          <span className="text-[10px] text-white/60 tracking-wide">
            Tap to Connect
          </span>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 w-[350px] h-[500px] bg-black/90 border border-cyan-500/30 shadow-2xl shadow-black flex flex-col rounded-lg overflow-hidden backdrop-blur-xl"
            data-testid="dialog-ai-concierge"
          >
            <div className="bg-gradient-to-r from-black via-emerald-900/20 to-gold/10 p-4 flex justify-between items-center border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <circle cx="50" cy="50" r="16" fill="none" stroke="url(#headerGrad)" strokeWidth="1.5" />
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <circle
                        key={i}
                        cx={50 + 16 * Math.cos((angle * Math.PI) / 180)}
                        cy={50 + 16 * Math.sin((angle * Math.PI) / 180)}
                        r="16"
                        fill="none"
                        stroke="url(#headerGrad)"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    ))}
                    <defs>
                      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm bg-gradient-to-r from-gold via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Blyss.Ai</span>
                  <span className="text-[10px] text-white/50">Holistic Wellness Companion</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleVoice}
                  className={`p-1.5 rounded transition-colors ${voiceEnabled ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-gold hover:bg-gold/10'} ${isSpeaking ? 'animate-pulse' : ''}`}
                  data-testid="button-toggle-voice"
                  title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowBreathwork(true)}
                  className="p-1.5 rounded transition-colors text-white/60 hover:text-emerald-400 hover:bg-emerald-500/10"
                  data-testid="button-open-breathwork"
                  title="Guided Breathwork"
                >
                  <Wind className="w-4 h-4" />
                </button>
                <button 
                  onClick={toggleMemories}
                  className={`p-1.5 rounded transition-colors ${showMemories ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/60 hover:text-white'}`}
                  data-testid="button-toggle-memories"
                  title="Your Memory Bank"
                >
                  <Brain className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/60 hover:text-white"
                  data-testid="button-close-ai"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showMemories ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <button 
                    onClick={() => setShowMemories(false)}
                    className="text-white/60 hover:text-white"
                    data-testid="button-back-to-chat"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-sm font-bold text-white">Your Memory Bank</h3>
                </div>
                <p className="text-xs text-white/50 mb-4">
                  Blyss.Ai remembers these insights about you to provide personalized guidance. 
                  Your data stays private within BLYSS DAO.
                </p>
                {loadingMemories ? (
                  <div className="text-center text-white/50 text-sm py-8">Loading memories...</div>
                ) : memories.length === 0 ? (
                  <div className="text-center text-white/50 text-sm py-8">
                    No memories yet. As we chat, I'll remember important things about your journey.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {memories.map((memory) => (
                      <motion.div
                        key={memory.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 group"
                        data-testid={`memory-${memory.id}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <span className="text-[10px] uppercase tracking-wider text-cyan-400/80">
                              {memory.category}
                            </span>
                            <p className="text-sm text-white/80 mt-1">{memory.insight}</p>
                          </div>
                          <button
                            onClick={() => deleteMemory(memory.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-400/60 hover:text-red-400 transition-all p-1"
                            data-testid={`button-delete-memory-${memory.id}`}
                            title="Delete this memory"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  data-testid={`message-${msg.role}-${i}`}
                >
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold/20 text-gold border border-gold/30' 
                      : 'bg-cyan-500/10 text-cyan-100 border border-cyan-500/20'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                  data-testid="status-ai-typing"
                >
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-4 py-2">
                    <motion.div 
                      className="flex gap-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Starter Questions - show when only initial message exists */}
              {messages.length <= 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2 pt-2"
                >
                  <p className="text-[10px] text-white/40 uppercase tracking-wider text-center">Tap to explore</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      { text: "Start my journey", icon: "✨", prompt: "I'd love to start my onboarding journey with you. Please guide me through your discovery questions so you can get to know me better." },
                      { text: "Health & wellness", icon: "🌿", prompt: "I'm interested in holistic health and wellness guidance. What wisdom traditions and healing modalities can you share with me?" },
                      { text: "Financial abundance", icon: "💰", prompt: "I want to improve my relationship with money and create more financial abundance. Can you help me explore this?" },
                      { text: "Human Design", icon: "🔮", prompt: "Can you explain Human Design to me and help me understand my type and strategy?" },
                      { text: "EFT Tapping", icon: "👆", prompt: "I've heard about EFT tapping. Can you explain how it works and guide me through a basic session?" },
                      { text: "Explore BLYSS DAO", icon: "🌐", prompt: "Tell me more about BLYSS DAO and how I can participate in the ecosystem." }
                    ].map((starter, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(starter.prompt)}
                        className="px-3 py-1.5 text-[11px] bg-gradient-to-r from-gold/10 to-cyan-500/10 border border-gold/20 rounded-full text-white/70 hover:text-white hover:border-gold/40 hover:from-gold/20 hover:to-cyan-500/20 transition-all"
                        data-testid={`button-starter-${idx}`}
                      >
                        <span className="mr-1">{starter.icon}</span>
                        {starter.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            )}

            <div className="p-3 border-t border-white/10 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about wellness, abundance, or BLYSS..."
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50"
                  disabled={isTyping}
                  data-testid="input-ai-message"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 p-2 rounded transition-colors disabled:opacity-50"
                  data-testid="button-send-ai"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BreathworkGuide isOpen={showBreathwork} onClose={() => setShowBreathwork(false)} />
    </>
  );
}
