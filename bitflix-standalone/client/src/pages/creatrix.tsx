import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import { motion } from "framer-motion";
import { 
  Coins, Image, Share2, TrendingUp, Shield, Star,
  ArrowRight, Plus, Search, Users, Wallet,
  Check, Heart, BarChart3, Layers, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";

const CREATRIX_FEATURES = [
  {
    title: "NFT Minting",
    description: "Mint your films, episodes, and creative works as NFTs with full ownership rights on-chain.",
    icon: Image,
    color: "from-gold to-amber-500"
  },
  {
    title: "Fractionalization",
    description: "Split ownership of high-value content into tradeable fractions for broader investment access.",
    icon: Share2,
    color: "from-purple-500 to-violet-600"
  },
  {
    title: "Crowdfunding",
    description: "Raise production funds by selling future ownership stakes before your project is complete.",
    icon: Users,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Secondary Market",
    description: "Trade content NFTs on our marketplace with transparent pricing and royalty distribution.",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-600"
  },
];

const SAMPLE_LISTINGS = [
  {
    id: "neon-pilot",
    title: "Neon Dreams: Pilot Episode",
    creator: "CyberDirector",
    type: "Episode NFT",
    price: "500 BLYS",
    fractions: null,
    image: "/api/placeholder/300/200"
  },
  {
    id: "ancient-collection",
    title: "Ancient Echoes Collection",
    creator: "MythWeaver",
    type: "Fractionalized",
    price: "25 BLYS",
    fractions: "100/1000",
    image: "/api/placeholder/300/200"
  },
  {
    id: "star-fund",
    title: "Star Wanderers S2",
    creator: "CosmicTales",
    type: "Crowdfund",
    price: "Goal: $50K",
    fractions: "65% Funded",
    image: "/api/placeholder/300/200"
  },
];

const HOW_FRACTIONALIZATION_WORKS = [
  { step: 1, title: "Mint", description: "Create your content NFT on Creatrix" },
  { step: 2, title: "Fractionalize", description: "Split into 100-10,000 tradeable fractions" },
  { step: 3, title: "List", description: "Set fraction price and list on marketplace" },
  { step: 4, title: "Trade", description: "Investors buy/sell fractions freely" },
  { step: 5, title: "Earn", description: "All owners share streaming revenue" },
];

const MARKETPLACE_STATS = [
  { label: "Total Volume", value: "2.4M BLYS", change: "+12%" },
  { label: "Active Listings", value: "1,234", change: "+8%" },
  { label: "Unique Creators", value: "456", change: "+23%" },
  { label: "Avg. Sale Price", value: "850 BLYS", change: "+5%" },
];

export default function BitflixCreatrix() {
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
              <source src="/video/bitflix-creatrix-banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_60%)]" />
          </div>

          <div className="relative z-10 container mx-auto min-h-[70vh] flex flex-col justify-center items-center px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl"
            >
              <Badge data-testid="badge-creatrix" className="mb-6 bg-gold/20 text-gold border-gold/30 px-4 py-2">
                <Coins className="w-4 h-4 mr-2" /> NFT Marketplace
              </Badge>

              <h1 data-testid="text-creatrix-title" className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Creatrix <span className="text-gold">Exchange</span>
              </h1>

              <p data-testid="text-creatrix-tagline" className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Mint, fractionalize, and trade content NFTs. 
                Give investors ownership in your creative works and share in the success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  data-testid="button-mint-nft"
                  size="lg"
                  onClick={() => setLocation("/bitflix/studios")}
                >
                  <Plus className="mr-2 w-5 h-5" /> Mint NFT
                </Button>
                <Button 
                  data-testid="button-explore-market"
                  size="lg" 
                  variant="outline"
                  onClick={() => setLocation("/bitflix/creatrix")}
                >
                  <Search className="mr-2 w-5 h-5" /> Explore Market
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marketplace Stats */}
        <section className="py-12 border-b border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {MARKETPLACE_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`stat-${index}`}
                  className="text-center p-4 bg-white/5 rounded-md border border-white/10"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-xs text-emerald-400">{stat.change}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 data-testid="text-features-title" className="text-4xl md:text-5xl font-bold mb-4">
                Own Your <span className="text-gold">Content</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Transform your creative works into tradeable digital assets with real ownership and revenue rights.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CREATRIX_FEATURES.map((feature, index) => (
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
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 mx-auto rounded-md bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fractionalization Explainer */}
        <section className="py-24 bg-gradient-to-b from-black via-gold/5 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
                <Share2 className="w-4 h-4 mr-2" /> Fractionalization
              </Badge>
              <h2 data-testid="text-fraction-title" className="text-4xl md:text-5xl font-bold mb-4">
                How <span className="text-gold">Fractionalization</span> Works
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Split high-value content into affordable fractions that anyone can own and trade.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                {HOW_FRACTIONALIZATION_WORKS.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    data-testid={`fraction-step-${step.step}`}
                    className="flex flex-col items-center text-center p-4 w-36"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center mb-3">
                      <span className="text-gold font-bold">{step.step}</span>
                    </div>
                    <div className="font-semibold text-white text-sm">{step.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{step.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 data-testid="text-listings-title" className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="text-gold">Listings</span>
              </h2>
              <p className="text-gray-400">Discover investment opportunities in creative content</p>
            </motion.div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
                <TabsTrigger data-testid="tab-all" value="all">All</TabsTrigger>
                <TabsTrigger data-testid="tab-nfts" value="nfts">NFTs</TabsTrigger>
                <TabsTrigger data-testid="tab-fractions" value="fractions">Fractions</TabsTrigger>
                <TabsTrigger data-testid="tab-crowdfund" value="crowdfund">Crowdfund</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid md:grid-cols-3 gap-6">
                  {SAMPLE_LISTINGS.map((listing, index) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        data-testid={`card-listing-${listing.id}`}
                        className="bg-white/5 border-white/10 overflow-hidden hover-elevate"
                      >
                        <div className="h-40 bg-gradient-to-br from-gold/20 to-purple-500/20" />
                        <CardContent className="p-5">
                          <Badge className="mb-2 bg-gold/20 text-gold text-xs">{listing.type}</Badge>
                          <h3 className="font-bold text-white mb-1">{listing.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">by {listing.creator}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-lg font-bold text-gold">{listing.price}</div>
                              {listing.fractions && (
                                <div className="text-xs text-gray-400">{listing.fractions}</div>
                              )}
                            </div>
                            <Button data-testid={`button-buy-${listing.id}`} size="sm">
                              {listing.type === "Crowdfund" ? "Back" : "Buy"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nfts">
                <div className="text-center text-gray-400 py-12">
                  NFT listings coming soon...
                </div>
              </TabsContent>

              <TabsContent value="fractions">
                <div className="text-center text-gray-400 py-12">
                  Fractionalized listings coming soon...
                </div>
              </TabsContent>

              <TabsContent value="crowdfund">
                <div className="text-center text-gray-400 py-12">
                  Crowdfunding campaigns coming soon...
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-10">
              <Button data-testid="button-view-all" variant="outline" size="lg">
                View All Listings <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Card className="bg-gradient-to-r from-gold/10 to-amber-500/10 border border-gold/30">
              <CardContent className="p-12 text-center">
                <Wallet className="w-12 h-12 text-gold mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Tokenize Your Content?
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Connect your wallet and start minting NFTs, 
                  fractionalizing ownership, or launching crowdfunding campaigns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    data-testid="button-cta-connect" 
                    size="lg"
                    onClick={() => setLocation("/bitflix/ito")}
                  >
                    Connect Wallet <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    data-testid="button-cta-learn"
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/bitflix")}
                  >
                    Learn More
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
            Creatrix Exchange - A BLYSS DAO Venture
          </p>
        </div>
      </footer>

      <AiConcierge />
    </div>
  );
}
