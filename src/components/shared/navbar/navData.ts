/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Gift, Medal, Target, Users } from "lucide-react";

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

// type CategoryIcon = {
//   name: string;
//   color: string;
// };

// export const CATEGORY_ICONS: Record<string, CategoryIcon> = {
//   hot_games: { name: "Flame", color: "text-rose-400" },
//   invite_friends: { name: "Users", color: "text-teal-300" },
//   favorites: { name: "Star", color: "text-amber-400" },
//   promotion: { name: "Gift", color: "text-amber-400" },
//   slots: { name: "Trophy", color: "text-rose-400" },
//   reward_center: { name: "Medal", color: "text-amber-400" },
//   live: { name: "Dice5", color: "text-rose-400" },
//   manual_rebate: { name: "Coins", color: "text-amber-400" },
//   poker: { name: "Spade", color: "text-rose-400" },
//   vip: { name: "Crown", color: "text-amber-400" },
//   fish: { name: "Fish", color: "text-rose-400" },
//   mission: { name: "Target", color: "text-amber-400" },
//   sports: { name: "Trophy", color: "text-rose-400" },
//   english: { name: "Globe", color: "text-sky-400" },
//   esports: { name: "Gamepad2", color: "text-rose-400" },
//   app_download: { name: "Download", color: "text-emerald-400" },
//   lottery: { name: "Ticket", color: "text-rose-400" },
//   customer_service: { name: "Headphones", color: "text-emerald-400" },
// };


// import {
//   Flame,
//   Users,
//   Star,
//   Gift,
//   Trophy,
//   Medal,
//   Dice5,
//   Coins,
//   Spade,
//   Crown,
//   Fish,
//   Target,
//   Globe,
//   Gamepad2,
//   Download,
//   Ticket,
//   Headphones,
//   Rocket,
//   Joystick,
//   CircleDot,
//   Zap,
// } from "lucide-react";
// type CategoryImage = {
//   image: string;
// };

// export const CATEGORY_IMAGES: Record<string, CategoryImage> = {
//   hot_games: { image: "/images/categories/hot-games.png" },
//   favorites: { image: "/images/categories/favorites.png" },
//   slots: { image: "/images/categories/slots.svg" },
//   reward_center: { image: "/images/categories/reward-center.png" },
//   live: { image: "/images/categories/live.png" },
//   table: { image: "/images/categories/table.png" },
//   bingo: { image: "/images/categories/bingo.png" },
//   crash: { image: "/images/categories/crash.png" },
//   arcade: { image: "/images/categories/arcade.png" },
//   keno: { image: "/images/categories/keno.png" },
//   instant: { image: "/images/categories/instant.png" },
//   sportsbook: { image: "/images/categories/sport.png" },
//   manual_rebate: { image: "/images/categories/manual-rebate.png" },
//   poker: { image: "/images/categories/poker.png" },
//   vip: { image: "/images/categories/vip.png" },
//   fish: { image: "/images/categories/fish.png" },
//   sports: { image: "/images/categories/sports.png" },
//   english: { image: "/images/categories/english.png" },
//   esports: { image: "/images/categories/esports.png" },
//   app_download: { image: "/images/categories/app-download.png" },
//   lottery: { image: "/images/categories/lottery.png" },
//   customer_service: { image: "/images/categories/customer-service.png" },
// };
// export const CATEGORY_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
//   hot_games: { icon: Flame, color: "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" },
//   invite_friends: { icon: Users, color: "text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]" },
//   favorites: { icon: Star, color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
//   promotion: { icon: Gift, color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
//   slots: { icon: Trophy, color: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" },
//   reward_center: { icon: Medal, color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
//   live: { icon: Dice5, color: "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" },
//   manual_rebate: { icon: Coins, color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
//   poker: { icon: Spade, color: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" },
//   vip: { icon: Crown, color: "text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.6)]" },
//   fish: { icon: Fish, color: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" },
//   mission: { icon: Target, color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
//   sports: { icon: Trophy, color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" },
//   english: { icon: Globe, color: "text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" },
//   esports: { icon: Gamepad2, color: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" },
//   app_download: { icon: Download, color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" },
//   lottery: { icon: Ticket, color: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" },
//   customer_service: { icon: Headphones, color: "text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.5)]" },

//   table: { icon: Spade, color: "text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" },
//   bingo: { icon: Ticket, color: "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" },
//   crash: { icon: Rocket, color: "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" },
//   arcade: { icon: Joystick, color: "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" },
//   keno: { icon: CircleDot, color: "text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" },
//   instant: { icon: Zap, color: "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" },
// };
export const navItems = [
  {
    label: "PROMOTION",
    href: "/promotion",
    image: "/images/categories/promotion.png",
  },
  {
    label: "INVITE FRIENDS",
    href: "/invite",
    image: "/images/categories/add-friend.png",
  },
  { label: "REWARD", href: "/reward", image: "/images/categories/reward.png" },
  {
    label: "MISSION",
    href: "/mission",
    image: "/images/categories/mission.svg",
  },
];
