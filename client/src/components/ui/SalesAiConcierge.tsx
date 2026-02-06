import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const INITIAL_MESSAGE = "Hello, beautiful seeker! I'm your BLYSS Guide — here to help you discover which path is right for your journey. Whether you're drawn to wellness and community connection through Blyss.love, or ready to co-create and invest through the BlyssDAO Mothership, I can answer any questions you have. What calls to you most — holistic wellness, community events, creating and earning, or building the regenerative economy?";

const SUGGESTED_PROMPTS = [
  { text: "What's the difference between Community and DAO membership?", icon: "🌟" },
  { text: "What wellness features does Blyss.AI offer?", icon: "🧘" },
  { text: "How can I earn as a Creator?", icon: "💰" },
  { text: "Tell me about the investment opportunities", icon: "📈" },
  { text: "What events and retreats do you offer?", icon: "🌍" },
  { text: "What's included in each membership tier?", icon: "✨" },
];

interface Message {
  role: 'ai' | 'user';
  text: string;
}

export default function SalesAiConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isTyping) return;

    setShowPrompts(false);
    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput("");
    setIsTyping(true);

    try {
      const conversationHistory = messages.slice(1).map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));

      const response = await fetch("/api/ai/sales-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          conversationHistory
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: "I'm having trouble connecting right now. Please try again in a moment, or explore our membership options directly!" 
        }]);
      }
    } catch (error) {
      console.error("Sales AI error:", error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "I apologize, I encountered an error. Feel free to explore our membership tiers while I get reconnected!" 
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

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-40 group ${isOpen ? 'hidden' : 'flex'} flex-col items-center justify-center`}
        data-testid="button-sales-ai"
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
              stroke="url(#salesFlowerGradient)"
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
                  stroke="url(#salesFlowerGradient)"
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
                  stroke="url(#salesFlowerGradient2)"
                  strokeWidth="0.5"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
              );
            })}
            <defs>
              <linearGradient id="salesFlowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="salesFlowerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50 w-[350px] h-[500px] bg-black/90 border border-cyan-500/30 shadow-2xl shadow-black flex flex-col rounded-lg overflow-hidden backdrop-blur-xl"
            data-testid="modal-sales-ai"
          >
            <div className="flex items-center justify-between p-4 border-b border-gold/20 bg-gradient-to-r from-gold/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">BLYSS Guide</h3>
                  <p className="text-xs text-gold/80">Your path to transformation</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-testid="button-close-sales-ai"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-gold to-amber-500 text-black' 
                      : 'bg-white/10 text-white border border-white/10'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-gold rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gold rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gold rounded-full"
                    />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {showPrompts && messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-white/50 mb-2">Common questions:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handlePromptClick(prompt.text)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-full text-xs text-white/70 hover:text-white transition-all flex items-center gap-1"
                      data-testid={`button-prompt-${i}`}
                    >
                      <span>{prompt.icon}</span>
                      <span className="truncate max-w-[150px]">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-gold/20 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about membership, features, benefits..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold/50"
                  data-testid="input-sales-message"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-gold to-amber-500 text-black px-4 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
                  data-testid="button-send-sales"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-3 flex justify-center">
                <Link href="/join">
                  <button className="text-xs text-gold hover:text-gold/80 flex items-center gap-1 transition-colors" data-testid="link-view-membership">
                    View Membership Options
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
