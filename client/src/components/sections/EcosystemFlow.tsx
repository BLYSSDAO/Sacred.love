import { motion } from "framer-motion";
import { BLYSS_CONTENT } from "@/lib/constants";
import { Smartphone, Satellite, Server, CreditCard, Shield, Users, Zap, Globe, ArrowRight, Check, Radio } from "lucide-react";
import { Link } from "wouter";
import lotusEcosystemImage from '@assets/generated_images/lotus_ecosystem_tech_infographic.png';
import handheldDevicesImage from '@assets/generated_images/handheld_satellite_tablet_devices.png';
import lightpayCardsImage from '@assets/generated_images/lightpay_crypto_payment_cards.png';

const STAKEHOLDER_BENEFITS = [
  { 
    title: "For Community Members", 
    benefits: [
      "Access forums, courses, and the BLYSS AI companion",
      "Earn rewards through referrals and engagement",
      "Connect with conscious investors and visionary builders",
      "Participate in community events and live streams"
    ],
    icon: Users,
    color: "from-gold/30"
  },
  { 
    title: "For Creators & Builders", 
    benefits: [
      "Launch courses on the Academy and earn passive income",
      "Sell products and services on the Marketplace",
      "Access DAO governance and proposal creation",
      "Build your reputation with achievement badges"
    ],
    icon: Server,
    color: "from-blue-500/30"
  },
  { 
    title: "For Investors", 
    benefits: [
      "Access pre-seed deals in incubated ventures",
      "Participate in staking vaults and revenue sharing",
      "Vote on treasury allocation and project funding",
      "Exclusive access to LightRok Capitol investment portal"
    ],
    icon: Zap,
    color: "from-purple-500/30"
  },
];

const HOW_IT_WORKS = [
  { 
    step: 1, 
    title: "Join the Community", 
    desc: "Connect your wallet and join BLYSS DAO for free. Access forums, AI companion, and community events.",
    icon: Users
  },
  { 
    step: 2, 
    title: "Mint Your Pass", 
    desc: "Upgrade to a membership tier to unlock creation tools, marketplace access, and governance rights.",
    icon: Shield
  },
  { 
    step: 3, 
    title: "Create & Participate", 
    desc: "Launch courses, sell products, vote on proposals, and earn rewards for your contributions.",
    icon: Zap
  },
  { 
    step: 4, 
    title: "Invest & Grow", 
    desc: "Access exclusive investment opportunities, staking vaults, and profit-sharing from incubated ventures.",
    icon: Globe
  },
];

export default function EcosystemFlow() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gold/5 to-black" />
      
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs font-mono uppercase tracking-[0.3em]">THE BLYSS ECOSYSTEM</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">How It All Works</h2>
          <p className="text-white/60 text-lg mt-4 max-w-3xl mx-auto">
            A sovereign ecosystem where conscious capital flows through decentralized infrastructure, 
            empowering creators, investors, and builders to co-create the regenerative economy.
          </p>
        </motion.div>

        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-gradient-to-b from-gold/10 to-transparent border border-gold/30 rounded-xl p-6 hover:border-gold/50 transition-all h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-gold font-mono font-bold">{item.step}</span>
                    </div>
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gold/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-20 border border-gold/30">
          <img src={lotusEcosystemImage} alt="Lotus Ecosystem" className="w-full aspect-[21/9] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
            <span className="text-gold text-xs font-mono uppercase tracking-wider">FLOWER OF LIFE ARCHITECTURE</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
              BlyssDAO at the Center—Every Component Connected
            </h3>
          </div>
        </div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <span className="text-gold text-xs font-mono uppercase tracking-[0.3em]">STAKEHOLDER BENEFITS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Who This Serves</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STAKEHOLDER_BENEFITS.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-b ${group.color} to-black/60 border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-all`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <group.icon className="w-8 h-8 text-gold" />
                  <h3 className="text-xl font-bold text-white">{group.title}</h3>
                </div>
                <ul className="space-y-3">
                  {group.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative rounded-xl overflow-hidden border border-gold/30"
          >
            <img src={lotusEcosystemImage} alt="BLYSS DAO Ecosystem" className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-gold text-xs font-mono uppercase">DAO ECOSYSTEM</span>
              <h3 className="text-xl font-bold text-white mt-2">Connected Community</h3>
              <p className="text-white/70 text-sm mt-2">
                Forums, courses, governance, and marketplace—all powered by transparent blockchain infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative rounded-xl overflow-hidden border border-gold/30"
          >
            <img src={lightpayCardsImage} alt="Investment Portal" className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-gold text-xs font-mono uppercase">INVESTMENT PORTAL</span>
              <h3 className="text-xl font-bold text-white mt-2">Conscious Capital</h3>
              <p className="text-white/70 text-sm mt-2">
                Access exclusive deals, staking vaults, and profit-sharing from regenerative ventures.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border border-gold/30 rounded-xl p-10 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join the New Paradigm</h3>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a conscious community reimagining how we organize, invest, and build together—where collective benefit and human flourishing come first.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all rounded-sm shadow-lg" data-testid="button-explore-ecosystem-flow">
              <Globe className="w-5 h-5" /> 
              Explore Our Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/membership" className="inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold font-bold text-sm uppercase tracking-widest hover:bg-gold hover:text-black transition-all rounded-sm" data-testid="button-mint-pass-flow">
              <Radio className="w-5 h-5" /> 
              Mint Your Pass
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
