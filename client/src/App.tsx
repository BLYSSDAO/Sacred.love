import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/hooks/useWallet";
import { CartProvider } from "@/contexts/CartContext";
import CursorTrail from "@/components/ui/CursorTrail";
import ErrorBoundary from "@/components/ErrorBoundary";
import OnboardingTutorial, { useOnboarding, OnboardingProvider } from "@/components/ui/OnboardingTutorial";
import { FeatureTourProvider, GuidedTourOverlay } from "@/components/ui/FeatureTooltip";
import { lazy, Suspense, ComponentType, useEffect } from "react";

function useReferralCodeCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      localStorage.setItem('referral_code', refCode.toUpperCase());
      // Clean the URL without reloading
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);
}

function useContentProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
      return true;
    };
    
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
      return true;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    const style = document.createElement('style');
    style.textContent = `
      img { -webkit-user-drag: none; user-drag: none; }
      img::selection { background: transparent; }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.head.removeChild(style);
    };
  }, []);
}

function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries = 3
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    for (let i = 0; i < retries; i++) {
      try {
        return await importFn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    return importFn();
  });
}

const Home = lazyWithRetry(() => import("@/pages/home"));
const Landing = lazyWithRetry(() => import("@/pages/landing"));
const Library = lazyWithRetry(() => import("@/pages/library"));
const Membership = lazyWithRetry(() => import("@/pages/membership"));
const Projects = lazyWithRetry(() => import("@/pages/projects/index"));
const RegenerativeAssetsProject = lazyWithRetry(() => import("@/pages/projects/regenerative-assets"));
const BitflixProject = lazyWithRetry(() => import("@/pages/projects/bitflix"));
const LuxaraProject = lazyWithRetry(() => import("@/pages/projects/luxara"));
const BlyssLabsProject = lazyWithRetry(() => import("@/pages/projects/blysslabs"));
const BlyssRiseProject = lazyWithRetry(() => import("@/pages/projects/blyss-rise"));
const BlyssAiProject = lazyWithRetry(() => import("@/pages/projects/blyss-ai"));
const LightRokProject = lazyWithRetry(() => import("@/pages/projects/lightrok"));
const BlyssRise360Project = lazyWithRetry(() => import("@/pages/projects/blyssrise360"));
const MyAiOneProject = lazyWithRetry(() => import("@/pages/projects/myai-one"));
const HarmonyPodsProject = lazyWithRetry(() => import("@/pages/projects/harmony-pods"));
const SacredLoveProject = lazyWithRetry(() => import("@/pages/projects/sacred-love"));
const LightPayProject = lazyWithRetry(() => import("@/pages/projects/lightpay"));
const BlueSwordEnergyProject = lazyWithRetry(() => import("@/pages/projects/blue-sword-energy"));
const LightPods = lazyWithRetry(() => import("@/pages/lightpods"));
const FlowDojo = lazyWithRetry(() => import("@/pages/flow-dojo"));
const BitflixLanding = lazyWithRetry(() => import("@/pages/bitflix-landing"));
const BitflixStudios = lazyWithRetry(() => import("@/pages/bitflix/studios"));
const BitflixAriel = lazyWithRetry(() => import("@/pages/bitflix/ariel"));
const BitflixCreatrix = lazyWithRetry(() => import("@/pages/bitflix/creatrix"));
const BitflixStreaming = lazyWithRetry(() => import("@/pages/bitflix/streaming"));
const BitflixITO = lazyWithRetry(() => import("@/pages/bitflix/ito"));
const Academy = lazyWithRetry(() => import("@/pages/academy"));
const Login = lazyWithRetry(() => import("@/pages/login"));
const AcademyAiTraining = lazyWithRetry(() => import("@/pages/academy/ai-training"));
const AcademyDefi = lazyWithRetry(() => import("@/pages/academy/defi"));
const BlyssAcademy = lazyWithRetry(() => import("@/pages/blyss-academy"));
const Forum = lazyWithRetry(() => import("@/pages/forum"));
const Alliances = lazyWithRetry(() => import("@/pages/alliances"));
const CreatorToolkit = lazyWithRetry(() => import("@/pages/creator-toolkit"));
const IncubationApplication = lazyWithRetry(() => import("@/pages/incubation-application"));
const DocumentViewer = lazyWithRetry(() => import("@/pages/document-viewer"));
const Advisors = lazyWithRetry(() => import("@/pages/advisors"));
const Profile = lazyWithRetry(() => import("@/pages/profile"));
const Dashboard = lazyWithRetry(() => import("@/pages/dashboard"));
const Feed = lazyWithRetry(() => import("@/pages/feed"));
const DaoGovernance = lazyWithRetry(() => import("@/pages/dao-governance"));
const Referrals = lazyWithRetry(() => import("@/pages/referrals"));
const BlyssTemple = lazyWithRetry(() => import("@/pages/blyss-temple"));
const TempleLanding = lazyWithRetry(() => import("@/pages/temple"));
const DivineMotherLove = lazyWithRetry(() => import("@/pages/divine-mother-love"));
const Chat = lazyWithRetry(() => import("@/pages/chat"));
const Members = lazyWithRetry(() => import("@/pages/members"));
const LightRokCapitol = lazyWithRetry(() => import("@/pages/lightrok-page"));
const LawfulAi = lazyWithRetry(() => import("@/pages/lawful-ai"));
const WhiteHatZone = lazyWithRetry(() => import("@/pages/whitehat-zone"));
const TraderProfile = lazyWithRetry(() => import("@/pages/trader-profile"));
const LightRokTreasury = lazyWithRetry(() => import("@/pages/lightrok-treasury"));
const Onboarding = lazyWithRetry(() => import("@/pages/onboarding"));
const Events = lazyWithRetry(() => import("@/pages/events"));
const Marketplace = lazyWithRetry(() => import("@/pages/marketplace"));
const MarketplaceUpload = lazyWithRetry(() => import("@/pages/marketplace-upload"));
const MarketplaceShop = lazyWithRetry(() => import("@/pages/marketplace-shop"));
const MarketplaceProduct = lazyWithRetry(() => import("@/pages/marketplace-product"));
const TokenTrader = lazyWithRetry(() => import("@/pages/token-trader"));
const TokenTraderLightpaper = lazyWithRetry(() => import("@/pages/tokentrader-lightpaper"));
const TokenTraderLanding = lazyWithRetry(() => import("@/pages/tokentrader-landing"));
const TokenMarketplace = lazyWithRetry(() => import("@/pages/token-marketplace"));
const AssetSpotlight = lazyWithRetry(() => import("@/pages/asset-spotlight"));
const DEX = lazyWithRetry(() => import("@/pages/dex"));
const DexTrade = lazyWithRetry(() => import("@/pages/dex-trade"));
const AgentProgram = lazyWithRetry(() => import("@/pages/agent-program"));
const AllianceHub = lazyWithRetry(() => import("@/pages/alliance-hub"));
const BlyssAi = lazyWithRetry(() => import("@/pages/blyss-ai-ecosystem"));
const MemberBioBuilder = lazyWithRetry(() => import("@/pages/member-bio-builder"));
const MemberProfile = lazyWithRetry(() => import("@/pages/member-profile"));
const IncubationApply = lazyWithRetry(() => import("@/pages/incubation-apply"));
const Governance = lazyWithRetry(() => import("@/pages/governance"));
const Delegates = lazyWithRetry(() => import("@/pages/delegates"));
const Treasury = lazyWithRetry(() => import("@/pages/treasury"));
const Bounties = lazyWithRetry(() => import("@/pages/bounties"));
const Synterex = lazyWithRetry(() => import("@/pages/synterex"));
const LawGuru = lazyWithRetry(() => import("@/pages/lawguru"));
const LoomEx = lazyWithRetry(() => import("@/pages/loomex"));
const VerifyEmail = lazyWithRetry(() => import("@/pages/verify-email"));
const BookingPage = lazyWithRetry(() => import("@/pages/booking"));
const AdminCalendar = lazyWithRetry(() => import("@/pages/admin-calendar"));
const CreatorStudio = lazyWithRetry(() => import("@/pages/creator-studio"));
const Brotherhood = lazyWithRetry(() => import("@/pages/brotherhood"));
const UbuntuSharing = lazyWithRetry(() => import("@/pages/ubuntu-sharing"));
const CreateTwin = lazyWithRetry(() => import("@/pages/create-twin"));
const BlyssAiInvest = lazyWithRetry(() => import("@/pages/blyss-ai-invest"));
const Ventures = lazyWithRetry(() => import("@/pages/ventures"));
const Invest = lazyWithRetry(() => import("@/pages/invest"));
const Training = lazyWithRetry(() => import("@/pages/training"));
const Summit = lazyWithRetry(() => import("@/pages/summit"));
const NotFound = lazyWithRetry(() => import("@/pages/not-found"));

// Public landing pages
const TempleLandingPublic = lazyWithRetry(() => import("@/pages/landing/temple-landing"));
const AcademyLandingPublic = lazyWithRetry(() => import("@/pages/landing/academy-landing"));
const EventsLandingPublic = lazyWithRetry(() => import("@/pages/landing/events-landing"));
const DashboardLandingPublic = lazyWithRetry(() => import("@/pages/landing/dashboard-landing"));
const BlyssAiLandingPublic = lazyWithRetry(() => import("@/pages/landing/blyssai-landing"));
const ForumLandingPublic = lazyWithRetry(() => import("@/pages/landing/forum-landing"));
const MarketplaceLandingPublic = lazyWithRetry(() => import("@/pages/landing/marketplace-landing"));
const GovernanceLandingPublic = lazyWithRetry(() => import("@/pages/landing/governance-landing"));
const NetworkLandingPublic = lazyWithRetry(() => import("@/pages/landing/network-landing"));

// Join pages
const JoinRevolution = lazyWithRetry(() => import("@/pages/join-revolution"));
const JoinCommunity = lazyWithRetry(() => import("@/pages/join-community"));
const JoinDao = lazyWithRetry(() => import("@/pages/join-dao"));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-gold text-xl font-mono animate-pulse mb-4">Loading...</div>
        <div className="text-white/50 text-sm">Please wait</div>
      </div>
    </div>
  );
}

function Router() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('chunkErrorReloads');
    sessionStorage.removeItem('globalChunkReload');
  }
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/landing" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/library/viewer/:id" component={DocumentViewer} />
        <Route path="/membership" component={Membership} />
        <Route path="/login" component={Login} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/regenerative-assets" component={RegenerativeAssetsProject} />
        <Route path="/projects/bitflix" component={BitflixProject} />
        <Route path="/projects/luxara" component={LuxaraProject} />
        <Route path="/projects/blysslabs" component={BlyssLabsProject} />
        <Route path="/projects/blyss-rise" component={BlyssRiseProject} />
        <Route path="/projects/blyss-ai" component={BlyssAiProject} />
        <Route path="/projects/lightrok" component={LightRokProject} />
        <Route path="/projects/blyssrise360" component={BlyssRise360Project} />
        <Route path="/projects/myai-one" component={MyAiOneProject} />
        <Route path="/projects/harmony-pods" component={HarmonyPodsProject} />
        <Route path="/projects/sacred-love" component={SacredLoveProject} />
        <Route path="/projects/lightpay" component={LightPayProject} />
        <Route path="/projects/blue-sword-energy" component={BlueSwordEnergyProject} />
        <Route path="/lightpods" component={LightPods} />
        <Route path="/flow-dojo" component={FlowDojo} />
        <Route path="/bitflix" component={BitflixLanding} />
        <Route path="/bitflix/studios" component={BitflixStudios} />
        <Route path="/bitflix/ariel" component={BitflixAriel} />
        <Route path="/bitflix/creatrix" component={BitflixCreatrix} />
        <Route path="/bitflix/stream" component={BitflixStreaming} />
        <Route path="/bitflix/ito" component={BitflixITO} />
        <Route path="/blyss-academy" component={BlyssAcademy} />
        <Route path="/blyss-academy/:topicSlug" component={BlyssAcademy} />
        <Route path="/academy" component={Academy} />
        <Route path="/academy/ai-training" component={AcademyAiTraining} />
        <Route path="/academy/defi" component={AcademyDefi} />
        <Route path="/academy/forum" component={Forum} />
        <Route path="/creator-studio" component={CreatorStudio} />
        <Route path="/forum" component={Forum} />
        <Route path="/alliances" component={Alliances} />
        <Route path="/ventures" component={Ventures} />
        <Route path="/invest" component={Invest} />
        <Route path="/training" component={Training} />
        <Route path="/summit" component={Summit} />
        <Route path="/creator-toolkit" component={CreatorToolkit} />
        <Route path="/apply" component={IncubationApplication} />
        <Route path="/advisors" component={Advisors} />
        <Route path="/resources" component={Library} />
        <Route path="/ecosystem" component={Projects} />
        <Route path="/profile" component={Profile} />
        <Route path="/users/:username" component={Profile} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/feed" component={Feed} />
        <Route path="/referrals" component={Referrals} />
        <Route path="/temple" component={TempleLanding} />
        <Route path="/temple/:id" component={BlyssTemple} />
        <Route path="/events/divine-mother-love" component={DivineMotherLove} />
        <Route path="/dao" component={DaoGovernance} />
        <Route path="/governance" component={DaoGovernance} />
        <Route path="/chat" component={Chat} />
        <Route path="/messages" component={Chat} />
        <Route path="/members" component={Members} />
        <Route path="/community" component={Members} />
        <Route path="/lightrok" component={LightRokCapitol} />
        <Route path="/lightrok/treasury" component={LightRokTreasury} />
        <Route path="/lawful" component={LawfulAi} />
        <Route path="/lawful-ai" component={LawfulAi} />
        <Route path="/contracts" component={LawfulAi} />
        <Route path="/capitol" component={LightRokCapitol} />
        <Route path="/investments" component={LightRokCapitol} />
        <Route path="/whitehat" component={WhiteHatZone} />
        <Route path="/whitehat-zone" component={WhiteHatZone} />
        <Route path="/whitehat/trader/:traderId" component={TraderProfile} />
        <Route path="/social-trading" component={WhiteHatZone} />
        <Route path="/events" component={Events} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/marketplace/upload" component={MarketplaceUpload} />
        <Route path="/marketplace/shop/:slug" component={MarketplaceShop} />
        <Route path="/marketplace/product/:id" component={MarketplaceProduct} />
        <Route path="/tokentrader" component={TokenTraderLanding} />
        <Route path="/tokentrader/app" component={TokenTrader} />
        <Route path="/tokentrader/lightpaper" component={TokenTraderLightpaper} />
        <Route path="/token-marketplace" component={TokenMarketplace} />
        <Route path="/token-marketplace/:slug" component={AssetSpotlight} />
        <Route path="/dex" component={DEX} />
        <Route path="/dex/trade/:symbol" component={DexTrade} />
        <Route path="/agents" component={AgentProgram} />
        <Route path="/alliance" component={AllianceHub} />
        <Route path="/alliance/:slug" component={AllianceHub} />
        <Route path="/blyss-ai" component={BlyssAi} />
        <Route path="/bio-builder" component={MemberBioBuilder} />
        <Route path="/member/:username" component={MemberProfile} />
        <Route path="/incubation-apply" component={IncubationApply} />
        <Route path="/incubation/apply" component={IncubationApply} />
        <Route path="/vote" component={Governance} />
        <Route path="/delegates" component={Delegates} />
        <Route path="/treasury" component={Treasury} />
        <Route path="/bounties" component={Bounties} />
        <Route path="/synterex" component={Synterex} />
        <Route path="/lawguru" component={LawGuru} />
        <Route path="/loomex" component={LoomEx} />
        <Route path="/investments/loomex" component={LoomEx} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/book/:username" component={BookingPage} />
        <Route path="/book/:username/:appointmentSlug" component={BookingPage} />
        <Route path="/calendar" component={AdminCalendar} />
        <Route path="/brotherhood" component={Brotherhood} />
        <Route path="/brotherhood/:slug" component={Brotherhood} />
        <Route path="/ubuntu-sharing" component={UbuntuSharing} />
        <Route path="/create-twin" component={CreateTwin} />
        <Route path="/invest" component={BlyssAiInvest} />
        <Route path="/blyss-ai/invest" component={BlyssAiInvest} />
        
        {/* Public landing pages for non-members */}
        <Route path="/about/temple" component={TempleLandingPublic} />
        <Route path="/about/academy" component={AcademyLandingPublic} />
        <Route path="/about/events" component={EventsLandingPublic} />
        <Route path="/about/dashboard" component={DashboardLandingPublic} />
        <Route path="/about/blyssai" component={BlyssAiLandingPublic} />
        <Route path="/about/forum" component={ForumLandingPublic} />
        <Route path="/about/marketplace" component={MarketplaceLandingPublic} />
        <Route path="/about/governance" component={GovernanceLandingPublic} />
        <Route path="/about/network" component={NetworkLandingPublic} />
        
        {/* Join pages - dual path membership */}
        <Route path="/join" component={JoinRevolution} />
        <Route path="/join/community" component={JoinCommunity} />
        <Route path="/join/dao" component={JoinDao} />
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppContent() {
  const { showOnboarding, completeOnboarding, dismissOnboarding } = useOnboarding();
  
  return (
    <>
      <CursorTrail />
      <Toaster />
      <Router />
      <OnboardingTutorial 
        isOpen={showOnboarding} 
        onComplete={completeOnboarding} 
        onDismiss={dismissOnboarding} 
      />
    </>
  );
}

function App() {
  useReferralCodeCapture();
  useContentProtection();
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <CartProvider>
            <TooltipProvider>
              <OnboardingProvider>
                <FeatureTourProvider>
                  <AppContent />
                  <GuidedTourOverlay />
                </FeatureTourProvider>
              </OnboardingProvider>
            </TooltipProvider>
          </CartProvider>
        </WalletProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
