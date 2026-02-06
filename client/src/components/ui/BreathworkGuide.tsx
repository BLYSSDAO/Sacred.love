import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Wind, Waves, Sun, Moon } from "lucide-react";

interface BreathPattern {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  cycles: number;
  color: string;
}

const BREATH_PATTERNS: BreathPattern[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Calm anxiety and focus the mind",
    icon: Wind,
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    cycles: 4,
    color: "cyan"
  },
  {
    id: "relaxing",
    name: "4-7-8 Relaxing Breath",
    description: "Deep relaxation and sleep preparation",
    icon: Moon,
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    cycles: 4,
    color: "purple"
  },
  {
    id: "energizing",
    name: "Energizing Breath",
    description: "Increase alertness and energy",
    icon: Sun,
    inhale: 4,
    hold1: 0,
    exhale: 2,
    hold2: 0,
    cycles: 10,
    color: "gold"
  },
  {
    id: "coherent",
    name: "Coherent Breathing",
    description: "Heart-brain coherence and balance",
    icon: Waves,
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    cycles: 6,
    color: "emerald"
  }
];

type Phase = 'idle' | 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'complete';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BreathworkGuide({ isOpen, onClose }: Props) {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const cancelRef = useRef(false);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { text: string; glow: string; bg: string }> = {
      cyan: { text: "text-cyan-400", glow: "from-cyan-400/40", bg: "bg-cyan-500/20" },
      purple: { text: "text-purple-400", glow: "from-purple-400/40", bg: "bg-purple-500/20" },
      gold: { text: "text-gold", glow: "from-gold/40", bg: "bg-gold/20" },
      emerald: { text: "text-emerald-400", glow: "from-emerald-400/40", bg: "bg-emerald-500/20" }
    };
    return colors[color] || colors.gold;
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      case 'complete': return 'Complete';
      default: return 'Ready';
    }
  };

  const runBreathCycle = useCallback(async (pattern: BreathPattern) => {
    cancelRef.current = false;
    
    for (let cycle = 0; cycle < pattern.cycles; cycle++) {
      if (cancelRef.current) return;
      setCurrentCycle(cycle + 1);
      
      // Inhale
      setPhase('inhale');
      for (let i = pattern.inhale; i > 0; i--) {
        if (cancelRef.current) return;
        setCount(i);
        await new Promise(r => setTimeout(r, 1000));
      }
      
      // Hold 1
      if (pattern.hold1 > 0) {
        setPhase('hold1');
        for (let i = pattern.hold1; i > 0; i--) {
          if (cancelRef.current) return;
          setCount(i);
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      
      // Exhale
      setPhase('exhale');
      for (let i = pattern.exhale; i > 0; i--) {
        if (cancelRef.current) return;
        setCount(i);
        await new Promise(r => setTimeout(r, 1000));
      }
      
      // Hold 2
      if (pattern.hold2 > 0) {
        setPhase('hold2');
        for (let i = pattern.hold2; i > 0; i--) {
          if (cancelRef.current) return;
          setCount(i);
          await new Promise(r => setTimeout(r, 1000));
        }
      }
    }
    
    setPhase('complete');
    setIsPlaying(false);
  }, []);

  const startBreathwork = () => {
    if (!selectedPattern) return;
    setIsPlaying(true);
    setCurrentCycle(0);
    runBreathCycle(selectedPattern);
  };

  const stopBreathwork = () => {
    cancelRef.current = true;
    setIsPlaying(false);
    setPhase('idle');
    setCount(0);
    setCurrentCycle(0);
  };

  useEffect(() => {
    if (!isOpen) {
      stopBreathwork();
      setSelectedPattern(null);
    }
  }, [isOpen]);

  const getFlowerScale = () => {
    if (phase === 'inhale') return 1.3;
    if (phase === 'exhale') return 0.8;
    return 1;
  };

  const getGlowOpacity = () => {
    if (phase === 'inhale') return 0.8;
    if (phase === 'exhale') return 0.3;
    return 0.5;
  };

  const colors = selectedPattern ? getColorClasses(selectedPattern.color) : getColorClasses('gold');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0f] border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white" data-testid="text-breathwork-title">
                Guided Breathwork
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors"
                data-testid="button-close-breathwork"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {!selectedPattern ? (
                /* Pattern Selection */
                <div className="space-y-4">
                  <p className="text-white/60 text-center mb-6" data-testid="text-breathwork-intro">
                    Select a breathing practice to begin your journey
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {BREATH_PATTERNS.map((pattern) => {
                      const patternColors = getColorClasses(pattern.color);
                      return (
                        <button
                          key={pattern.id}
                          onClick={() => setSelectedPattern(pattern)}
                          className={`p-4 bg-white/[0.02] border border-white/10 rounded-lg text-left hover:border-white/30 transition-all`}
                          data-testid={`button-pattern-${pattern.id}`}
                        >
                          <pattern.icon className={`w-8 h-8 ${patternColors.text} mb-3`} />
                          <h3 className="text-white font-medium mb-1">{pattern.name}</h3>
                          <p className="text-white/40 text-sm">{pattern.description}</p>
                          <p className={`text-xs mt-2 ${patternColors.text}`}>
                            {pattern.inhale}s in • {pattern.hold1 > 0 ? `${pattern.hold1}s hold • ` : ''}{pattern.exhale}s out
                            {pattern.hold2 > 0 ? ` • ${pattern.hold2}s hold` : ''}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Breathing Exercise */
                <div className="text-center">
                  {/* Back button */}
                  {!isPlaying && phase !== 'complete' && (
                    <button
                      onClick={() => setSelectedPattern(null)}
                      className="absolute top-4 left-4 text-white/50 hover:text-white text-sm"
                      data-testid="button-back-patterns"
                    >
                      ← Back
                    </button>
                  )}

                  <h3 className={`text-xl font-bold ${colors.text} mb-2`} data-testid="text-pattern-name">
                    {selectedPattern.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-8" data-testid="text-cycle-info">
                    {currentCycle > 0 ? `Cycle ${currentCycle} of ${selectedPattern.cycles}` : selectedPattern.description}
                  </p>

                  {/* Animated Flower of Life */}
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    {/* Outer glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-radial ${colors.glow} to-transparent blur-3xl rounded-full`}
                      animate={{ 
                        scale: getFlowerScale(),
                        opacity: getGlowOpacity()
                      }}
                      transition={{ duration: phase === 'idle' ? 0.3 : (phase === 'inhale' ? selectedPattern.inhale : selectedPattern.exhale), ease: "easeInOut" }}
                    />

                    {/* Flower of Life SVG */}
                    <motion.svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full"
                      animate={{ 
                        scale: getFlowerScale(),
                        rotate: isPlaying ? 360 : 0
                      }}
                      transition={{ 
                        scale: { duration: phase === 'idle' ? 0.3 : (phase === 'inhale' ? selectedPattern.inhale : selectedPattern.exhale), ease: "easeInOut" },
                        rotate: { duration: 60, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      <defs>
                        <linearGradient id="breathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={selectedPattern.color === 'gold' ? '#D4AF37' : selectedPattern.color === 'cyan' ? '#22D3EE' : selectedPattern.color === 'purple' ? '#A855F7' : '#34D399'} />
                          <stop offset="100%" stopColor={selectedPattern.color === 'gold' ? '#F59E0B' : selectedPattern.color === 'cyan' ? '#06B6D4' : selectedPattern.color === 'purple' ? '#EC4899' : '#10B981'} />
                        </linearGradient>
                      </defs>
                      
                      {/* Central circle */}
                      <motion.circle
                        cx="50" cy="50" r="16"
                        fill="none"
                        stroke="url(#breathGradient)"
                        strokeWidth="1"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
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
                            stroke="url(#breathGradient)"
                            strokeWidth="0.8"
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                          />
                        );
                      })}
                      
                      {/* Outer ring */}
                      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
                        const x = 50 + 28 * Math.cos((angle * Math.PI) / 180);
                        const y = 50 + 28 * Math.sin((angle * Math.PI) / 180);
                        return (
                          <motion.circle
                            key={`outer-${i}`}
                            cx={x} cy={y} r="16"
                            fill="none"
                            stroke="url(#breathGradient)"
                            strokeWidth="0.5"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                          />
                        );
                      })}
                    </motion.svg>

                    {/* Count display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        key={count}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-5xl font-bold ${colors.text}`}
                        data-testid="text-count"
                      >
                        {phase !== 'idle' && phase !== 'complete' ? count : ''}
                      </motion.span>
                      <span className="text-white/60 text-lg mt-2" data-testid="text-phase">
                        {getPhaseText()}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    {!isPlaying && phase !== 'complete' && (
                      <button
                        onClick={startBreathwork}
                        className={`px-8 py-3 ${colors.bg} ${colors.text} font-medium rounded-lg flex items-center gap-2 hover:opacity-80 transition-opacity`}
                        data-testid="button-start-breathwork"
                      >
                        <Play className="w-5 h-5" />
                        Begin
                      </button>
                    )}
                    {isPlaying && (
                      <button
                        onClick={stopBreathwork}
                        className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-white/20 transition-colors"
                        data-testid="button-stop-breathwork"
                      >
                        <Pause className="w-5 h-5" />
                        Stop
                      </button>
                    )}
                    {phase === 'complete' && (
                      <div className="space-y-4">
                        <p className="text-emerald-400 text-lg" data-testid="text-practice-complete">Practice complete! Well done.</p>
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={startBreathwork}
                            className={`px-6 py-2 ${colors.bg} ${colors.text} font-medium rounded-lg`}
                            data-testid="button-repeat"
                          >
                            Repeat
                          </button>
                          <button
                            onClick={() => {
                              stopBreathwork();
                              setSelectedPattern(null);
                            }}
                            className="px-6 py-2 bg-white/10 text-white font-medium rounded-lg"
                            data-testid="button-new-pattern"
                          >
                            Try Another
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
