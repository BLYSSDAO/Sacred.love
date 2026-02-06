import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BLYSS_CONTENT } from "@/lib/constants";
import { 
  ArrowRight, Heart, Users, Sparkles, Globe, TrendingUp, 
  Cpu, Film, Coins, Crown, Star, Zap, Shield, Play,
  Rocket, Brain, Wallet, ChevronDown, Flame, GraduationCap,
  Calendar, MessageCircle, ShoppingBag, LayoutDashboard
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import heroVideo from "@assets/generated_videos/blyss_forest_temple_sanctuary.mp4";

// Check if device is mobile for performance optimization
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const COMMUNITY_SPACES = [
  {
    name: "Blyss Temple",
    tagline: "Sacred Gathering Space",
    desc: "Live ceremonies, meditations, and transformative events with global community",
    icon: Flame,
    color: "from-orange-500 to-red-600",
    link: "/about/temple"
  },
  {
    name: "Academy",
    tagline: "Learn & Teach",
    desc: "Courses on wellness, finance, and conscious living. Create and earn as an instructor",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    link: "/about/academy"
  },
  {
    name: "Events",
    tagline: "Connect & Celebrate",
    desc: "Virtual and in-person gatherings, retreats, and community celebrations",
    icon: Calendar,
    color: "from-pink-500 to-rose-600",
    link: "/about/events"
  },
  {
    name: "Forum",
    tagline: "Community Wisdom",
    desc: "Discussions, support circles, and shared knowledge from fellow seekers",
    icon: MessageCircle,
    color: "from-teal-500 to-cyan-600",
    link: "/about/forum"
  },
  {
    name: "Marketplace",
    tagline: "Conscious Commerce",
    desc: "Products, services, and offerings from community creators and healers",
    icon: ShoppingBag,
    color: "from-emerald-500 to-green-600",
    link: "/about/marketplace"
  },
  {
    name: "Dashboard",
    tagline: "Your Sacred Space",
    desc: "Personal profile, connections, referrals, and your journey overview",
    icon: LayoutDashboard,
    color: "from-purple-500 to-violet-600",
    link: "/about/dashboard"
  },
];

const FEATURED_PROJECTS = [
  {
    name: "TokenTrader.io",
    tagline: "Coming Soon",
    desc: "Fractional ownership of luxury real estate, yachts, and premium assets (In Development)",
    icon: Coins,
    color: "from-gold to-yellow-500",
    link: "/tokentrader"
  },
  {
    name: "Blyss.ai",
    tagline: "Your AI Ecosystem",
    desc: "MyAI Twin, Blyss Guru wellness AI, and wearable bio-integration",
    icon: Brain,
    color: "from-cyan-500 to-blue-600",
    link: "/projects/blyss-ai"
  },
  {
    name: "LightRok Capitol",
    tagline: "Investment Portal",
    desc: "Pre-seed deals, staking vaults, and profit-sharing for qualified investors",
    icon: TrendingUp,
    color: "from-gold to-amber-600",
    link: "/projects/lightrok"
  },
  {
    name: "LightPay",
    tagline: "Sovereign Finance",
    desc: "Decentralized payment rails bypassing legacy banking systems",
    icon: Wallet,
    color: "from-emerald-500 to-teal-600",
    link: "/projects/lightpay"
  },
  {
    name: "BlyssRise360",
    tagline: "Holistic Wellness",
    desc: "360° transformation programs for mind, body, and spirit alignment",
    icon: Sparkles,
    color: "from-purple-500 to-pink-600",
    link: "/projects/blyssrise360"
  },
  {
    name: "BITFLIX",
    tagline: "Conscious Media",
    desc: "Film production creating transformative stories that awaken humanity",
    icon: Film,
    color: "from-orange-500 to-red-600",
    link: "/projects/bitflix"
  },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-black blyss-waves">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <motion.div 
          style={{ y: isMobile ? 0 : y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          
          {/* Video - only load on desktop or if not errored */}
          {!videoError && (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload={isMobile ? "none" : "auto"}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              onError={() => setVideoError(true)}
              onStalled={() => isMobile && setVideoError(true)}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10" />
        </motion.div>

        <div className="relative z-20 container mx-auto min-h-screen flex flex-col justify-center items-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold font-medium text-sm tracking-wide">
                {BLYSS_CONTENT.brand.tagline}
              </span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Where <span className="bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">Wellness</span> Meets{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Web3</span>
            </h1>
            
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              A conscious ecosystem for digital nomads, healers, and visionary builders
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-white/70 text-xs sm:text-sm">Wellness Community</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <Crown className="w-3.5 h-3.5 text-gold" />
                <span className="text-white/70 text-xs sm:text-sm">DAO Governance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white/70 text-xs sm:text-sm">Regenerative Finance</span>
              </div>
            </div>

            {/* Dual Path CTAs */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              {/* Community Path */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full md:w-auto"
              >
                <Link href="/join/community">
                  <div className="group relative overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/40 rounded-2xl p-6 cursor-pointer hover:border-pink-400/60 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                          <Heart className="w-6 h-6 text-pink-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-bold text-lg">Blyss.love</h3>
                          <p className="text-pink-300 text-sm">Community Access</p>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-4">Wellness events, AI companions, and conscious community</p>
                      <div className="flex items-center gap-2 text-pink-400 font-medium">
                        <span>Free to $111/mo</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <span className="text-white/30 text-lg font-medium hidden md:block">or</span>

              {/* DAO Path */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full md:w-auto"
              >
                <Link href="/join/dao">
                  <div className="group relative overflow-hidden bg-gradient-to-br from-gold/20 to-amber-600/20 border border-gold/40 rounded-2xl p-6 cursor-pointer hover:border-gold/60 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                          <Crown className="w-6 h-6 text-gold" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-bold text-lg">BlyssDAO</h3>
                          <p className="text-gold text-sm">Mothership Access</p>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-4">Build, invest, govern, and shape the future</p>
                      <div className="flex items-center gap-2 text-gold font-medium">
                        <span>NFT Membership</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Quick Access for Authenticated Users */}
            {!isLoading && isAuthenticated && user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/dashboard">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-colors mx-auto">
                    <Users className="w-4 h-4" /> Go to Dashboard
                  </button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-gold" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Launch Announcement Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-black via-gold/5 to-black overflow-hidden blyss-glow-bg">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-6 sm:mb-8">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-4 blyss-pulse"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                <span className="text-gold font-bold text-xs sm:text-sm tracking-wider uppercase blyss-text-pulse">We're Going Live!</span>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
                The Future of <span className="text-gold blyss-text-pulse">Conscious Investing</span> Awaits
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
                Be part of history. Secure your spot before we launch.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-white">March 21st</span>
                    <p className="text-purple-300 text-xs sm:text-sm font-medium">Soft Launch</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs sm:text-sm">BLYSS Temple Live Gathering & Ecosystem Soft Launch</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-gold/20 to-amber-500/20 border border-gold/40 rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-white">December 21st</span>
                    <p className="text-gold text-xs sm:text-sm font-medium">Full Launch</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs sm:text-sm">Complete Platform & Token Generation Event</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 sm:p-6"
            >
              <p className="text-emerald-400 font-bold text-sm sm:text-base mb-3 sm:mb-4 text-center">Secure Your Spot Now</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto">
                <Link href="/marketplace">
                  <div className="text-center p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer group">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs text-white/80 block">Marketplace</span>
                  </div>
                </Link>
                <Link href="/academy">
                  <div className="text-center p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer group">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs text-white/80 block">Academy</span>
                  </div>
                </Link>
                <Link href="/temple">
                  <div className="text-center p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer group">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-gold mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs text-white/80 block">Virtual Temple</span>
                  </div>
                </Link>
              </div>
              <p className="text-white/50 text-[10px] sm:text-xs text-center mt-3">Host events, sell products, or teach courses in our ecosystem</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Two Paths Explained */}
      <section className="relative py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">Two Paths, One Vision</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              Choose Your <span className="text-gold">Journey</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Whether you're seeking wellness and community or ready to build and invest, there's a perfect path for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Community Path Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-pink-500/10 to-purple-600/5 border border-pink-500/20 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Blyss.love</h3>
                    <p className="text-pink-300">Community Access</p>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  A sanctuary for wellness seekers, healers, and conscious creators. Access AI companions, live events, and a supportive community.
                </p>

                <ul className="space-y-3 mb-8">
                  {["Blyss Guru AI wellness companion", "Live temple events & ceremonies", "Community forums & connections", "Creator revenue sharing (20%)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                      <Star className="w-4 h-4 text-pink-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/join/community">
                  <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:from-pink-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2">
                    Explore Community <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* DAO Path Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-amber-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-gold/10 to-amber-600/5 border border-gold/20 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-600 rounded-2xl flex items-center justify-center">
                    <Crown className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">BlyssDAO</h3>
                    <p className="text-gold">Mothership Access</p>
                  </div>
                </div>
                
                <p className="text-white/70 mb-6">
                  For builders, investors, and visionaries ready to co-create humanity's regenerative future. Full ecosystem access included.
                </p>

                <ul className="space-y-3 mb-8">
                  {["All Community features included", "DAO governance & voting rights", "Investment portal & deal flow", "Revenue sharing from ventures"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                      <Shield className="w-4 h-4 text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/join/dao">
                  <button className="w-full py-4 bg-gradient-to-r from-gold to-amber-600 text-black font-bold rounded-xl hover:from-amber-400 hover:to-gold transition-all flex items-center justify-center gap-2">
                    Join the DAO <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Spaces Section */}
      <section className="relative py-24 bg-gradient-to-b from-black via-pink-900/5 to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-pink-400 font-mono text-xs tracking-[0.3em] uppercase">Your Sanctuary Awaits</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              Community <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Spaces</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Explore the sacred spaces within our ecosystem—each designed for connection, growth, and transformation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {COMMUNITY_SPACES.map((space, i) => (
              <motion.div
                key={space.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={space.link}>
                  <div className="group h-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-pink-500/40 hover:bg-white/5 transition-all cursor-pointer">
                    <div className={`w-14 h-14 bg-gradient-to-br ${space.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                      <space.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-1">{space.name}</h3>
                    <p className="text-pink-300 text-sm font-medium mb-3">{space.tagline}</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{space.desc}</p>
                    <div className="flex items-center gap-2 text-white/40 text-sm group-hover:text-pink-400 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-24 bg-gradient-to-b from-black via-gold/5 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">Ecosystem Ventures</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              The <span className="text-gold">BLYSS</span> Projects
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Transformative ventures incubated by BlyssDAO—building the infrastructure for conscious commerce and regenerative finance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {project.external ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <div className="group h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 hover:bg-white/10 transition-all cursor-pointer">
                      <div className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                        <project.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white text-xl font-bold">{project.name}</h3>
                      </div>
                      <p className="text-gold text-sm font-medium mb-3">{project.tagline}</p>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">{project.desc}</p>
                      <div className="flex items-center gap-2 text-white/40 text-sm group-hover:text-gold transition-colors">
                        <span>Visit Site</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link href={project.link}>
                    <div className="group h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 hover:bg-white/10 transition-all cursor-pointer">
                      <div className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                        <project.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white text-xl font-bold">{project.name}</h3>
                      </div>
                      <p className="text-gold text-sm font-medium mb-3">{project.tagline}</p>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">{project.desc}</p>
                      <div className="flex items-center gap-2 text-white/40 text-sm group-hover:text-gold transition-colors">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <button className="px-8 py-4 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all inline-flex items-center gap-2">
                <Globe className="w-5 h-5" /> View All Projects
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Clean & Minimal */}
      <section className="relative py-16 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join the <span className="text-gold">New Paradigm</span>
            </h2>
            <p className="text-white/50 text-sm mb-6">
              A venture mothership for conscious capital, planetary healing, and human flourishing.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span 
                className="px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-medium"
                data-testid="badge-indigenous-alliance"
              >
                <Zap className="w-3 h-3 inline mr-1" /> 33% to Indigenous Alliance
              </span>
              <span 
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-medium"
                data-testid="badge-community-governed"
              >
                <Users className="w-3 h-3 inline mr-1" /> Community Governed
              </span>
              <span 
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-medium"
                data-testid="badge-global-sovereignty"
              >
                <Globe className="w-3 h-3 inline mr-1" /> Global Sovereignty
              </span>
            </div>
            <Link href="/join">
              <Button 
                size="lg"
                className="bg-gold text-black font-bold border-gold"
                data-testid="button-begin-journey"
              >
                <Rocket className="w-5 h-5" /> Begin Your Journey
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
