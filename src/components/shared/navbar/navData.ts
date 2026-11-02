"use client";
import { Gift, Percent, Target, Users } from "lucide-react";

export const CATEGORY_ICONS: Record<string, string> = {
  hot_games: "🔥",
  invite_friends: "👨‍👩‍👧‍👦",
  favorites: "⭐",
  promotion: "🎁",
  slots: "🎰",
  reward_center: "🏅",
  live: "🎲",
  manual_rebate: "🪙",
  poker: "🃏",
  vip: "👑",
  fish: "🐟",
  mission: "🎯",
  sports: "⚽",
  english: "🌐",
  esports: "🎮",
  app_download: "📲",
  lottery: "🎟️",
  customer_service: "🎧",

  table: "♠️",
  bingo: "🔢",
  crash: "🚀",
  arcade: "🕹️",
  keno: "🎱",
  instant: "⚡",
};

export const navItems = [
  { label: "Promotion", href: "/promotion", icon: Percent },
  { label: "Invite Friends", icon: Users },
  { label: "Reward", icon: Gift },
  { label: "Mission", icon: Target },
];