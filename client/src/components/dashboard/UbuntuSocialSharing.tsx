import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Copy,
  Check,
  Coins,
  Users,
  TrendingUp,
  Heart,
  Globe,
  Sparkles,
  Gift,
  Award,
  Crown,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const PLATFORMS = [
  { id: "twitter", name: "X (Twitter)", icon: Twitter, color: "bg-black hover:bg-gray-800" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600 hover:bg-blue-700" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700 hover:bg-blue-800" },
  { id: "telegram", name: "Telegram", icon: MessageCircle, color: "bg-cyan-500 hover:bg-cyan-600" },
  { id: "email", name: "Email", icon: Mail, color: "bg-gray-600 hover:bg-gray-700" },
];

const UBUNTU_WISDOM = [
  "I am because we are.",
  "If it's not good for everyone, it's no good at all.",
  "A person is a person through other people.",
  "Humanity towards others.",
  "The belief in a universal bond of sharing that connects all humanity.",
];

interface ShareableContent {
  title: string;
  description: string;
  hashtags: string;
  url: string;
}

interface ShareContentData {
  refCode: string;
  shareableContent: {
    membership: ShareableContent;
    referralInvite: ShareableContent;
    academy: ShareableContent;
  };
  ubuntuWisdom: string[];
}

interface UbuntuSummary {
  userId: string;
  blyssTokenBalance: number;
  lifetimeTokensEarned: number;
  lifetimeTokensSpent: number;
  totalShares: number;
  totalReferrals: number;
  communityImpactScore: number;
  abundanceMeterPercent: number;
  referralCode: string;
  referralLink: string;
}

interface TokenInfo {
  balance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  communityImpactScore: number;
  abundanceMeter: number;
  history: Array<{
    id: string;
    amount: number;
    transactionType: string;
    sourceType: string;
    description: string;
    createdAt: string;
  }>;
}

export default function UbuntuSocialSharing() {
  const [copied, setCopied] = useState(false);
  const [selectedContent, setSelectedContent] = useState<"membership" | "referralInvite" | "academy">("referralInvite");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: shareContent } = useQuery<ShareContentData>({
    queryKey: ["/api/ubuntu/share-content"],
  });

  const { data: summary } = useQuery<UbuntuSummary>({
    queryKey: ["/api/ubuntu/summary"],
  });

  const { data: tokenInfo } = useQuery<TokenInfo>({
    queryKey: ["/api/ubuntu/tokens"],
  });

  const shareMutation = useMutation({
    mutationFn: async ({ platform, contentType, contentTitle }: { platform: string; contentType: string; contentTitle: string }) => {
      const res = await fetch("/api/ubuntu/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, contentType, contentTitle }),
      });
      if (!res.ok) throw new Error("Share failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/ubuntu/summary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/ubuntu/tokens"] });
      toast.success(`+${data.tokensEarned} BLYSS tokens earned!`, {
        description: data.message,
      });
    },
  });

  const handleShare = (platform: string) => {
    const content = shareContent?.shareableContent[selectedContent];
    if (!content) return;

    const shareText = `${content.title}\n\n${content.description}\n\n${content.hashtags}`;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(content.url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(content.url)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(content.url)}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(content.url)}&text=${encodeURIComponent(shareText)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(content.title)}&body=${encodeURIComponent(shareText + "\n\n" + content.url)}`;
        break;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");

    shareMutation.mutate({
      platform,
      contentType: selectedContent,
      contentTitle: content.title,
    });
  };

  const copyReferralLink = async () => {
    const link = summary?.referralLink || shareContent?.shareableContent.referralInvite.url;
    if (link) {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Referral link copied to clipboard!");
    }
  };

  const randomWisdom = UBUNTU_WISDOM[Math.floor(Math.random() * UBUNTU_WISDOM.length)];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gold/10 via-amber-900/20 to-black border-gold/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIxMiwxNzUsNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-black" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gold font-bold">Ubuntu Contribution Center</CardTitle>
                <CardDescription className="text-white/60 italic">"{randomWisdom}"</CardDescription>
              </div>
            </div>
            <Badge className="bg-gold/20 text-gold border-gold/30 px-4 py-2 text-lg font-bold" data-testid="badge-blyss-balance">
              <Coins className="w-5 h-5 mr-2" />
              {tokenInfo?.balance || 0} BLYSS
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-white/10" data-testid="stat-total-shares">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Share2 className="w-4 h-4" />
                Total Shares
              </div>
              <div className="text-2xl font-bold text-white" data-testid="text-total-shares">{summary?.totalShares || 0}</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-white/10" data-testid="stat-referrals">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Users className="w-4 h-4" />
                Referrals
              </div>
              <div className="text-2xl font-bold text-emerald-400" data-testid="text-referrals">{summary?.totalReferrals || 0}</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-white/10" data-testid="stat-impact-score">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                Impact Score
              </div>
              <div className="text-2xl font-bold text-cyan-400" data-testid="text-impact-score">{summary?.communityImpactScore || 0}</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-white/10" data-testid="stat-lifetime-earned">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Sparkles className="w-4 h-4" />
                Lifetime Earned
              </div>
              <div className="text-2xl font-bold text-gold" data-testid="text-lifetime-earned">{tokenInfo?.lifetimeEarned || 0}</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/60 text-sm">Abundance Meter</span>
              <span className="text-gold font-bold">{summary?.abundanceMeterPercent || 0}%</span>
            </div>
            <Progress value={summary?.abundanceMeterPercent || 0} className="h-3 bg-white/10" />
            <p className="text-white/40 text-xs mt-2">
              The more you give, the more abundance flows through you
            </p>
          </div>

          <div className="bg-black/40 rounded-xl p-4 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Your Referral Code</h3>
                <p className="text-white/60 text-sm">Share this code to earn BLYSS tokens</p>
              </div>
              <Badge className="bg-gold text-black font-mono text-lg px-4 py-2" data-testid="badge-referral-code">
                {summary?.referralCode || shareContent?.refCode || "---"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={summary?.referralLink || shareContent?.shareableContent.referralInvite.url || ""}
                className="flex-1 bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white/80 text-sm font-mono"
                data-testid="input-referral-link"
              />
              <Button
                onClick={copyReferralLink}
                variant="outline"
                className="border-gold/50 text-gold hover:bg-gold/10"
                data-testid="button-copy-referral"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-gold" />
            Share & Earn BLYSS Tokens
          </CardTitle>
          <CardDescription className="text-white/60">
            Spread the message of conscious investing and earn 5 BLYSS tokens per share
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={selectedContent} onValueChange={(v) => setSelectedContent(v as any)}>
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="referralInvite" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <Gift className="w-4 h-4 mr-2" />
                Invite Friends
              </TabsTrigger>
              <TabsTrigger value="membership" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <Crown className="w-4 h-4 mr-2" />
                Membership
              </TabsTrigger>
              <TabsTrigger value="academy" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <Award className="w-4 h-4 mr-2" />
                Academy
              </TabsTrigger>
            </TabsList>

            {["referralInvite", "membership", "academy"].map((contentType) => (
              <TabsContent key={contentType} value={contentType} className="mt-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
                  <h4 className="text-white font-semibold mb-2">
                    {shareContent?.shareableContent[contentType as keyof typeof shareContent.shareableContent]?.title}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {shareContent?.shareableContent[contentType as keyof typeof shareContent.shareableContent]?.description}
                  </p>
                  <p className="text-gold/60 text-xs mt-2">
                    {shareContent?.shareableContent[contentType as keyof typeof shareContent.shareableContent]?.hashtags}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {PLATFORMS.map((platform) => (
                    <Button
                      key={platform.id}
                      onClick={() => handleShare(platform.id)}
                      disabled={shareMutation.isPending}
                      className={`${platform.color} text-white flex items-center justify-center gap-2 py-6`}
                      data-testid={`button-share-${platform.id}`}
                    >
                      <platform.icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{platform.name}</span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {tokenInfo?.history && tokenInfo.history.length > 0 && (
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-gold" />
              Recent Token Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tokenInfo.history.slice(0, 10).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
                  data-testid={`token-transaction-${tx.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.amount > 0 ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}>
                      {tx.amount > 0 ? (
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm">{tx.description || tx.sourceType}</p>
                      <p className="text-white/40 text-xs">
                        {formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <Badge className={tx.amount > 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount} BLYSS
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
