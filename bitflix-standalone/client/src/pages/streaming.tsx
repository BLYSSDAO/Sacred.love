import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import { motion } from "framer-motion";
import { 
  Globe, Play, Heart, Star, TrendingUp, Users,
  ArrowRight, Search, Filter, Clock, Eye,
  Smile, Zap, Flame, Sparkles, ThumbsUp,
  Award, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";

const IMPACT_TOKENS = [
  { icon: Heart, name: "LOVE", color: "text-red-400", description: "Heartwarming content" },
  { icon: Smile, name: "JOY", color: "text-yellow-400", description: "Made you smile" },
  { icon: Zap, name: "MIND", color: "text-cyan-400", description: "Mind-expanding" },
  { icon: Flame, name: "FIRE", color: "text-orange-400", description: "Hot content" },
  { icon: Sparkles, name: "SACRED", color: "text-purple-400", description: "Spiritually uplifting" },
  { icon: ThumbsUp, name: "TRUTH", color: "text-blue-400", description: "Truthful & authentic" },
  { icon: Award, name: "MASTER", color: "text-gold", description: "Masterful creation" },
  { icon: Star, name: "LEGEND", color: "text-amber-400", description: "Legendary status" },
];

const STREAMING_FEATURES = [
  {
    title: "Decentralized CDN",
    description: "Content delivered via IPFS and Livepeer for censorship-resistant, global streaming.",
    icon: Globe
  },
  {
    title: "Pay-by-Impact",
    description: "Viewers reward creators with IMPACT tokens that translate to real earnings.",
    icon: Heart
  },
  {
    title: "Creator Rewards",
    description: "Earn BLYS tokens based on views, engagement, and IMPACT tokens received.",
    icon: TrendingUp
  },
  {
    title: "Community Driven",
    description: "Content discovery powered by community curation and AI recommendations.",
    icon: Users
  },
];

const FEATURED_CONTENT = [
  {
    id: "neon-ep1",
    title: "Neon Dreams: Episode 1",
    creator: "CyberDirector",
    universe: "Neon Dreams",
    duration: "24:30",
    views: "12.4K",
    rating: 4.8,
    thumbnail: "/api/placeholder/400/225"
  },
  {
    id: "ancient-ep3",
    title: "The Crystal Caverns",
    creator: "MythWeaver",
    universe: "Ancient Echoes",
    duration: "32:15",
    views: "28.1K",
    rating: 4.9,
    thumbnail: "/api/placeholder/400/225"
  },
  {
    id: "star-ep2",
    title: "Beyond the Nebula",
    creator: "CosmicTales",
    universe: "Star Wanderers",
    duration: "18:45",
    views: "8.7K",
    rating: 4.7,
    thumbnail: "/api/placeholder/400/225"
  },
  {
    id: "solo-film",
    title: "Whispers in the Dark",
    creator: "IndieFilmmaker",
    universe: null,
    duration: "45:00",
    views: "5.2K",
    rating: 4.6,
    thumbnail: "/api/placeholder/400/225"
  },
];

const TRENDING_UNIVERSES = [
  { name: "Neon Dreams", episodes: 12, views: "45K", genre: "Cyberpunk" },
  { name: "Ancient Echoes", episodes: 24, views: "128K", genre: "Fantasy" },
  { name: "Star Wanderers", episodes: 8, views: "22K", genre: "Sci-Fi" },
];

export default function BitflixStreaming() {
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
              <source src="/video/bitflix-streaming-banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%)]" />
          </div>

          <div className="relative z-10 container mx-auto min-h-[70vh] flex flex-col justify-center items-center px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl"
            >
              <Badge data-testid="badge-streaming" className="mb-6 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                <Globe className="w-4 h-4 mr-2" /> Decentralized Streaming
              </Badge>

              <h1 data-testid="text-streaming-title" className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Bitflix<span className="text-emerald-400">.io</span>
              </h1>

              <p data-testid="text-streaming-tagline" className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Decentralized streaming powered by IPFS and Livepeer. 
                Watch, reward creators with IMPACT tokens, and discover collaborative universes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  data-testid="button-start-watching"
                  size="lg"
                  onClick={() => setLocation("/bitflix/stream")}
                >
                  <Play className="mr-2 w-5 h-5" /> Start Watching
                </Button>
                <Button 
                  data-testid="button-browse"
                  size="lg" 
                  variant="outline"
                  onClick={() => setLocation("/bitflix/ariel")}
                >
                  <Search className="mr-2 w-5 h-5" /> Browse Content
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-b border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-6">
              {STREAMING_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`feature-${index}`}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 mx-auto rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT Tokens */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                <Heart className="w-4 h-4 mr-2" /> Pay-by-Impact
              </Badge>
              <h2 data-testid="text-impact-title" className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-emerald-400">IMPACT</span> Token System
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                8 unique emoticon tokens to express how content affected you. 
                Creators earn real value from your appreciation.
              </p>
            </motion.div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
              {IMPACT_TOKENS.map((token, index) => (
                <motion.div
                  key={token.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  data-testid={`impact-${token.name.toLowerCase()}`}
                  className="text-center p-3 bg-white/5 rounded-md border border-white/10 hover-elevate"
                >
                  <token.icon className={`w-8 h-8 mx-auto mb-2 ${token.color}`} />
                  <div className="text-xs font-semibold text-white">{token.name}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Share IMPACT tokens while watching to reward creators directly on-chain
              </p>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-24 bg-gradient-to-b from-black via-emerald-900/10 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center mb-12"
            >
              <div>
                <h2 data-testid="text-featured-title" className="text-3xl md:text-4xl font-bold mb-2">
                  Featured <span className="text-emerald-400">Content</span>
                </h2>
                <p className="text-gray-400">Trending films and episodes from creators</p>
              </div>
              <Button data-testid="button-filter" variant="outline" size="sm">
                <Filter className="mr-2 w-4 h-4" /> Filter
              </Button>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_CONTENT.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-content-${content.id}`}
                    className="bg-white/5 border-white/10 overflow-hidden hover-elevate"
                  >
                    <div className="relative h-36 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                        {content.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
                        <Button size="icon" variant="outline" className="rounded-full">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-white text-sm mb-1 truncate">{content.title}</h3>
                      <p className="text-gray-400 text-xs mb-2">by {content.creator}</p>
                      {content.universe && (
                        <Badge className="mb-2 bg-cyan-500/20 text-cyan-300 text-xs">{content.universe}</Badge>
                      )}
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {content.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold" /> {content.rating}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Universes */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 data-testid="text-universes-title" className="text-3xl md:text-4xl font-bold mb-4">
                Trending <span className="text-cyan-400">Universes</span>
              </h2>
              <p className="text-gray-400">Collaborative story worlds with multiple directors</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {TRENDING_UNIVERSES.map((universe, index) => (
                <motion.div
                  key={universe.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-universe-${index}`}
                    className="bg-white/5 border-white/10 hover-elevate"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">{universe.name}</h3>
                        <Badge className="bg-white/10 text-gray-300 text-xs">{universe.genre}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-white font-semibold">{universe.episodes}</div>
                          <div className="text-gray-400 text-xs">Episodes</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{universe.views}</div>
                          <div className="text-gray-400 text-xs">Views</div>
                        </div>
                      </div>
                      <Button 
                        data-testid={`button-watch-${index}`}
                        variant="outline" 
                        className="w-full mt-4"
                      >
                        Watch Series
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button 
                data-testid="button-all-universes"
                variant="outline" 
                size="lg"
                onClick={() => setLocation("/bitflix/ariel")}
              >
                Explore All Universes <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
              <CardContent className="p-12 text-center">
                <Play className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Start Streaming Now
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Watch unlimited content, support creators with IMPACT tokens, 
                  and discover the future of decentralized entertainment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    data-testid="button-cta-watch" 
                    size="lg"
                    onClick={() => setLocation("/bitflix/stream")}
                  >
                    Watch Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    data-testid="button-cta-create"
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/bitflix/studios")}
                  >
                    Start Creating
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
            Bitflix.io - A BLYSS DAO Venture
          </p>
        </div>
      </footer>

      <AiConcierge />
    </div>
  );
}
