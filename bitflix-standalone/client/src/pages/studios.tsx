import Navbar from "@/components/layout/Navbar";
import AiConcierge from "@/components/ui/AiConcierge";
import { motion } from "framer-motion";
import { 
  ArrowRight, FileText, Video, Mic, Music, 
  Wand2, Sparkles, Play, Upload, Layers,
  PenTool, Film, Volume2, Palette, Zap, Lock,
  ChevronRight, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";

const AI_TOOLS = [
  {
    id: "script",
    name: "AI Script Generator",
    description: "Transform ideas into professional screenplays with GPT-4 powered writing assistance.",
    icon: FileText,
    features: [
      "Genre-specific screenplay formatting",
      "Character development assistance",
      "Dialogue enhancement",
      "Scene breakdown generation",
      "Multiple revision modes"
    ],
    tier: "Creator+",
    color: "from-purple-500 to-violet-600"
  },
  {
    id: "video",
    name: "Video Production Suite",
    description: "Timeline-based video editing with AI-powered effects, transitions, and automatic scene detection.",
    icon: Video,
    features: [
      "Drag-and-drop timeline editor",
      "AI scene detection & auto-cuts",
      "Professional transitions library",
      "Color grading presets",
      "Export in multiple formats"
    ],
    tier: "Creator+",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "voice",
    name: "AI Voice Synthesis",
    description: "200+ AI voices with emotion control, or clone your own voice for narration.",
    icon: Mic,
    features: [
      "200+ premium AI voices",
      "Multi-language support",
      "Emotion & tone control",
      "Voice cloning (Producer+)",
      "Real-time preview"
    ],
    tier: "Creator+",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "music",
    name: "AI Music Generator",
    description: "Generate royalty-free soundtracks and scores tailored to your content's mood.",
    icon: Music,
    features: [
      "Genre-based generation",
      "Mood matching algorithms",
      "Custom duration & tempo",
      "Royalty-free licensing",
      "Stem separation"
    ],
    tier: "Producer+",
    color: "from-pink-500 to-rose-600"
  },
];

const WORKFLOW_STEPS = [
  { step: 1, title: "Write", description: "Generate or upload your screenplay", icon: PenTool },
  { step: 2, title: "Produce", description: "Create visuals with AI assistance", icon: Film },
  { step: 3, title: "Voice", description: "Add narration and dialogue", icon: Volume2 },
  { step: 4, title: "Score", description: "Generate custom soundtrack", icon: Music },
  { step: 5, title: "Publish", description: "Mint NFT and stream", icon: Upload },
];

const MEMBERSHIP_FEATURES = [
  { feature: "Script Generator", explorer: false, creator: true, producer: true, studio: true },
  { feature: "Video Editor", explorer: false, creator: true, producer: true, studio: true },
  { feature: "AI Voices (Basic)", explorer: false, creator: true, producer: true, studio: true },
  { feature: "Voice Cloning", explorer: false, creator: false, producer: true, studio: true },
  { feature: "AI Music", explorer: false, creator: false, producer: true, studio: true },
  { feature: "4K Export", explorer: false, creator: false, producer: true, studio: true },
  { feature: "White-Label", explorer: false, creator: false, producer: false, studio: true },
  { feature: "API Access", explorer: false, creator: false, producer: false, studio: true },
];

export default function BitflixStudios() {
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
              <source src="/video/bitflix-studios-banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          <div className="relative z-10 container mx-auto min-h-[70vh] flex flex-col justify-center items-center px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl"
            >
              <Badge data-testid="badge-studios" className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                <Video className="w-4 h-4 mr-2" /> AI Production Suite
              </Badge>

              <h1 data-testid="text-studios-title" className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Bitflix <span className="text-purple-400">Studios</span>
              </h1>

              <p data-testid="text-studios-tagline" className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Professional filmmaking tools powered by AI. Write scripts, produce videos, 
                synthesize voices, and compose music - all from one platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  data-testid="button-start-creating"
                  size="lg"
                  onClick={() => setLocation("/bitflix/studios/create")}
                >
                  <Wand2 className="mr-2 w-5 h-5" /> Start Creating
                </Button>
                <Button 
                  data-testid="button-view-pricing"
                  size="lg" 
                  variant="outline"
                  onClick={() => setLocation("/bitflix")}
                >
                  View Pricing
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 border-b border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 data-testid="text-workflow-title" className="text-3xl md:text-4xl font-bold mb-4">
                From Idea to <span className="text-purple-400">Stream</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our integrated workflow takes you from concept to published content in five simple steps.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-0">
              {WORKFLOW_STEPS.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div 
                    data-testid={`step-${step.step}`}
                    className="flex flex-col items-center text-center p-4 w-32"
                  >
                    <div className="w-14 h-14 rounded-md bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-3">
                      <step.icon className="w-7 h-7 text-purple-400" />
                    </div>
                    <div className="text-xs text-purple-400 mb-1">Step {step.step}</div>
                    <div className="font-semibold text-white text-sm">{step.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{step.description}</div>
                  </div>
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <ChevronRight className="w-6 h-6 text-gray-600 hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Tools Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Tools
              </Badge>
              <h2 data-testid="text-tools-title" className="text-4xl md:text-5xl font-bold mb-4">
                Professional <span className="text-purple-400">Production Suite</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to create professional content, powered by the latest AI models.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {AI_TOOLS.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    data-testid={`card-tool-${tool.id}`}
                    className="bg-white/5 border-white/10 h-full hover-elevate"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-14 h-14 rounded-md bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <Badge className="bg-white/10 text-gray-300">{tool.tier}</Badge>
                      </div>
                      <CardTitle className="text-xl text-white mt-4">{tool.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{tool.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tool.features.map((feature, i) => (
                          <li 
                            key={i}
                            data-testid={`text-feature-${tool.id}-${i}`}
                            className="flex items-center text-sm text-gray-300"
                          >
                            <Check className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        data-testid={`button-try-${tool.id}`}
                        variant="outline" 
                        className="w-full mt-6"
                      >
                        Try {tool.name.split(' ')[0]} <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-24 bg-gradient-to-b from-black via-purple-900/10 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 data-testid="text-comparison-title" className="text-3xl md:text-4xl font-bold mb-4">
                Feature <span className="text-purple-400">Access</span> by Tier
              </h2>
              <p className="text-gray-400">
                Unlock more powerful tools as you upgrade your membership.
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">Explorer</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">Creator</th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">Producer</th>
                    <th className="text-center py-4 px-4 text-purple-400 font-medium">Studio</th>
                  </tr>
                </thead>
                <tbody>
                  {MEMBERSHIP_FEATURES.map((row, index) => (
                    <tr 
                      key={row.feature}
                      data-testid={`row-feature-${index}`}
                      className="border-b border-white/5"
                    >
                      <td className="py-3 px-4 text-white">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {row.explorer ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.creator ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.producer ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center bg-purple-500/5">
                        {row.studio ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Button 
                data-testid="button-upgrade"
                size="lg"
                onClick={() => setLocation("/bitflix")}
              >
                View All Plans <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30">
              <CardContent className="p-12 text-center">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Create Your First Project?
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Start with a free Explorer account to explore the platform, 
                  or upgrade to unlock the full AI production suite.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    data-testid="button-cta-create"
                    size="lg"
                  >
                    Start Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    data-testid="button-cta-pricing"
                    size="lg" 
                    variant="outline"
                    onClick={() => setLocation("/bitflix")}
                  >
                    Compare Plans
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
            Bitflix Studios - A BLYSS DAO Venture
          </p>
        </div>
      </footer>

      <AiConcierge />
    </div>
  );
}
