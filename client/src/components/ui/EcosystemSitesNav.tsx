import { motion } from "framer-motion";
import { Brain, Mountain, GraduationCap, Rocket } from "lucide-react";

const ECOSYSTEM_SITES = [
  {
    name: "BLYSS.AI",
    desc: "AI Intelligence Hub",
    url: "/blyss-ai",
    icon: Brain
  },
  {
    name: "Summit",
    desc: "Authentic AI Summit",
    url: "/summit",
    icon: Mountain
  },
  {
    name: "Training",
    desc: "AI Twin Academy",
    url: "/training",
    icon: GraduationCap
  },
  {
    name: "Platform",
    desc: "Main DAO Portal",
    url: "/",
    icon: Rocket
  }
];

interface EcosystemSitesNavProps {
  compact?: boolean;
}

export default function EcosystemSitesNav({ compact = false }: EcosystemSitesNavProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-4 flex-wrap justify-center" data-testid="ecosystem-nav-compact">
        <span className="text-white/40 text-xs font-mono tracking-wider">ECOSYSTEM:</span>
        {ECOSYSTEM_SITES.map((site, i) => (
          <a
            key={i}
            href={site.url}
            className="flex items-center gap-1.5 text-xs transition-colors text-white/60 hover:text-gold"
            data-testid={`ecosystem-link-${site.name.toLowerCase().replace(/\./g, '-')}`}
          >
            <site.icon className="w-3 h-3" />
            <span>{site.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 border-t border-white/10" data-testid="ecosystem-nav-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">The BLYSS Ecosystem</span>
          <p className="text-white/40 text-sm mt-2">One vision, multiple pathways</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {ECOSYSTEM_SITES.map((site, i) => (
            <motion.a
              key={i}
              href={site.url}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative p-4 rounded-lg border text-center transition-all border-white/10 bg-white/[0.02] hover:border-gold/30 hover:bg-gold/5"
              data-testid={`ecosystem-card-${site.name.toLowerCase().replace(/\./g, '-')}`}
            >
              <site.icon className="w-6 h-6 mx-auto mb-2 text-gold/70 group-hover:text-gold transition-colors" />
              <h4 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {site.name}
              </h4>
              <p className="text-xs text-white/40 mt-1">{site.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
