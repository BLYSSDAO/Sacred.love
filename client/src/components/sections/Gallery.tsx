import { motion } from "framer-motion";
import { IMAGES, BLYSS_CONTENT } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Gallery() {
  return (
    <section id="ecosystem" className="py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
      <AnimatedBackground variant="particles" opacity={0.1} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-gold font-mono-tech text-xs tracking-[0.3em] uppercase block mb-4 font-bold">
              Sectors of Impact
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Ecosystem
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-right mt-8 md:mt-0 font-light">
            From adaptogenic biotech to tokenized media studios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLYSS_CONTENT.sectors.map((sector, index) => (
            <motion.div 
              key={index}
              className="group relative h-[400px] overflow-hidden cursor-pointer border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <img 
                src={sector.image} 
                alt={sector.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-white">{sector.title}</h3>
                  <ArrowUpRight className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-white/70 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
