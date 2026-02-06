import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, TrendingUp, MessageSquare, BookOpen, Users, 
  Vote, Calendar, Flame, Target, Award, Zap, Crown,
  Star, Gift, Heart, Rocket, Shield, Sparkles, Clock
} from "lucide-react";

interface MemberStats {
  id: string;
  userId: string;
  totalPoints: number;
  forumPosts: number;
  forumReplies: number;
  coursesCompleted: number;
  coursesCreated: number;
  productsSold: number;
  referralsCount: number;
  referralEarnings: number;
  votesCount: number;
  eventsAttended: number;
  daoImpactScore: number;
  currentStreak: number;
  longestStreak: number;
}

interface MonthlyActivity {
  month: string;
  points: number;
  contributions: number;
  forumActivity: number;
  courseActivity: number;
  referralActivity: number;
}

interface MemberContribution {
  id: string;
  userId: string;
  type: string;
  description: string | null;
  points: number;
  metadata: string | null;
  createdAt: string;
}

interface LeaderboardEntry {
  id: string;
  username: string | null;
  profileImageUrl: string | null;
  totalPoints: number;
  daoImpactScore: number;
  rank: number;
}

interface MemberStatsChartsProps {
  userId: string;
}

const COLORS = ['#d4af37', '#10b981', '#8b5cf6', '#3b82f6', '#ef4444', '#f59e0b'];

const CONTRIBUTION_ICONS: Record<string, any> = {
  forum_post: MessageSquare,
  forum_reply: MessageSquare,
  course_completed: BookOpen,
  course_created: Crown,
  referral: Users,
  vote: Vote,
  event_attendance: Calendar,
  product_sold: Gift,
  login_streak: Flame,
  profile_complete: Star,
};

const CONTRIBUTION_COLORS: Record<string, string> = {
  forum_post: 'text-emerald-400',
  forum_reply: 'text-emerald-400',
  course_completed: 'text-purple-400',
  course_created: 'text-pink-400',
  referral: 'text-gold',
  vote: 'text-blue-400',
  event_attendance: 'text-rose-400',
  product_sold: 'text-amber-400',
  login_streak: 'text-orange-400',
  profile_complete: 'text-cyan-400',
};

const ACHIEVEMENTS = [
  { id: 'early_adopter', name: 'Early Adopter', icon: Rocket, description: 'Joined BLYSS DAO in its founding phase', color: 'from-gold to-amber-500' },
  { id: 'community_voice', name: 'Community Voice', icon: MessageSquare, description: 'Made 10+ forum contributions', color: 'from-emerald-500 to-green-600', threshold: { field: 'forumPosts', value: 10 } },
  { id: 'knowledge_seeker', name: 'Knowledge Seeker', icon: BookOpen, description: 'Completed 5+ courses', color: 'from-purple-500 to-violet-600', threshold: { field: 'coursesCompleted', value: 5 } },
  { id: 'governance_active', name: 'Governance Active', icon: Vote, description: 'Cast 5+ governance votes', color: 'from-blue-500 to-indigo-600', threshold: { field: 'votesCount', value: 5 } },
  { id: 'growth_driver', name: 'Growth Driver', icon: Users, description: 'Referred 3+ new members', color: 'from-gold to-orange-500', threshold: { field: 'referralsCount', value: 3 } },
  { id: 'event_enthusiast', name: 'Event Enthusiast', icon: Calendar, description: 'Attended 5+ community events', color: 'from-rose-500 to-pink-600', threshold: { field: 'eventsAttended', value: 5 } },
  { id: 'streak_master', name: 'Streak Master', icon: Flame, description: '30+ day contribution streak', color: 'from-orange-500 to-red-600', threshold: { field: 'longestStreak', value: 30 } },
  { id: 'content_creator', name: 'Content Creator', icon: Crown, description: 'Created a course for the community', color: 'from-pink-500 to-purple-600', threshold: { field: 'coursesCreated', value: 1 } },
];

const formatMonth = (monthStr: string) => {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short' });
};

const formatTimeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function MemberStatsCharts({ userId }: MemberStatsChartsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: stats, isLoading: statsLoading } = useQuery<MemberStats>({
    queryKey: ['member-stats', userId],
    queryFn: async () => {
      const res = await fetch(`/api/member-stats/${userId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch member stats');
      return res.json();
    },
  });

  const { data: monthlyData, isLoading: monthlyLoading } = useQuery<MonthlyActivity[]>({
    queryKey: ['member-monthly-activity', userId],
    queryFn: async () => {
      const res = await fetch(`/api/member-stats/${userId}/monthly`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch monthly activity');
      return res.json();
    },
  });
  
  const { data: contributions = [] } = useQuery<MemberContribution[]>({
    queryKey: ['member-contributions', userId],
    queryFn: async () => {
      const res = await fetch(`/api/member-stats/${userId}/contributions`, { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
  });
  
  const { data: leaderboard = [] } = useQuery<LeaderboardEntry[]>({
    queryKey: ['dao-leaderboard'],
    queryFn: async () => {
      const res = await fetch('/api/leaderboard', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const isLoading = statsLoading || monthlyLoading;

  const contributionBreakdown = stats ? [
    { name: 'Forum', value: stats.forumPosts + stats.forumReplies, color: '#10b981' },
    { name: 'Courses', value: stats.coursesCompleted + stats.coursesCreated, color: '#8b5cf6' },
    { name: 'Referrals', value: stats.referralsCount, color: '#d4af37' },
    { name: 'Voting', value: stats.votesCount, color: '#3b82f6' },
    { name: 'Events', value: stats.eventsAttended, color: '#ef4444' },
  ].filter(item => item.value > 0) : [];

  const radarData = stats ? [
    { category: 'Community', value: Math.min(100, (stats.forumPosts + stats.forumReplies) * 5) },
    { category: 'Learning', value: Math.min(100, stats.coursesCompleted * 20) },
    { category: 'Creating', value: Math.min(100, stats.coursesCreated * 25) },
    { category: 'Governance', value: Math.min(100, stats.votesCount * 10) },
    { category: 'Growth', value: Math.min(100, stats.referralsCount * 15) },
    { category: 'Events', value: Math.min(100, stats.eventsAttended * 10) },
  ] : [];

  const earnedAchievements = stats ? ACHIEVEMENTS.filter(a => {
    if (!a.threshold) return true;
    const statValue = stats[a.threshold.field as keyof MemberStats] as number;
    return statValue >= a.threshold.value;
  }) : [];

  const userRank = leaderboard.findIndex(e => e.id === userId) + 1;

  const statCards = stats ? [
    { label: 'Total Points', value: stats.totalPoints.toLocaleString(), icon: Trophy, color: 'text-gold' },
    { label: 'DAO Impact', value: stats.daoImpactScore, icon: Target, color: 'text-purple-400' },
    { label: 'Current Streak', value: `${stats.currentStreak} days`, icon: Flame, color: 'text-orange-400' },
    { label: 'Referrals', value: stats.referralsCount, icon: Users, color: 'text-emerald-400' },
    { label: 'Forum Posts', value: stats.forumPosts + stats.forumReplies, icon: MessageSquare, color: 'text-blue-400' },
    { label: 'Courses', value: stats.coursesCompleted, icon: BookOpen, color: 'text-cyan-400' },
    { label: 'Votes Cast', value: stats.votesCount, icon: Vote, color: 'text-indigo-400' },
    { label: 'Events', value: stats.eventsAttended, icon: Calendar, color: 'text-pink-400' },
  ] : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-8 text-center">
          <Award className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Start Your Journey</h3>
          <p className="text-white/60">
            Participate in the DAO to build your contribution score and unlock rewards.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <Target className="w-4 h-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <Clock className="w-4 h-4 mr-2" /> Activity
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <Award className="w-4 h-4 mr-2" /> Achievements
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
            <Trophy className="w-4 h-4 mr-2" /> Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all" data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-white/60">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/5 border-white/10" data-testid="chart-activity-trend">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-gold" />
                    Activity Trend
                  </CardTitle>
                  <CardDescription>Your contributions over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData || []}>
                        <defs>
                          <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" tickFormatter={formatMonth} stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} labelFormatter={formatMonth} />
                        <Area type="monotone" dataKey="points" stroke="#d4af37" fillOpacity={1} fill="url(#colorPoints)" name="Points" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/5 border-white/10" data-testid="chart-contribution-breakdown">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 text-gold" />
                    Contribution Breakdown
                  </CardTitle>
                  <CardDescription>Where your impact comes from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    {contributionBreakdown.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={contributionBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                            {contributionBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                          <Legend wrapperStyle={{ color: '#999' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-white/40">No contributions yet</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/5 border-white/10" data-testid="chart-activity-breakdown">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Crown className="w-5 h-5 text-gold" />
                    Monthly Activity
                  </CardTitle>
                  <CardDescription>Activity breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" tickFormatter={formatMonth} stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} labelFormatter={formatMonth} />
                        <Legend wrapperStyle={{ color: '#999' }} />
                        <Bar dataKey="forumActivity" name="Forum" fill="#10b981" />
                        <Bar dataKey="courseActivity" name="Courses" fill="#8b5cf6" />
                        <Bar dataKey="referralActivity" name="Referrals" fill="#d4af37" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white/5 border-white/10" data-testid="chart-impact-radar">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-gold" />
                    Impact Profile
                  </CardTitle>
                  <CardDescription>Your strengths across DAO activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="category" tick={{ fill: '#999', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#666', fontSize: 10 }} />
                        <Radar name="Impact" dataKey="value" stroke="#d4af37" fill="#d4af37" fillOpacity={0.3} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {stats.longestStreak > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-gradient-to-r from-gold/10 to-amber-500/10 border-gold/30" data-testid="achievements-banner">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                        <Flame className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gold">Streak Champion</h3>
                        <p className="text-white/60">Your longest streak: {stats.longestStreak} consecutive days</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {stats.referralEarnings > 0 && (
                        <Badge variant="outline" className="border-gold text-gold">${stats.referralEarnings.toLocaleString()} Earned</Badge>
                      )}
                      {stats.coursesCreated > 0 && (
                        <Badge variant="outline" className="border-purple-400 text-purple-400">Course Creator</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                Recent Contributions
              </CardTitle>
              <CardDescription>Your activity timeline in the DAO</CardDescription>
            </CardHeader>
            <CardContent>
              {contributions.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {contributions.slice(0, 20).map((contribution, i) => {
                    const Icon = CONTRIBUTION_ICONS[contribution.type] || Star;
                    const colorClass = CONTRIBUTION_COLORS[contribution.type] || 'text-white/60';
                    return (
                      <motion.div
                        key={contribution.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                        data-testid={`contribution-${contribution.id}`}
                      >
                        <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${colorClass}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium truncate">{contribution.description || contribution.type.replace(/_/g, ' ')}</p>
                            <Badge className="bg-gold/20 text-gold shrink-0">+{contribution.points} pts</Badge>
                          </div>
                          <p className="text-xs text-white/50 mt-1">{formatTimeAgo(contribution.createdAt)}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-white/40">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No contributions yet. Start participating in the DAO!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((achievement, i) => {
              const isEarned = earnedAchievements.some(a => a.id === achievement.id);
              const progress = achievement.threshold && stats 
                ? Math.min(100, ((stats[achievement.threshold.field as keyof MemberStats] as number) / achievement.threshold.value) * 100)
                : isEarned ? 100 : 0;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`bg-white/5 border-white/10 ${isEarned ? 'ring-2 ring-gold/50' : 'opacity-60'}`} data-testid={`achievement-${achievement.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shrink-0 ${!isEarned && 'grayscale'}`}>
                          <achievement.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold">{achievement.name}</h4>
                            {isEarned && <Sparkles className="w-4 h-4 text-gold" />}
                          </div>
                          <p className="text-xs text-white/60 mt-1">{achievement.description}</p>
                          {achievement.threshold && (
                            <div className="mt-3">
                              <Progress value={progress} className="h-1.5 bg-white/10" />
                              <p className="text-xs text-white/40 mt-1">
                                {Math.min(stats[achievement.threshold.field as keyof MemberStats] as number, achievement.threshold.value)} / {achievement.threshold.value}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gold" />
                DAO Leaderboard
              </CardTitle>
              <CardDescription>Top contributors across the ecosystem</CardDescription>
            </CardHeader>
            <CardContent>
              {userRank > 0 && (
                <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                  <p className="text-sm text-gold">Your Rank: <span className="font-bold text-2xl">#{userRank}</span> of {leaderboard.length} members</p>
                </div>
              )}
              
              {leaderboard.length > 0 ? (
                <div className="space-y-3">
                  {leaderboard.slice(0, 10).map((entry, i) => {
                    const isCurrentUser = entry.id === userId;
                    const rankColors = ['text-gold', 'text-gray-300', 'text-amber-600'];
                    
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-center gap-4 p-3 rounded-lg ${isCurrentUser ? 'bg-gold/10 border border-gold/30' : 'bg-white/5 hover:bg-white/10'} transition-all`}
                        data-testid={`leaderboard-entry-${i + 1}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i < 3 ? rankColors[i] : 'text-white/60'} ${i === 0 ? 'bg-gold/20' : 'bg-white/10'}`}>
                          {i + 1}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={entry.profileImageUrl || undefined} />
                          <AvatarFallback className="bg-white/10">{(entry.username || 'U')[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{entry.username || 'Anonymous'}</p>
                          <p className="text-xs text-white/50">Impact Score: {entry.daoImpactScore}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gold">{entry.totalPoints.toLocaleString()}</p>
                          <p className="text-xs text-white/50">points</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-white/40">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Leaderboard coming soon!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
