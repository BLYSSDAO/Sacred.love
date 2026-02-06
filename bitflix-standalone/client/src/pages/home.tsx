import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import { motion } from "framer-motion";
import { 
  ArrowRight, Play, Film, Users, Coins, Globe, 
  Sparkles, Shield, Crown, Rocket,
  Video, ChevronRight, ExternalLink, Layers, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const FOUR_PILLARS = [
  {
    id: "studios",
    name: "Bitflix Studios",
    tagline: "AI Production Suite",
    description: "Script generation, video editing, AI voice synthesis, and music creation. Everything a solo creator needs to produce professional content.",
    icon: Video,
    color: "from-purple-500 to-violet-600",
    features: ["AI Script Writer", "Video Editor", "Voice Cloning", "Music Generation"],
    link: "/bitflix/studios"
  },
  {
    id: "ariel",
    name: "Ariel",
    tagline: "Collaborative Storytelling",
    description: "Multi-director universes with AI continuity. Found or join collaborative worlds where multiple creators contribute episodes to shared narratives.",
    icon: Users,
    color: "from-cyan-500 to-blue-600",
    features: ["Universe Creation", "AI Continuity Engine", "Episode Contributions", "Revenue Sharing"],
    link: "/bitflix/ariel"
  },
  {
    id: "creatrix",
    name: "Creatrix Exchange",
    tagline: "NFT Marketplace",
    description: "Mint, fractionalize, and trade content NFTs. Crowdfund your productions and give investors ownership in your creative works.",
    icon: Coins,
    color: "from-gold to-amber-500",
    features: ["NFT Minting", "Fractionalization", "Crowdfunding", "Secondary Market"],
    link: "/bitflix/creatrix"
  },
  {
    id: "streaming",
    name: "Bitflix.io",
    tagline: "Decentralized Streaming",
    description: "IPFS and Livepeer-powered streaming with pay-by-impact viewing. Viewers reward creators directly with IMPACT tokens.",
    icon: Globe,
    color: "from-emerald-500 to-teal-600",
    features: ["Decentralized CDN", "Pay-by-Impact", "IMPACT Tokens", "Creator Rewards"],
    link: "/bitflix/stream"
  },
];

const ITO_TIERS = [
  {
    tier: 1,
    name: "Alliance Founder",
    price: "$0.01",
    allocation: "20M BLYS",
    maxRaise: "$200,000",
    minPurchase: "$1,000",
    bonus: "30%",
    passType: "Lifetime",
    fees: "0%",
    highlight: true,
    status: "Coming Soon"
  },
  {
    tier: 2,
    name: "Studio Pioneer",
    price: "$0.015",
    allocation: "40M BLYS",
    maxRaise: "$600,000",
    minPurchase: "$500",
    bonus: "20%",
    passType: "3 Years",
    fees: "1%",
    highlight: false,
    status: "Coming Soon"
  },
  {
    tier: 3,
    name: "Producer Partner",
    price: "$0.02",
    allocation: "60M BLYS",
    maxRaise: "$1,200,000",
    minPurchase: "$250",
    bonus: "15%",
    passType: "2 Years",
    fees: "3%",
    highlight: false,
    status: "Coming Soon"
  },
  {
    tier: 4,
    name: "Creator Collective",
    price: "$0.025",
    allocation: "60M BLYS",
    maxRaise: "$1,500,000",
    minPurchase: "$100",
    bonus: "10%",
    passType: "1 Year",
    fees: "5%",
    highlight: false,
    status: "Coming Soon"
  },
  {
    tier: 5,
    name: "Community Supporter",
    price: "$0.03",
    allocation: "20M BLYS",
    maxRaise: "$600,000",
    minPurchase: "$50",
    bonus: "5%",
    passType: "1 Year",
    fees: "7%",
    highlight: false,
    status: "Coming Soon"
  },
];

const TOKEN_ECOSYSTEM = [
  {
    symbol: "BLYS",
    name: "Blyss Token",
    type: "ERC-20",
    supply: "1B",
    purpose: "Platform currency for purchases, tips, and staking",
    color: "from-purple-500 to-pink-500"
  },
  {
    symbol: "ARIEL",
    name: "Ariel Token",
    type: "ERC-20",
    supply: "500M",
    purpose: "Earned for collaborative universe contributions",
    color: "from-cyan-500 to-blue-500"
  },
  {
    symbol: "BFX",
    name: "Governance Token",
    type: "ERC-20",
    supply: "100M",
    purpose: "DAO voting and platform governance",
    color: "from-gold to-amber-500"
  },
  {
    symbol: "IMPACT",
    name: "Impact Tokens",
    type: "ERC-1155",
    supply: "Unlimited",
    purpose: "8 emoticon types for viewer-to-creator appreciation",
    color: "from-emerald-500 to-teal-500"
  },
];

const MEMBERSHIP_PASSES = [
  { name: "Explorer", price: "Free", features: ["10hr streaming/month", "Community access", "720p quality"] },
  { name: "Creator", price: "$99/yr", features: ["Unlimited streaming", "10 projects/year", "Basic AI tools"] },
  { name: "Producer", price: "$499/yr", features: ["Unlimited projects", "Advanced AI", "3% fees"] },
  { name: "Studio", price: "$2,499/yr", features: ["White-label", "API access", "1% fees"] },
  { name: "Alliance", price: "Invite Only", features: ["0% fees forever", "Lifetime access", "Governance seat"] },
];

export default function BitflixLanding() {
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState({ days: 30, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
              <source src="/video/bitflix-hero-banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_60%)]" />
          </div>

          <div className="relative z-10 container mx-auto min-h-screen flex flex-col justify-center items-center px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-5xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                  <Film className="w-4 h-4 mr-2" /> AI-Powered Creator Liberation
                </Badge>
              </motion.div>

              <motion.h1 
                data-testid="text-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-gold bg-clip-text text-transparent">
                  BITFLIX
                </span>
              </motion.h1>

              <motion.p
                data-testid="text-hero-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-3xl text-gray-200 mb-4"
              >
                Create. Collaborate. Own Your Content.
              </motion.p>

              <motion.p
                data-testid="text-hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-400 mb-10 max-w-3xl mx-auto"
              >
                The complete AI-powered production suite for independent creators. 
                Generate scripts, produce videos, collaborate on universes, mint NFTs, 
                and stream to a decentralized audience - all in one platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  data-testid="button-join-ito"
                  size="lg" 
                  onClick={() => setLocation("/bitflix/ito")}
                >
                  Join the ITO <Rocket className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  data-testid="button-explore"
                  size="lg" 
                  variant="outline" 
                >
                  <Play className="mr-2 w-5 h-5" /> Watch Demo
                </Button>
              </motion.div>

              {/* ITO Countdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="mt-12 p-6 bg-white/5 border border-purple-500/30 rounded-2xl backdrop-blur-sm inline-block"
              >
                <p className="text-sm text-purple-300 mb-3">ITO Launching In</p>
                <div className="flex gap-4 justify-center">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.mins, label: "Mins" },
                    { value: countdown.secs, label: "Secs" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">{String(item.value).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Four Pillars Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Layers className="w-4 h-4 mr-2" /> The Ecosystem
              </Badge>
              <h2 data-testid="text-pillars-title" className="text-4xl md:text-5xl font-bold mb-4">
                Four Pillars of <span className="text-purple-400">Creator Power</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A unified platform where AI production, collaborative storytelling, 
                NFT ownership, and decentralized streaming come together.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {FOUR_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-pillar-${pillar.id}`}
                    className="bg-white/5 border-white/10 h-full group hover-elevate"
                  >
                    <CardContent className="p-8 relative">
                      <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${pillar.color} opacity-10 blur-3xl`} />
                      
                      <div className="relative z-10">
                        <div className={`w-16 h-16 rounded-md bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6`}>
                          <pillar.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-1">{pillar.name}</h3>
                        <p className="text-purple-400 text-sm mb-4">{pillar.tagline}</p>
                        <p className="text-gray-400 mb-6">{pillar.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {pillar.features.map((feature, featureIndex) => (
                            <span 
                              key={feature}
                              data-testid={`text-feature-${pillar.id}-${featureIndex}`}
                              className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <Button 
                          data-testid={`button-learn-more-${pillar.id}`}
                          variant="outline" 
                          onClick={() => setLocation(pillar.link)}
                        >
                          Learn More <ChevronRight className="ml-1 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ITO Tiers Section */}
        <section className="py-24 bg-gradient-to-b from-black via-gold/5 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
                <Coins className="w-4 h-4 mr-2" /> Initial Token Offering
              </Badge>
              <h2 data-testid="text-ito-title" className="text-4xl md:text-5xl font-bold mb-4">
                Join the <span className="text-gold">BLYS Token</span> ITO
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                5 time-released tiers over 60 days. Early participants get the best prices, 
                bonus tokens, and exclusive NFT Membership Passes.
              </p>
              <p className="text-purple-400 mt-4 font-semibold">Target Raise: $5,000,000</p>
            </motion.div>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-4 min-w-[900px]">
                {ITO_TIERS.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      data-testid={`card-ito-tier-${tier.tier}`}
                      className={`h-full ${
                        tier.highlight 
                          ? 'bg-gradient-to-b from-gold/20 to-gold/5 border-gold/50' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <CardContent className="p-5 text-center">
                        {tier.highlight && (
                          <Badge className="mb-3 bg-gold text-black text-xs">
                            <Crown className="w-3 h-3 mr-1" /> Best Value
                          </Badge>
                        )}
                        <div className="text-xs text-gray-400 mb-1">Tier {tier.tier}</div>
                        <h3 className="font-bold text-white mb-2 text-sm">{tier.name}</h3>
                        <div className="text-2xl font-bold text-gold mb-1">{tier.price}</div>
                        <div className="text-xs text-gray-400 mb-4">per BLYS</div>
                        
                        <div className="space-y-2 text-xs text-left">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Allocation:</span>
                            <span className="text-white">{tier.allocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Min Buy:</span>
                            <span className="text-white">{tier.minPurchase}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Bonus:</span>
                            <span className="text-emerald-400">+{tier.bonus}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pass:</span>
                            <span className="text-purple-300">{tier.passType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Fees:</span>
                            <span className="text-cyan-300">{tier.fees}</span>
                          </div>
                        </div>
                        
                        <Badge className="mt-4 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                          {tier.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Token Ecosystem */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                <Share2 className="w-4 h-4 mr-2" /> Token Economy
              </Badge>
              <h2 data-testid="text-tokens-title" className="text-4xl md:text-5xl font-bold mb-4">
                Multi-Token <span className="text-cyan-400">Ecosystem</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Four interconnected tokens powering the Bitflix economy: platform currency, 
                collaboration rewards, governance, and viewer appreciation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOKEN_ECOSYSTEM.map((token, index) => (
                <motion.div
                  key={token.symbol}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-token-${token.symbol.toLowerCase()}`}
                    className="bg-white/5 border-white/10 h-full hover-elevate"
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${token.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">{token.symbol}</span>
                      </div>
                      <h3 className="font-bold text-white mb-1">{token.name}</h3>
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge className="bg-white/10 text-gray-300 text-xs">{token.type}</Badge>
                        <Badge className="bg-white/10 text-gray-300 text-xs">{token.supply}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{token.purpose}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Passes */}
        <section className="py-24 bg-gradient-to-b from-black via-purple-900/10 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Shield className="w-4 h-4 mr-2" /> NFT Membership
              </Badge>
              <h2 data-testid="text-membership-title" className="text-4xl md:text-5xl font-bold mb-4">
                Choose Your <span className="text-purple-400">Access Level</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                NFT-based membership passes unlock tier-specific features. 
                ITO participants receive passes automatically with their token purchase.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {MEMBERSHIP_PASSES.map((pass, index) => (
                <motion.div
                  key={pass.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-pass-${pass.name.toLowerCase()}`}
                    className="bg-white/5 border-white/10 h-full"
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-bold text-white mb-1 text-sm">{pass.name}</h3>
                      <div className="text-lg font-bold text-gold mb-3">{pass.price}</div>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {pass.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-gold/10 border border-purple-500/30 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
                <CardContent className="p-12 md:p-16 text-center relative">
                  <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Ready to <span className="text-purple-400">Create</span>?
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    Join the creator revolution. The ITO opens soon - secure your position 
                    as a founding member of the Bitflix ecosystem.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      data-testid="button-cta-ito"
                      size="lg" 
                      onClick={() => setLocation("/bitflix/ito")}
                    >
                      Join Waitlist <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      data-testid="button-cta-docs"
                      size="lg" 
                      variant="outline" 
                    >
                      <ExternalLink className="mr-2 w-5 h-5" /> Read Whitepaper
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">BITFLIX</span>
          </h2>
          <p className="text-white/40 text-xs tracking-widest mb-4">
            A BLYSS DAO Venture
          </p>
          <p className="text-white/30 text-xs">
            2025 Bitflix. All Rights Reserved. Built on Optimism L2.
          </p>
        </div>
      </footer>

      <AiConcierge />
    </div>
  );
}
