import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles, Wallet, Users, TrendingUp, Award, Shield, 
  ChevronRight, ChevronLeft, X, Coins, Crown, Zap, 
  Star, CheckCircle, ArrowRight, Globe, Play, BookOpen, Video, User
} from "lucide-react";

const ONBOARDING_KEY = "blyss_onboarding_completed";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: typeof Sparkles;
  color: string;
  content: React.ReactNode;
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to BLYSS DAO",
    description: "Your gateway to conscious investing and regenerative finance",
    icon: Sparkles,
    color: "gold",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          BLYSS DAO is a Web3 health-tech and wellness investment ecosystem that operates as 
          a "venture mothership" - an active incubator for regenerative finance, biotech, and 
          immersive media projects.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-gold">$2.8M+</div>
            <div className="text-xs text-gray-400">Total Value Locked</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">450+</div>
            <div className="text-xs text-gray-400">Active Members</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-400">Dedicated</div>
            <div className="text-xs text-gray-400">To Jaguar Alliance</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">4</div>
            <div className="text-xs text-gray-400">Ecosystem Projects</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tiers",
    title: "Membership Tiers",
    description: "NFT-based memberships with exclusive benefits",
    icon: Crown,
    color: "gold",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          Mint an NFT membership to unlock exclusive features, profit sharing, and governance rights.
        </p>
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Builder</div>
              <div className="text-xs text-gray-400">5% profit share • 2 pools access</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Founding Member</div>
              <div className="text-xs text-gray-400">10% profit share • Governance voting</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-lg p-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Founder Pass</div>
              <div className="text-xs text-gray-400">30% profit share • All pools • Exclusive deals</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "features",
    title: "Explore Key Features",
    description: "Discover what you can do in the BLYSS ecosystem",
    icon: TrendingUp,
    color: "emerald",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-2">
              <Coins className="w-5 h-5 text-gold" />
            </div>
            <div className="font-medium text-white text-sm">Liquidity Pools</div>
            <div className="text-xs text-gray-400 mt-1">Stake & earn up to 22% APY</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="font-medium text-white text-sm">Social Trading</div>
            <div className="text-xs text-gray-400 mt-1">Follow vetted traders</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div className="font-medium text-white text-sm">BLYSS Academy</div>
            <div className="text-xs text-gray-400 mt-1">Learn Web3 & trading</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div className="font-medium text-white text-sm">Community</div>
            <div className="text-xs text-gray-400 mt-1">Events, forums & more</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "biography",
    title: "Create Your Biography",
    description: "Tell your story with an AI-generated video",
    icon: Video,
    color: "purple",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          Stand out in the BLYSS community by creating your personalized member biography 
          with AI-powered video generation.
        </p>
        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3">
            <User className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-white text-sm">Share Your Story</div>
              <div className="text-xs text-gray-400">Tell us about your background, interests, and what brings you to BLYSS</div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3">
            <Video className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-white text-sm">Upload Your Video</div>
              <div className="text-xs text-gray-400">Record a short intro video of yourself (30 sec - 2 min)</div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-white text-sm">AI Enhancement</div>
              <div className="text-xs text-gray-400">Our AI creates a professional biography video with scripts and overlays</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-4 mt-4">
          <p className="text-xs text-gray-300">
            Your public profile page will be available at <span className="text-gold">/member/your-username</span> for other members to discover.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "getstarted",
    title: "You're Ready!",
    description: "Start your journey with BLYSS DAO",
    icon: Play,
    color: "gold",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 leading-relaxed">
          You're all set to explore the BLYSS ecosystem. Here's what we recommend:
        </p>
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">1</div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Create your member biography</div>
              <div className="text-xs text-gray-400">Share your story with the BLYSS community</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">2</div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Explore membership tiers</div>
              <div className="text-xs text-gray-400">Visit the Membership page to choose your tier</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">3</div>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">Visit the Academy</div>
              <div className="text-xs text-gray-400">Learn about Web3, trading, and our ecosystem</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/30 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 text-gold font-medium text-sm mb-1">
            <BookOpen className="w-4 h-4" />
            Pro Tip
          </div>
          <p className="text-xs text-gray-300">
            You can restart this tutorial anytime from the help menu or by clicking the guide icon.
          </p>
        </div>
      </div>
    ),
  },
];

interface OnboardingContextType {
  showOnboarding: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  restartOnboarding: () => void;
  dismissOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === "true";
  });
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      const timer = setTimeout(() => setShowOnboarding(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedOnboarding]);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setHasCompletedOnboarding(true);
    setShowOnboarding(false);
  };

  const restartOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setHasCompletedOnboarding(false);
    setShowOnboarding(true);
  };

  const dismissOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <OnboardingContext.Provider value={{
      showOnboarding,
      hasCompletedOnboarding,
      completeOnboarding,
      restartOnboarding,
      dismissOnboarding,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}

interface OnboardingTutorialProps {
  isOpen: boolean;
  onComplete: () => void;
  onDismiss: () => void;
}

export default function OnboardingTutorial({ isOpen, onComplete, onDismiss }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);
  
  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    gold: { bg: "from-gold/20 to-amber-900/20", border: "border-gold/30", text: "text-gold" },
    blue: { bg: "from-blue-500/20 to-blue-900/20", border: "border-blue-500/30", text: "text-blue-400" },
    emerald: { bg: "from-emerald-500/20 to-emerald-900/20", border: "border-emerald-500/30", text: "text-emerald-400" },
    purple: { bg: "from-purple-500/20 to-purple-900/20", border: "border-purple-500/30", text: "text-purple-400" },
  };

  const colors = colorClasses[step.color] || colorClasses.gold;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
      // Redirect to bio builder after completing onboarding
      window.location.href = "/bio-builder";
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onDismiss();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleSkip()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
          data-testid="onboarding-modal"
        >
          <Card className={`bg-gradient-to-br ${colors.bg} ${colors.border} border-2 overflow-hidden`}>
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {steps.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentStep ? 'bg-gold' : idx < currentStep ? 'bg-gold/50' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-white transition-colors"
                    data-testid="button-skip-onboarding"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <Progress value={progress} className="h-1 mb-6" />

                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center ${colors.border} border`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{step.title}</h2>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </div>

                  <div className="min-h-[280px]">
                    {step.content}
                  </div>
                </motion.div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="text-gray-400 hover:text-white disabled:opacity-30"
                    data-testid="button-prev-step"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>

                  <span className="text-sm text-gray-500">
                    {currentStep + 1} of {steps.length}
                  </span>

                  <Button
                    onClick={handleNext}
                    className="bg-gold text-black hover:bg-gold/80"
                    data-testid="button-next-step"
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        Create Your Bio
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
