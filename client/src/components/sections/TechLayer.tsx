import { motion } from "framer-motion";
import { IMAGES, BLYSS_CONTENT } from "@/lib/constants";
import { ShieldCheck, Cpu, Globe, Wallet, Database, Users } from "lucide-react";
import { Link } from "wouter";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function TechLayer() {
  return (
    <section id="infrastructure" className="py-32 bg-background relative overflow-hidden">
      <AnimatedBackground variant="particles" opacity={0.15} />
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
        <img src={IMAGES.tech} className="w-full h-full object-cover scale-110" alt="Torus Field" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gold/50">⌇</span>
            <span className="text-gold font-mono-tech text-xs tracking-[0.3em] uppercase font-bold">
              Infrastructure
            </span>
            <span className="text-gold/50">⌇</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {BLYSS_CONTENT.tech_stack.title}
          </h2>
          <p className="max-w-2xl text-white/70 font-medium text-lg">
            A proprietary stack integrating fiat, crypto, and LightPay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {BLYSS_CONTENT.tech_stack.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-gold/50 transition-all group"
            >
              <div className="w-2 h-2 bg-gold mb-4 rounded-full group-hover:animate-pulse" />
              <h3 className="font-bold text-lg text-white">{feature}</h3>
            </motion.div>
          ))}
        </div>

        {/* Membership Tiers */}
        <div id="membership" className="bg-black text-white py-20 -mx-6 md:-mx-20 px-6 md:px-20 relative overflow-hidden">
           {/* Background Spiral */}
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
             <img src={IMAGES.spiralDna} className="w-full h-full object-cover mix-blend-screen" alt="Spiral DNA" />
           </div>

          <div className="text-center mb-16 relative z-10">
             <span className="text-gold font-mono-tech text-xs tracking-[0.3em] uppercase mb-4 block font-bold">
              Access Keys
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Mint Pass Economy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {BLYSS_CONTENT.membership.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative p-8 border ${i === 3 ? 'border-gold bg-gold/10' : 'border-white/20 bg-white/5'} hover:bg-white/10 transition-colors duration-300 flex flex-col h-full backdrop-blur-md`}
              >
                {i === 3 && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
                    Enterprise
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2 text-white">{tier.tier}</h3>
                <p className="text-2xl font-mono-tech text-gold mb-6">{tier.price}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-xs text-white font-medium flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Link href="/membership">
                  <button className={`w-full py-3 text-xs font-bold uppercase tracking-widest border transition-colors ${i === 3 ? 'bg-gold text-black border-gold hover:bg-white hover:text-black' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}>
                    Select
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
