import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  BarChart3, Award, Coins, ArrowRight, Sparkles
} from "lucide-react";

interface EcosystemNavProps {
  variant?: "full" | "compact";
}

const ECOSYSTEM_LINKS = [
  {
    id: "token-trader",
    name: "TokenTrader",
    shortName: "Invest",
    description: "Token sales & raises",
    icon: Coins,
    href: "/tokentrader",
    color: "from-gold to-amber-500",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/30",
  },
  {
    id: "dex",
    name: "DEX",
    shortName: "Trade",
    description: "Trade RWA tokens",
    icon: BarChart3,
    href: "/dex",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "agents",
    name: "Agent Program",
    shortName: "Earn",
    description: "Earn commissions",
    icon: Award,
    href: "/agents",
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
];

export default function EcosystemNav({ variant = "full" }: EcosystemNavProps) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/dex") {
      return location.startsWith("/dex");
    }
    if (href === "/tokentrader") {
      return location === "/tokentrader" || location.startsWith("/tokentrader/");
    }
    return location === href;
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full p-1 border border-white/10">
        {ECOSYSTEM_LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link key={link.id} href={link.href}>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  active
                    ? `bg-gradient-to-r ${link.color} text-black font-bold`
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                data-testid={`ecosystem-nav-${link.id}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{link.shortName}</span>
              </button>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-xl border-y border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-white/60 text-sm font-medium">BLYSS Ecosystem</span>
          </div>
          
          <div className="flex items-center gap-3">
            {ECOSYSTEM_LINKS.map((link, index) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link key={link.id} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all cursor-pointer ${
                      active
                        ? `${link.bgColor} border ${link.borderColor}`
                        : "bg-white/5 border border-white/10 hover:border-white/20"
                    }`}
                    data-testid={`ecosystem-card-${link.id}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      active ? `bg-gradient-to-r ${link.color}` : "bg-white/10"
                    }`}>
                      <Icon className={`w-5 h-5 ${active ? "text-black" : "text-white/70"}`} />
                    </div>
                    <div>
                      <p className={`font-bold ${active ? "text-white" : "text-white/80"}`}>
                        {link.name}
                      </p>
                      <p className="text-xs text-white/50">{link.description}</p>
                    </div>
                    {index < ECOSYSTEM_LINKS.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-white/30 ml-2" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
