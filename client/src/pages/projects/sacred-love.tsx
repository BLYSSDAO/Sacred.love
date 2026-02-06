import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import {
  Music, Headphones, Radio, Users, Star, Heart,
  ArrowLeft, Coins, Globe,
  Sparkles, Mic, BookOpen, CheckCircle,
  Palette, BarChart3,
  Layers, Gem, Volume2, MonitorPlay, TrendingUp
} from "lucide-react";
import heroVideo from "@/assets/videos/sacred-love-hero.mp4";

const STAGES = [
  {
    name: "The Cosmic Amphitheater",
    subtitle: "Main Stage",
    icon: Music,
    color: "from-gold to-amber-500",
    description: "The beating heart of Sacred.love. Epic performances, headliners, and immersive AV experiences for thousands of simultaneous viewers.",
  },
  {
    name: "The Sanctuary",
    subtitle: "Temple Stage",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    description: "Intimate sound healing, kirtan, mantra, and devotional music. A soft-lit, cushion-strewn temple for deep listening and heart opening.",
  },
  {
    name: "The Crystalline Cathedral",
    subtitle: "Electronic Stage",
    icon: Radio,
    color: "from-cyan-400 to-blue-500",
    description: "Immersive electronic and ambient sound journeys with holographic visuals and crystal bowl frequencies woven through the mix.",
  },
  {
    name: "The Circle",
    subtitle: "Campfire Stage",
    icon: Users,
    color: "from-orange-400 to-red-500",
    description: "Acoustic sessions, spoken word, storytelling, and drum circles. An intimate campfire setting for raw, unfiltered creative expression.",
  },
  {
    name: "The Learning Lodge",
    subtitle: "Workshop Tent",
    icon: BookOpen,
    color: "from-emerald-400 to-teal-500",
    description: "Music production workshops, sound healing certifications, business masterclasses, and spiritual practice training.",
  },
  {
    name: "The Emergence Platform",
    subtitle: "Rising Stars",
    icon: Star,
    color: "from-purple-400 to-violet-500",
    description: "The launchpad for emerging artists. Community-curated discovery stage where new voices are amplified and celebrated.",
  },
  {
    name: "The Altar",
    subtitle: "Ceremony Space",
    icon: Gem,
    color: "from-rose-400 to-pink-600",
    description: "Full moon ceremonies, sacred plant music, equinox celebrations, and seasonal rituals. The most reverent space in the ecosystem.",
  },
];

const TOKEN_ALLOCATION = [
  { label: "Creator Abundance Pool", percent: 40, color: "bg-gold", desc: "Streaming royalties, live rewards, NFT drops" },
  { label: "Sacred Treasury", percent: 20, color: "bg-purple-500", desc: "Community-governed DAO, platform development" },
  { label: "Founding Visionaries", percent: 15, color: "bg-cyan-500", desc: "2-year vesting with 6-month cliff" },
  { label: "Growth & Ceremony", percent: 10, color: "bg-emerald-500", desc: "Partnerships, festivals, ambassadors" },
  { label: "Soul Rewards", percent: 15, color: "bg-pink-500", desc: "Listener curation, sharing bonuses, participation" },
];

const CREATOR_FEATURES = [
  { icon: Music, title: "Upload & Mint", desc: "Every track becomes an NFT with full ownership retained. Automatic royalty splits encoded in smart contracts." },
  { icon: Coins, title: "Pay-per-Stream", desc: "1 SACRED per 10,000 plays with real-time earnings tracking down to the millisecond." },
  { icon: Mic, title: "Live Temple Tips", desc: "Real-time SACRED tipping during live performances with instant settlement." },
  { icon: Sparkles, title: "NFT Drops", desc: "Limited edition releases, concert tickets, and exclusive content drops for your community." },
  { icon: TrendingUp, title: "Staking Boost", desc: "Stake SACRED to amplify visibility in discovery algorithms and earn additional rewards." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time earnings, geographic soul-map of listeners, and on-chain transaction verification." },
];

const LISTENER_FEATURES = [
  "Stream music and earn reflection rewards",
  "Curate playlists and earn discovery bonuses",
  "Share tracks and earn referral SACRED",
  "Attend live temples and earn participation tokens",
  "Early discovery bonus for finding emerging artists",
  "Stake SACRED to vote on featured temple events",
];

const ARTIST_SANCTUM = [
  {
    name: "The Creator's Lodge",
    icon: Users,
    color: "from-amber-500 to-orange-500",
    desc: "Community hub with video chat rooms, backstage calendar, analytics dashboard, and mentorship matching for artists at every level.",
  },
  {
    name: "The Sacred Marketplace",
    icon: Palette,
    color: "from-emerald-500 to-teal-500",
    desc: "Personalized storefronts for digital goods, experiences, physical merchandise, and patronage tiers — all powered by SACRED tokens and smart contracts.",
  },
  {
    name: "The Collaboration Studio",
    icon: Headphones,
    color: "from-purple-500 to-indigo-500",
    desc: "Real-time co-creation workspace with virtual studio rooms, jam sessions, video production suite, and smart contract royalty composer.",
  },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    name: "The Garden Awakens",
    timeline: "Months 1-3",
    items: ["MVP launch: Upload, stream, basic payouts", "SACRED token deployment & liquidity pools", "Wallet authentication & soul profiles", "Initial 333 Genesis Creator invitations"],
    target: "10,000+ tracks uploaded, $500K in creator payouts",
  },
  {
    phase: "Phase 2",
    name: "The Temple Rises",
    timeline: "Months 4-6",
    items: ["Live streaming temples (WebRTC)", "Short-form video feed", "Mobile app launch (iOS + Android)", "NFT marketplace for exclusive drops"],
    target: "100+ live events, 50K monthly active users",
  },
  {
    phase: "Phase 3",
    name: "The Network Weaves",
    timeline: "Months 7-12",
    items: ["AR overlays for live performances", "Cross-chain bridge (ETH, Polygon, Solana)", "DAO governance activation", "Global Sacred Festivals (IRL events)"],
    target: "100K+ users, $10M+ total creator earnings",
  },
  {
    phase: "Phase 4",
    name: "The Frequency Spreads",
    timeline: "Year 2+",
    items: ["AI-powered frequency matching", "Collaborative multi-artist NFTs", "Physical sacred spaces (studios, venues)", "Full decentralized governance"],
    target: "Global sovereign music ecosystem",
  },
];

const PRINCIPLES = [
  { title: "Sovereign Sound", desc: "Every artist owns their masters. No label contracts. No data extraction. Radical openness." },
  { title: "Abundance Over Scarcity", desc: "Unlike platforms that pay fractions of cents, Sacred.love ensures creators thrive. Music is medicine." },
  { title: "Community as Temple", desc: "Users aren't customers — they're congregation. Governance is shared. Success is collective." },
  { title: "Frequency Over Fame", desc: "Discovery algorithms prioritize vibrational alignment and soul resonance, not just clicks." },
  { title: "Sacred Reciprocity", desc: "The 33% flow to BlyssDAO isn't a tax — it's a tithe. Honoring the ecosystem that enables sovereignty." },
];

export default function SacredLovePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <AnimatedBackground variant="particles" opacity={0.1} />
      <Navbar />
      <AiConcierge />

      {/* Hero */}
      <div className="relative h-[90vh] w-full overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover" data-testid="hero-video">
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />

        <Link href="/">
          <button data-testid="button-back-home" className="fixed top-28 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg text-white/80 hover:text-white hover:bg-black/80 transition-all text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </Link>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-6 max-w-5xl">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gold font-mono-tech text-xs uppercase mb-6 block font-bold"
            >
              BlyssDAO Ecosystem &bull; Regenerative Finance &bull; Sacred Technology
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-6xl md:text-[8rem] font-bold text-white mb-2 drop-shadow-2xl tracking-tighter leading-none"
              style={{ textShadow: '0 0 80px rgba(212, 175, 55, 0.3)' }}
            >
              Sacred.love
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-gold/90 font-light tracking-wide mb-4">
              Where Sound Becomes Sacrament &amp; Artists Become Sovereigns
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-lg text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              A blockchain-powered sanctuary for music, video, and live ceremonies. Spotify meets the Temple — 95% revenue to creators, instant payouts, and sacred reciprocity.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => document.getElementById('stages')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 px-8 py-4 bg-gold text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all"
                data-testid="button-explore-stages"
              >
                <Music className="w-5 h-5" /> Explore the Stages
              </button>
              <button
                onClick={() => document.getElementById('tokenomics')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-3 px-8 py-4 border-2 border-gold/50 text-gold font-bold text-sm uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
                data-testid="button-view-tokenomics"
              >
                <Coins className="w-5 h-5" /> SACRED Tokenomics
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-12 transition-colors text-sm uppercase tracking-widest" data-testid="link-back-portfolio">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Vision */}
        <section className="mb-24" data-testid="vision-section">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6 text-white">The Conscious Streaming Revolution</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                Sacred.love is a blockchain-powered sanctuary where music, video, and live ceremonies transcend exploitation.
                Every beat carries frequency, every view holds value, and every creator deserves sovereignty.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gold">95%</div>
                  <div className="text-xs text-white/50 mt-1">To Creator</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gold">1B</div>
                  <div className="text-xs text-white/50 mt-1">SACRED Supply</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gold">7</div>
                  <div className="text-xs text-white/50 mt-1">Sacred Stages</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                  <div className="text-3xl font-bold text-gold">33%</div>
                  <div className="text-xs text-white/50 mt-1">To BlyssDAO</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-24" data-testid="principles-section">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl p-5 text-center"
              >
                <div className="text-gold font-bold text-sm mb-2">{p.title}</div>
                <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7 Stages */}
        <section className="mb-24" id="stages" data-testid="stages-section">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
              <Layers className="w-4 h-4 text-gold" />
              <span className="text-gold font-medium text-sm">The Sacred Heptagon</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">7 Sacred Stages</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Seven stages arranged in a heptagonal pattern, each with unique energy, community, and purpose. Navigate through an illustrated festival map.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-black/50 border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-all group"
                data-testid={`stage-card-${i}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stage.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stage.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{stage.name}</h3>
                <p className="text-xs text-gold/70 font-medium uppercase tracking-wider mb-3">{stage.subtitle}</p>
                <p className="text-sm text-white/60 leading-relaxed">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SACRED Tokenomics */}
        <section className="mb-24" id="tokenomics" data-testid="tokenomics-section">
          <div className="bg-gradient-to-br from-gold/10 via-black to-purple-900/10 border border-gold/20 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
                <Coins className="w-4 h-4 text-gold" />
                <span className="text-gold font-medium text-sm">The SACRED Economy</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">SACRED Token</h2>
              <p className="text-white/60 max-w-xl mx-auto">1,000,000,000 Fixed Supply &bull; SPL-20 on Solana or ERC-20 on Polygon</p>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              {TOKEN_ALLOCATION.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <div className="w-16 text-right text-sm font-bold text-gold">{item.percent}%</div>
                  <div className="flex-1">
                    <div className="h-8 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                      <span className="absolute inset-0 flex items-center px-4 text-xs font-bold text-white/90">{item.label}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1 ml-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-2">95%</div>
                <div className="text-sm text-white/80 font-medium">To Creator</div>
                <p className="text-xs text-white/50 mt-2">Instant, automated via smart contracts</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-2">0.5%</div>
                <div className="text-sm text-white/80 font-medium">Transaction Fee</div>
                <p className="text-xs text-white/50 mt-2">50% auto-burned, 50% to stakers</p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-2">33%</div>
                <div className="text-sm text-white/80 font-medium">Sacred Tithe</div>
                <p className="text-xs text-white/50 mt-2">Foundation revenue to BlyssDAO Treasury</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator & Listener Features */}
        <section className="mb-24" data-testid="features-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-500 rounded-xl flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">For Creators</h2>
              </div>
              <p className="text-white/60 mb-8">Sovereignty restored. Every monetization stream flows directly to you.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CREATOR_FEATURES.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-gold/30 transition-all"
                  >
                    <f.icon className="w-5 h-5 text-gold mb-2" />
                    <h4 className="text-sm font-bold text-white mb-1">{f.title}</h4>
                    <p className="text-xs text-white/55 leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">For Listeners</h2>
              </div>
              <p className="text-white/60 mb-8">Sacred curation. Earn by engaging, discover by resonance.</p>
              <div className="space-y-4">
                {LISTENER_FEATURES.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                  >
                    <CheckCircle className="w-5 h-5 text-pink-400 shrink-0" />
                    <span className="text-sm text-white/80">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Artist Sanctum */}
        <section className="mb-24" data-testid="sanctum-section">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">The Artist Sanctum</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Three interconnected realms for creation, commerce, and collaboration.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ARTIST_SANCTUM.map((realm, i) => (
              <motion.div
                key={realm.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 text-center hover:border-gold/30 transition-all group"
                data-testid={`sanctum-card-${i}`}
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${realm.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <realm.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{realm.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{realm.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Audio Integration */}
        <section className="mb-24" data-testid="audio-section">
          <div className="bg-gradient-to-br from-purple-900/20 via-black to-pink-900/10 border border-purple-500/20 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-4">Sacred Audio Integration</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Persistent player architecture with seamless cross-site playback between BlyssDAO and Sacred.love.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="w-6 h-6 text-gold" />
                  <h3 className="text-lg font-bold text-white">Sacred Soundbar</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  A persistent bottom-mounted player on BlyssDAO with collapsed and expanded states, curated playlists, gapless playback, and direct streaming from IPFS.
                </p>
                <ul className="space-y-2">
                  {["Seamless playback across pages", "State persistence on navigation", "Gapless playback engine", "IPFS / Sacred.love CDN streaming"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MonitorPlay className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Sacred Toggle</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Switch between Music Mode (lyrics, visualizations, live chat) and Video Mode (full music videos, live performances, multi-camera angles, AR overlays).
                </p>
                <ul className="space-y-2">
                  {["Music Mode with lyrics & visualizations", "Video Mode with multi-camera angles", "Context-preserving mode switching", "Unified account sync across platforms"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-24" data-testid="roadmap-section">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Development Roadmap</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {ROADMAP.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 hover:border-gold/30 transition-all"
                data-testid={`roadmap-phase-${i}`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-bold">{phase.phase}</span>
                  <h3 className="text-lg font-bold text-white">{phase.name}</h3>
                  <span className="text-xs text-white/40">{phase.timeline}</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gold/60 font-medium">Target: {phase.target}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 text-center" data-testid="cta-section">
          <div className="bg-gradient-to-r from-gold/10 via-purple-900/10 to-pink-900/10 border border-gold/20 rounded-2xl p-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Join the Sacred Revolution</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Be among the first 333 Genesis Creators. Reclaim your sovereignty. Let your music heal the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/join/community" data-testid="link-become-creator">
                <button className="flex items-center gap-2 px-8 py-4 bg-gold text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all" data-testid="button-become-creator">
                  <Sparkles className="w-4 h-4" /> Become a Creator
                </button>
              </Link>
              <Link href="/projects" data-testid="link-explore-ecosystem">
                <button className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all" data-testid="button-explore-ecosystem">
                  <Globe className="w-4 h-4" /> Explore Ecosystem
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
