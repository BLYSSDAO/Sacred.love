import { motion } from "framer-motion";
import { IMAGES, BLYSS_CONTENT } from "@/lib/constants";
import { ArrowRight, Cpu, Heart, Globe, Film, Zap, Coins } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Philosophy() {
  return (
    <section id="ethos" className="py-32 bg-background relative overflow-hidden">
      <AnimatedBackground variant="particles" opacity={0.12} />
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/30 -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      {/* Static Lotus Element - Rotation removed */}
      <div className="absolute -left-20 top-20 w-96 h-96 opacity-10 pointer-events-none z-0">
        <img src={IMAGES.lotus} alt="Sacred Geometry" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* New Bold Intro Section */}
        <div className="max-w-5xl mx-auto mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-mono-tech text-xs tracking-[0.3em] uppercase block mb-6 font-bold">
              {BLYSS_CONTENT.ethos.subtitle}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-white">
              {BLYSS_CONTENT.ethos.description}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16">
               <div className="bg-secondary/50 p-8 border-l-2 border-gold backdrop-blur-sm">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                   <Zap className="w-5 h-5 text-gold" /> Creator Toolkit
                 </h3>
                 <p className="text-white/80 leading-relaxed text-sm">
                   {BLYSS_CONTENT.ethos.manifesto[0]}
                 </p>
               </div>
               
               <div className="bg-secondary/50 p-8 border-l-2 border-blue-500 backdrop-blur-sm">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                   <Coins className="w-5 h-5 text-blue-500" /> BaaS Liquidity
                 </h3>
                 <p className="text-white/80 leading-relaxed text-sm">
                   {BLYSS_CONTENT.ethos.manifesto[2]}
                 </p>
               </div>

               <div className="bg-secondary/50 p-8 border-l-2 border-green-500 backdrop-blur-sm">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                   <Globe className="w-5 h-5 text-green-500" /> Stakeholder Bridge
                 </h3>
                 <p className="text-white/80 leading-relaxed text-sm">
                   {BLYSS_CONTENT.ethos.manifesto[1]}
                 </p>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-mono-tech text-xs tracking-[0.3em] uppercase block mb-6 font-bold">
              Ethos & Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8 text-white">
              {BLYSS_CONTENT.ethos.title}
            </h2>
            <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
              <p>
                {BLYSS_CONTENT.ethos.summary}
              </p>
              <div className="p-6 bg-gold/10 border-l-2 border-gold">
                <p className="text-sm font-medium text-white/90 italic">
                  "{BLYSS_CONTENT.ethos.indigenous_partnership}"
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold flex items-center gap-2">
                <span className="text-gold/60">⟁</span> Pillars of the New Economy <span className="text-gold/60">⟁</span>
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {BLYSS_CONTENT.ethos.pillars?.map((pillar, i) => {
                  const Icon = pillar.icon === 'cpu' ? Cpu : pillar.icon === 'heart' ? Heart : pillar.icon === 'globe' ? Globe : Film;
                  return (
                    <div key={i} className="flex items-start gap-4 group cursor-pointer p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                      <div className="p-2 bg-gold/10 rounded-full text-gold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-gold transition-colors">{pillar.title}</h4>
                        <p className="text-sm text-white/60 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[800px] w-full overflow-hidden rounded-sm group shadow-2xl">
              <img 
                src={IMAGES.lotus} 
                alt="AI Lotus" 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen z-10"
              />
              <img 
                src={IMAGES.detail} 
                alt="Enterprise Hub" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              {/* Darkened gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />
              
              <div className="absolute bottom-12 left-12 right-12 text-white z-30">
                <div className="bg-black/40 backdrop-blur-sm p-6 rounded-sm border-l-2 border-gold mb-6">
                  <span className="block text-gold text-xs tracking-[0.2em] mb-2 font-bold drop-shadow-md">REGENERATIVE INFRASTRUCTURE</span>
                  <p className="text-lg font-light opacity-100 drop-shadow-md text-white">
                    Modeling regenerative real-estate and energy systems for planetary health.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="bg-black/70 backdrop-blur-md p-4 border border-white/10 rounded-sm flex items-center justify-between shadow-lg">
                    <div>
                      <span className="text-xl font-bold text-gold block mb-1">Dedicated</span>
                      <span className="text-xs uppercase tracking-wider text-white font-medium">Revenue Stream</span>
                    </div>
                    <div className="h-full w-[1px] bg-white/10 mx-4"></div>
                    <p className="text-xs text-white/70 max-w-[200px] text-right">
                      Sacred commitment to Four Worlds Jaguar Alliance.
                    </p>
                  </div>
                  <div className="bg-black/70 backdrop-blur-md p-4 border border-white/10 rounded-sm flex items-center justify-between shadow-lg">
                    <div>
                      <span className="text-2xl font-bold text-gold block mb-1">100%</span>
                      <span className="text-xs uppercase tracking-wider text-white font-medium">Sovereign Owned</span>
                    </div>
                    <div className="h-full w-[1px] bg-white/10 mx-4"></div>
                    <p className="text-xs text-white/70 max-w-[200px] text-right">
                      Community governed and owned by the DAO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
