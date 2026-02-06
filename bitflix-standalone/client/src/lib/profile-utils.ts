import type { User } from "@shared/schema";

export interface ProfileField {
  key: keyof User | string;
  label: string;
  weight: number;
  getValue: (user: User) => any;
}

export const PROFILE_FIELDS: ProfileField[] = [
  { key: "profileImageUrl", label: "Profile Photo", weight: 15, getValue: (u) => u.profileImageUrl },
  { key: "firstName", label: "First Name", weight: 10, getValue: (u) => u.firstName },
  { key: "lastName", label: "Last Name", weight: 10, getValue: (u) => u.lastName },
  { key: "username", label: "Username", weight: 10, getValue: (u) => u.username },
  { key: "bio", label: "Bio", weight: 15, getValue: (u) => u.bio },
  { key: "email", label: "Email", weight: 10, getValue: (u) => u.email },
  { key: "walletAddress", label: "Wallet Connected", weight: 10, getValue: (u) => u.walletAddress },
  { key: "interests", label: "Interests", weight: 5, getValue: (u) => u.interests?.length },
  { key: "skillTags", label: "Skills", weight: 5, getValue: (u) => (u as any).skillTags?.length },
  { key: "location", label: "Location", weight: 5, getValue: (u) => (u as any).location },
  { key: "website", label: "Website", weight: 5, getValue: (u) => (u as any).website },
];

export function calculateProfileCompleteness(user: User): number {
  let totalWeight = 0;
  let earnedWeight = 0;

  for (const field of PROFILE_FIELDS) {
    totalWeight += field.weight;
    const value = field.getValue(user);
    if (value && (typeof value !== "number" || value > 0)) {
      earnedWeight += field.weight;
    }
  }

  return Math.round((earnedWeight / totalWeight) * 100);
}

export function getMissingProfileFields(user: User): ProfileField[] {
  return PROFILE_FIELDS.filter((field) => {
    const value = field.getValue(user);
    return !value || (typeof value === "number" && value === 0);
  });
}

export function getProfileLevel(completeness: number): { level: string; color: string; icon: string } {
  if (completeness >= 90) return { level: "Complete", color: "text-emerald-400", icon: "trophy" };
  if (completeness >= 70) return { level: "Advanced", color: "text-blue-400", icon: "star" };
  if (completeness >= 50) return { level: "Intermediate", color: "text-gold", icon: "medal" };
  if (completeness >= 25) return { level: "Beginner", color: "text-orange-400", icon: "seedling" };
  return { level: "New", color: "text-white/60", icon: "user" };
}

export function formatLastActive(date: Date | string | null | undefined): string {
  if (!date) return "Never";
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return d.toLocaleDateString();
}

export const SKILL_TAG_COLORS: Record<string, string> = {
  "defi": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "smart-contracts": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "marketing": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "community": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "design": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "wellness": "bg-green-500/20 text-green-300 border-green-500/30",
  "meditation": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "yoga": "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "healing": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "writing": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "video": "bg-red-500/20 text-red-300 border-red-500/30",
  "photography": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "music": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "web3": "bg-gold/20 text-gold border-gold/30",
  "development": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "investing": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "real-estate": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "legal": "bg-slate-500/20 text-slate-300 border-slate-500/30",
  "finance": "bg-green-500/20 text-green-300 border-green-500/30",
  "strategy": "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

export const ACHIEVEMENT_INFO: Record<string, { name: string; icon: string; description: string; color: string }> = {
  "early_adopter": { name: "Early Adopter", icon: "rocket", description: "Joined in the first wave", color: "text-gold" },
  "first_post": { name: "First Steps", icon: "message-circle", description: "Made your first post", color: "text-blue-400" },
  "first_friend": { name: "Social Butterfly", icon: "users", description: "Made your first friend", color: "text-pink-400" },
  "profile_complete": { name: "All Set", icon: "check-circle", description: "Completed your profile", color: "text-emerald-400" },
  "streak_7": { name: "Week Warrior", icon: "flame", description: "7-day engagement streak", color: "text-orange-400" },
  "streak_30": { name: "Monthly Master", icon: "zap", description: "30-day engagement streak", color: "text-yellow-400" },
  "streak_100": { name: "Century Club", icon: "award", description: "100-day engagement streak", color: "text-purple-400" },
  "top_contributor": { name: "Top Contributor", icon: "trophy", description: "Top 10% contributor", color: "text-gold" },
  "governance_voter": { name: "Voice of DAO", icon: "vote", description: "Participated in governance", color: "text-indigo-400" },
  "course_complete": { name: "Scholar", icon: "graduation-cap", description: "Completed a course", color: "text-cyan-400" },
  "event_host": { name: "Event Host", icon: "calendar", description: "Hosted a community event", color: "text-rose-400" },
  "referral_master": { name: "Network Builder", icon: "share-2", description: "Referred 5+ members", color: "text-emerald-400" },
};
