import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import { motion } from "framer-motion";
import { 
  Users, Globe, Sparkles, BookOpen, Film, Star,
  ArrowRight, Plus, Search, TrendingUp, Award,
  Check, Heart, MessageSquare, Share2, Eye,
  Layers, Crown, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

const ARIEL_FEATURES = [
  {
    title: "Create Universes",
    description: "Found your own collaborative story universe with AI-generated world bibles, character archetypes, and visual style guides.",
    icon: Globe,
    tier: "Producer+"
  },
  {
    title: "AI Continuity Engine",
    description: "Our GPT-4 powered continuity checker ensures all contributed episodes maintain story coherence and character consistency.",
    icon: Sparkles,
    tier: "All Tiers"
  },
  {
    title: "Contribute Episodes",
    description: "Join existing universes and contribute your own episodes. Earn ARIEL tokens for approved contributions.",
    icon: Film,
    tier: "Creator+"
  },
  {
    title: "Revenue Sharing",
    description: "Universe founders and contributors share streaming revenue proportionally based on views and engagement.",
    icon: TrendingUp,
    tier: "All Tiers"
  },
];

const SAMPLE_UNIVERSES = [
  {
    id: "neon-dreams",
    name: "Neon Dreams",
    genre: "Cyberpunk",
    founder: "CyberDirector",
    episodes: 12,
    contributors: 8,
    views: "45.2K",
    status: "Open",
    image: "/api/placeholder/400/200"
  },
  {
    id: "ancient-echoes",
    name: "Ancient Echoes",
    genre: "Fantasy",
    founder: "MythWeaver",
    episodes: 24,
    contributors: 15,
    views: "128K",
    status: "Open",
    image: "/api/placeholder/400/200"
  },
  {
    id: "star-wanderers",
    name: "Star Wanderers",
    genre: "Sci-Fi",
    founder: "CosmicTales",
    episodes: 8,
    contributors: 5,
    views: "22.1K",
    status: "Open",
    image: "/api/placeholder/400/200"
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Found or Join",
    description: "Create your own universe or browse existing ones to contribute"
  },
  {
    step: 2,
    title: "Pitch Episode",
    description: "Submit your episode concept with synopsis and timeline fit"
  },
  {
    step: 3,
    title: "AI Review",
    description: "Continuity engine checks for story coherence and character consistency"
  },
  {
    step: 4,
    title: "Produce",
    description: "Use Studios tools to create your episode with universe style matching"
  },
  {
    step: 5,
    title: "Earn",
    description: "Receive ARIEL tokens and share in streaming revenue"
  },
];

const ALLIANCE_LEVELS = [
  {
    level: "Viewer",
    tier: "Supporter",
    abilities: ["Watch universe content", "Vote on episode ideas", "Share IMPACT tokens"],
    color: "from-gray-500 to-gray-600"
  },
  {
    level: "Contributor",
    tier: "Creator+",
    abilities: ["Contribute episodes", "Earn ARIEL tokens", "Join up to 5 universes"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    level: "Founder",
    tier: "Producer+",
    abilities: ["Create universes", "Approve contributions", "Set revenue splits"],
    color: "from-purple-500 to-violet-600"
  },
  {
    level: "Alliance",
    tier: "Alliance",
    abilities: ["Unlimited universes", "Priority features", "Governance voting"],
    color: "from-gold to-amber-500"
  },
];

export default function BitflixAriel() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            >
              <source src="/video/bitflix-ariel-banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_60%)]" />
          </div>

          <div className="relative z-10 container mx-auto min-h-[70vh] flex flex-col justify-center items-center px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl"
            >
              <Badge data-testid="badge-ariel" className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                <Users className="w-4 h-4 mr-2" /> Collaborative Storytelling
              </Badge>

              <h1 data-testid="text-ariel-title" className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="text-cyan-400">Ariel</span>
              </h1>

              <p data-testid="text-ariel-tagline" className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Multi-director universes with AI-powered story continuity. 
                Found worlds, contribute episodes, and share in the success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  data-testid="button-create-universe"
                  size="lg"
                  onClick={() => setLocation("/bitflix/studios")}
                >
                  <Plus className="mr-2 w-5 h-5" /> Create Universe
                </Button>
                <Button 
                  data-testid="button-browse"
                  size="lg" 
                  variant="outline"
                  onClick={() => setLocation("/bitflix/stream")}
                >
                  <Search className="mr-2 w-5 h-5" /> Browse Universes
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 border-b border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 data-testid="text-features-title" className="text-4xl md:text-5xl font-bold mb-4">
                Collaborative <span className="text-cyan-400">Creation</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Build shared story worlds where multiple directors contribute to expanding narratives.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ARIEL_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-feature-${index}`}
                    className="bg-white/5 border-white/10 h-full hover-elevate"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <Badge className="mb-3 bg-white/10 text-gray-300 text-xs">{feature.tier}</Badge>
                      <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                <Layers className="w-4 h-4 mr-2" /> The Process
              </Badge>
              <h2 data-testid="text-process-title" className="text-4xl md:text-5xl font-bold mb-4">
                How <span className="text-cyan-400">Ariel</span> Works
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {HOW_IT_WORKS.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`step-${step.step}`}
                  className="flex items-start gap-6 mb-8"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Universes */}
        <section className="py-24 bg-gradient-to-b from-black via-cyan-900/10 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 data-testid="text-universes-title" className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="text-cyan-400">Universes</span>
              </h2>
              <p className="text-gray-400">Explore collaborative worlds open for contributions</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {SAMPLE_UNIVERSES.map((universe, index) => (
                <motion.div
                  key={universe.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-universe-${universe.id}`}
                    className="bg-white/5 border-white/10 overflow-hidden hover-elevate"
                  >
                    <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white">{universe.name}</h3>
                          <p className="text-gray-400 text-sm">by {universe.founder}</p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">{universe.status}</Badge>
                      </div>
                      <Badge className="mb-3 bg-white/10 text-gray-300 text-xs">{universe.genre}</Badge>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                        <div>
                          <div className="text-white font-semibold">{universe.episodes}</div>
                          <div className="text-gray-400">Episodes</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{universe.contributors}</div>
                          <div className="text-gray-400">Directors</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{universe.views}</div>
                          <div className="text-gray-400">Views</div>
                        </div>
                      </div>
                      <Button 
                        data-testid={`button-join-${universe.id}`}
                        variant="outline" 
                        className="w-full"
                      >
                        Join Universe
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button data-testid="button-view-all" variant="outline" size="lg">
                View All Universes <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Alliance Levels */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
                <Crown className="w-4 h-4 mr-2" /> Ariel Alliance
              </Badge>
              <h2 data-testid="text-alliance-title" className="text-4xl md:text-5xl font-bold mb-4">
                Alliance <span className="text-gold">Membership</span> Levels
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Your NFT Pass determines your abilities within the Ariel ecosystem.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ALLIANCE_LEVELS.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-level-${level.level.toLowerCase()}`}
                    className="bg-white/5 border-white/10 h-full"
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center mb-4`}>
                        <span className="text-white font-bold text-xl">{level.level[0]}</span>
                      </div>
                      <h3 className="font-bold text-white mb-1">{level.level}</h3>
                      <Badge className="mb-4 bg-white/10 text-gray-300 text-xs">{level.tier}</Badge>
                      <ul className="space-y-2 text-left">
                        {level.abilities.map((ability, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-300">
                            <Check className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                            {ability}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
              <CardContent className="p-12 text-center">
                <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Start Your Collaborative Journey
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Whether you're founding a universe or contributing to one, 
                  Ariel makes collaborative storytelling rewarding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    data-testid="button-cta-create" 
                    size="lg"
                    onClick={() => setLocation("/bitflix/studios")}
                  >
                    Create Universe <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    data-testid="button-cta-explore"
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/bitflix/stream")}
                  >
                    Explore Universes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/40 text-sm">
            Ariel - A BLYSS DAO Venture
          </p>
        </div>
      </footer>

      <AiConcierge />
    </div>
  );
}
