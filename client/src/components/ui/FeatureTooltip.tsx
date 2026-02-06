import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, ChevronRight, ChevronLeft, X, Sparkles, 
  Users, TrendingUp, Award, Crown, Wallet, BookOpen, 
  MessageCircle, Calendar, Shield, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TOUR_STORAGE_KEY = "blyss_feature_tours_completed";

interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface FeatureTour {
  id: string;
  name: string;
  steps: TourStep[];
}

const FEATURE_TOURS: Record<string, FeatureTour> = {
  dashboard: {
    id: "dashboard",
    name: "Dashboard Tour",
    steps: [
      {
        id: "overview",
        targetSelector: "[data-tour='dashboard-overview']",
        title: "Your Dashboard Overview",
        description: "Track your activity, connections, and engagement metrics all in one place. This is your personal command center.",
        position: "bottom"
      },
      {
        id: "activity",
        targetSelector: "[data-tour='dashboard-activity']",
        title: "Activity Timeline",
        description: "See your recent actions and interactions with the community. Stay informed about your journey.",
        position: "right"
      },
      {
        id: "quick-actions",
        targetSelector: "[data-tour='dashboard-actions']",
        title: "Quick Actions",
        description: "Access frequently used features with one click. Create posts, connect with members, or explore content.",
        position: "left"
      }
    ]
  },
  members: {
    id: "members",
    name: "Member Directory Tour",
    steps: [
      {
        id: "search",
        targetSelector: "[data-testid='input-member-search']",
        title: "Find Members",
        description: "Search for community members by name, skills, or interests. Discover like-minded visionaries.",
        position: "bottom"
      },
      {
        id: "featured",
        targetSelector: "[data-tour='featured-members']",
        title: "Featured Leaders",
        description: "Top-tier members who are leading the community. Connect with experienced mentors.",
        position: "bottom"
      },
      {
        id: "filters",
        targetSelector: "[data-tour='member-filters']",
        title: "Filter by Role",
        description: "Narrow down members by their Alliance role or membership tier to find the right connections.",
        position: "bottom"
      }
    ]
  },
  membership: {
    id: "membership",
    name: "Membership Tiers Tour",
    steps: [
      {
        id: "tiers",
        targetSelector: "[data-tour='membership-tiers']",
        title: "Choose Your Tier",
        description: "Each tier unlocks different benefits, from community access to profit sharing and governance rights.",
        position: "bottom"
      },
      {
        id: "benefits",
        targetSelector: "[data-tour='tier-benefits']",
        title: "Tier Benefits",
        description: "Higher tiers get more profit sharing, voting power, and exclusive access to deals and pools.",
        position: "right"
      }
    ]
  }
};

interface FeatureTourContextType {
  activeTour: string | null;
  currentStep: number;
  startTour: (tourId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  completedTours: string[];
  hasCompletedTour: (tourId: string) => boolean;
}

const FeatureTourContext = createContext<FeatureTourContextType | null>(null);

export function FeatureTourProvider({ children }: { children: React.ReactNode }) {
  const [activeTour, setActiveTour] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTours, setCompletedTours] = useState<string[]>(() => {
    const stored = localStorage.getItem(TOUR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const startTour = (tourId: string) => {
    setActiveTour(tourId);
    setCurrentStep(0);
  };

  const nextStep = () => {
    const tour = activeTour ? FEATURE_TOURS[activeTour] : null;
    if (tour && currentStep < tour.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const endTour = () => {
    if (activeTour && !completedTours.includes(activeTour)) {
      const updated = [...completedTours, activeTour];
      setCompletedTours(updated);
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(updated));
    }
    setActiveTour(null);
    setCurrentStep(0);
  };

  const hasCompletedTour = (tourId: string) => completedTours.includes(tourId);

  return (
    <FeatureTourContext.Provider value={{
      activeTour,
      currentStep,
      startTour,
      nextStep,
      prevStep,
      endTour,
      completedTours,
      hasCompletedTour
    }}>
      {children}
    </FeatureTourContext.Provider>
  );
}

export function useFeatureTour() {
  const context = useContext(FeatureTourContext);
  if (!context) {
    throw new Error("useFeatureTour must be used within FeatureTourProvider");
  }
  return context;
}

interface FeatureHelpTooltipProps {
  title: string;
  description: string;
  icon?: typeof HelpCircle;
  children: React.ReactNode;
}

export function FeatureHelpTooltip({ title, description, icon: Icon = Lightbulb, children }: FeatureHelpTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        className="max-w-xs p-4 bg-zinc-900/95 border-gold/30 backdrop-blur-xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
            <p className="text-white/70 text-xs leading-relaxed">{description}</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

interface HelpIconButtonProps {
  title: string;
  description: string;
  id?: string;
  className?: string;
}

export function HelpIconButton({ title, description, id = "default", className = "" }: HelpIconButtonProps) {
  return (
    <FeatureHelpTooltip title={title} description={description}>
      <Button 
        variant="ghost"
        size="sm"
        className={`rounded-full p-1 ${className}`}
        data-testid={`button-help-icon-${id}`}
      >
        <HelpCircle className="w-3 h-3 text-white/60" />
      </Button>
    </FeatureHelpTooltip>
  );
}

export function GuidedTourOverlay() {
  const { activeTour, currentStep, nextStep, prevStep, endTour } = useFeatureTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const tour = activeTour ? FEATURE_TOURS[activeTour] : null;
  const step = tour?.steps[currentStep];

  useEffect(() => {
    if (step) {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [step]);

  if (!tour || !step) return null;

  const getTooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%' };
    
    const padding = 16;
    switch (step.position) {
      case 'bottom':
        return { 
          top: targetRect.bottom + padding, 
          left: targetRect.left + targetRect.width / 2,
          transform: 'translateX(-50%)'
        };
      case 'top':
        return { 
          top: targetRect.top - padding, 
          left: targetRect.left + targetRect.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'left':
        return { 
          top: targetRect.top + targetRect.height / 2, 
          left: targetRect.left - padding,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return { 
          top: targetRect.top + targetRect.height / 2, 
          left: targetRect.right + padding,
          transform: 'translateY(-50%)'
        };
      default:
        return { 
          top: targetRect.bottom + padding, 
          left: targetRect.left + targetRect.width / 2,
          transform: 'translateX(-50%)'
        };
    }
  };

  const position = getTooltipPosition();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100]"
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={endTour}
        />
        
        {targetRect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute border-2 border-gold rounded-xl shadow-[0_0_0_4000px_rgba(0,0,0,0.7)]"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              pointerEvents: 'none'
            }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 w-80 p-5 rounded-2xl bg-zinc-900/95 border border-gold/30 backdrop-blur-xl shadow-2xl"
          style={{
            top: position.top,
            left: position.left,
            transform: position.transform as string | undefined
          }}
          data-testid="tour-tooltip"
        >
          <button 
            onClick={endTour}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
            data-testid="button-close-tour"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div className="flex gap-1">
              {tour.steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentStep ? 'bg-gold' : idx < currentStep ? 'bg-gold/50' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">{step.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">
              Step {currentStep + 1} of {tour.steps.length}
            </span>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevStep}
                  className="border-white/20"
                  data-testid="button-tour-prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              <Button 
                size="sm" 
                onClick={nextStep}
                className="bg-gold text-black hover:bg-gold/90"
                data-testid="button-tour-next"
              >
                {currentStep < tour.steps.length - 1 ? (
                  <>Next <ChevronRight className="w-4 h-4 ml-1" /></>
                ) : (
                  'Finish'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface StartTourButtonProps {
  tourId: string;
  className?: string;
}

export function StartTourButton({ tourId, className = "" }: StartTourButtonProps) {
  const { startTour, hasCompletedTour } = useFeatureTour();
  const tour = FEATURE_TOURS[tourId];
  
  if (!tour) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => startTour(tourId)}
      className={`border-gold/30 text-gold hover:bg-gold/10 ${className}`}
      data-testid={`button-start-tour-${tourId}`}
    >
      <Lightbulb className="w-4 h-4 mr-2" />
      {hasCompletedTour(tourId) ? 'Restart Tour' : 'Take the Tour'}
    </Button>
  );
}
