import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import { motion } from "framer-motion";
import { 
  Coins, Rocket, Shield, Crown, Star, Zap,
  ArrowRight, Check, Clock, Users, TrendingUp,
  Gift, Lock, Wallet, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const ITO_TIERS = [
  {
    tier: 1,
    name: "Alliance Founder",
    price: 0.01,
    priceDisplay: "$0.01",
    allocation: 20000000,
    allocationDisplay: "20M BLYS",
    maxRaise: "$200,000",
    minPurchase: 1000,
    maxPurchase: 50000,
    bonus: 30,
    passType: "Lifetime",
    fees: "0%",
    days: "Days 1-10",
    arielTokens: 10000,
    bfxTokens: 5000,
    impactTokens: 100,
    highlights: [
      "Lifetime membership (no expiration)",
      "0% platform fees forever",
      "Founding Director status in Ariel",
      "Permanent DAO voting seat",
      "Early access to ALL features (6 months ahead)",
      "Quarterly profit-sharing bonus (2%)",
      "Exclusive monthly calls with founder",
      "Annual Bitflix Alliance Summit (expenses paid)"
    ],
    status: "Coming Soon",
    highlight: true
  },
  {
    tier: 2,
    name: "Studio Pioneer",
    price: 0.015,
    priceDisplay: "$0.015",
    allocation: 40000000,
    allocationDisplay: "40M BLYS",
    maxRaise: "$600,000",
    minPurchase: 500,
    maxPurchase: 25000,
    bonus: 20,
    passType: "3 Years",
    fees: "1%",
    days: "Days 11-25",
    arielTokens: 5000,
    bfxTokens: 2500,
    impactTokens: 50,
    highlights: [
      "3-year membership",
      "1% platform fees",
      "Early access to features (3 months ahead)",
      "White-label platform customization",
      "API access for custom integrations",
      "Quarterly BFX token airdrops",
      "Priority customer support (24hr)",
      "Pioneer badge on all content"
    ],
    status: "Coming Soon",
    highlight: false
  },
  {
    tier: 3,
    name: "Producer Partner",
    price: 0.02,
    priceDisplay: "$0.02",
    allocation: 60000000,
    allocationDisplay: "60M BLYS",
    maxRaise: "$1,200,000",
    minPurchase: 250,
    maxPurchase: 10000,
    bonus: 15,
    passType: "2 Years",
    fees: "3%",
    days: "Days 26-40",
    arielTokens: 3000,
    bfxTokens: 1500,
    impactTokens: 30,
    highlights: [
      "2-year membership",
      "3% platform fees",
      "Early access to features (1 month ahead)",
      "Advanced AI tools (voice cloning, music)",
      "Unlimited project uploads",
      "Monthly BFX token airdrops",
      "Producer masterclass access",
      "Producer badge on content"
    ],
    status: "Coming Soon",
    highlight: false
  },
  {
    tier: 4,
    name: "Creator Collective",
    price: 0.025,
    priceDisplay: "$0.025",
    allocation: 60000000,
    allocationDisplay: "60M BLYS",
    maxRaise: "$1,500,000",
    minPurchase: 100,
    maxPurchase: 5000,
    bonus: 10,
    passType: "1 Year",
    fees: "5%",
    days: "Days 41-55",
    arielTokens: 1500,
    bfxTokens: 750,
    impactTokens: 15,
    highlights: [
      "1-year membership",
      "5% platform fees",
      "Standard feature access",
      "Upload 20 projects per year",
      "Basic AI tools",
      "Quarterly BFX token airdrops",
      "Creator community access",
      "Creator badge on content"
    ],
    status: "Coming Soon",
    highlight: false
  },
  {
    tier: 5,
    name: "Community Supporter",
    price: 0.03,
    priceDisplay: "$0.03",
    allocation: 20000000,
    allocationDisplay: "20M BLYS",
    maxRaise: "$600,000",
    minPurchase: 50,
    maxPurchase: 2500,
    bonus: 5,
    passType: "1 Year",
    fees: "7%",
    days: "Days 56-60",
    arielTokens: 500,
    bfxTokens: 250,
    impactTokens: 10,
    highlights: [
      "1-year membership",
      "7% platform fees (small discount)",
      "Standard feature access",
      "Upload 10 projects per year",
      "Basic AI tools",
      "Supporter badge on content"
    ],
    status: "Coming Soon",
    highlight: false
  },
];

export default function BitflixITO() {
  const [, setLocation] = useLocation();
  const [selectedTier, setSelectedTier] = useState(ITO_TIERS[0]);
  const [investAmount, setInvestAmount] = useState("1000");
  const [expandedTier, setExpandedTier] = useState<number | null>(1);
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

  const calculateTokens = () => {
    const amount = parseFloat(investAmount) || 0;
    const baseTokens = amount / selectedTier.price;
    const bonusTokens = baseTokens * (selectedTier.bonus / 100);
    return {
      base: Math.floor(baseTokens),
      bonus: Math.floor(bonusTokens),
      total: Math.floor(baseTokens + bonusTokens)
    };
  };

  const tokens = calculateTokens();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_60%)]" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge data-testid="badge-ito" className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                <Rocket className="w-4 h-4 mr-2" /> Initial Token Offering
              </Badge>

              <h1 data-testid="text-ito-title" className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-gold bg-clip-text text-transparent">
                  BLYS Token ITO
                </span>
              </h1>

              <p data-testid="text-ito-tagline" className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the Bitflix ecosystem at the ground floor. 
                5 time-released tiers over 60 days with exclusive NFT Pass bundles.
              </p>

              {/* Countdown */}
              <div className="inline-block p-6 bg-white/5 border border-purple-500/30 rounded-md mb-8">
                <p className="text-sm text-purple-300 mb-3">ITO Launching In</p>
                <div className="flex gap-4 justify-center">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.mins, label: "Mins" },
                    { value: countdown.secs, label: "Secs" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-4xl md:text-5xl font-bold text-white font-mono">{String(item.value).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">$5M</div>
                  <div className="text-gray-400">Target Raise</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">200M</div>
                  <div className="text-gray-400">BLYS Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">5</div>
                  <div className="text-gray-400">Tiers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Token Calculator */}
        <section className="py-16 border-y border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Coins className="w-5 h-5 text-gold" /> Token Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-gray-300">Select Tier</Label>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {ITO_TIERS.map((tier) => (
                          <Button
                            key={tier.tier}
                            data-testid={`button-tier-${tier.tier}`}
                            variant={selectedTier.tier === tier.tier ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTier(tier)}
                          >
                            T{tier.tier}
                          </Button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {selectedTier.name} - {selectedTier.priceDisplay}/BLYS
                      </p>

                      <div className="mt-4">
                        <Label className="text-gray-300">Investment Amount (USD)</Label>
                        <Input
                          data-testid="input-investment"
                          type="number"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          min={selectedTier.minPurchase}
                          max={selectedTier.maxPurchase}
                          className="mt-2 bg-white/5 border-white/20 text-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Min: ${selectedTier.minPurchase.toLocaleString()} | Max: ${selectedTier.maxPurchase.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-md p-6 border border-white/10">
                      <h3 className="font-semibold text-white mb-4">You Will Receive</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Base BLYS:</span>
                          <span className="text-white font-semibold">{tokens.base.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bonus ({selectedTier.bonus}%):</span>
                          <span className="text-emerald-400 font-semibold">+{tokens.bonus.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between">
                          <span className="text-white font-semibold">Total BLYS:</span>
                          <span className="text-gold text-xl font-bold">{tokens.total.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">+ ARIEL Tokens:</span>
                            <span className="text-cyan-400">{selectedTier.arielTokens.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">+ BFX Governance:</span>
                            <span className="text-purple-400">{selectedTier.bfxTokens.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">+ IMPACT Tokens:</span>
                            <span className="text-pink-400">{selectedTier.impactTokens} each type</span>
                          </div>
                        </div>
                        <div className="border-t border-white/10 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">NFT Pass:</span>
                            <Badge className="bg-gold/20 text-gold">{selectedTier.name}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button data-testid="button-participate" className="w-full mt-6" disabled>
                        <Lock className="mr-2 w-4 h-4" /> ITO Not Yet Open
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Tier Details */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 data-testid="text-tiers-title" className="text-4xl md:text-5xl font-bold mb-4">
                ITO <span className="text-gold">Tier Structure</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                5 time-released tiers over 60 days. Earlier tiers get better prices and more exclusive benefits.
              </p>
            </motion.div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {ITO_TIERS.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-tier-${tier.tier}`}
                    className={`${
                      tier.highlight 
                        ? 'bg-gradient-to-r from-gold/10 to-amber-500/10 border-gold/30' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <CardContent className="p-0">
                      <button
                        data-testid={`button-expand-tier-${tier.tier}`}
                        onClick={() => setExpandedTier(expandedTier === tier.tier ? null : tier.tier)}
                        className="w-full p-6 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-md bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                            <span className="text-purple-400 font-bold">{tier.tier}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white">{tier.name}</h3>
                              {tier.highlight && (
                                <Badge className="bg-gold text-black text-xs">
                                  <Crown className="w-3 h-3 mr-1" /> Best Value
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{tier.days}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gold">{tier.priceDisplay}</div>
                            <div className="text-xs text-gray-400">per BLYS</div>
                          </div>
                          <div className="text-right hidden md:block">
                            <div className="text-lg font-semibold text-emerald-400">+{tier.bonus}%</div>
                            <div className="text-xs text-gray-400">Bonus</div>
                          </div>
                          {expandedTier === tier.tier ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {expandedTier === tier.tier && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6 border-t border-white/10"
                        >
                          <div className="grid md:grid-cols-2 gap-6 pt-6">
                            <div>
                              <h4 className="font-semibold text-white mb-3">Token Package</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Allocation:</span>
                                  <span className="text-white">{tier.allocationDisplay}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Min Purchase:</span>
                                  <span className="text-white">${tier.minPurchase.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Max Purchase:</span>
                                  <span className="text-white">${tier.maxPurchase.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">ARIEL Bonus:</span>
                                  <span className="text-cyan-400">{tier.arielTokens.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">BFX Bonus:</span>
                                  <span className="text-purple-400">{tier.bfxTokens.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">IMPACT (each):</span>
                                  <span className="text-pink-400">{tier.impactTokens}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-3">NFT Pass Benefits</h4>
                              <ul className="space-y-1">
                                {tier.highlights.slice(0, 6).map((highlight, i) => (
                                  <li key={i} className="flex items-start text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
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
            <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-gold/10 border border-purple-500/30">
              <CardContent className="p-12 text-center">
                <Gift className="w-12 h-12 text-gold mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join the Waitlist
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Be the first to know when the ITO opens. 
                  Early waitlist members get exclusive notifications and preparation guides.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button data-testid="button-cta-waitlist" size="lg">
                    Join Waitlist <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    data-testid="button-cta-back"
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/bitflix")}
                  >
                    Back to Bitflix
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
            BLYS Token ITO - A BLYSS DAO Venture
          </p>
        </div>
      </footer>

      <AiConcierge />
    </div>
  );
}
