export interface CategoryItem {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export const fakeCategories: CategoryItem[] = [
  { id: 1, name: "HOT GAMES", icon: "🔥" },
  { id: 2, name: "INVITE FRIENDS", icon: "👨‍👩‍👧‍👦" },
  { id: 3, name: "FAVORITES", icon: "⭐" },
  { id: 4, name: "PROMOTION", icon: "🎁" },
  { id: 5, name: "SLOTS", icon: "🎰" },
  { id: 6, name: "REWARD CENTER", icon: "🏅" },
  { id: 7, name: "LIVE", icon: "🎲" },
  { id: 8, name: "MANUAL REBATE", icon: "🪙" },
  { id: 9, name: "POKER", icon: "🃏" },
  { id: 10, name: "VIP", icon: "👑" },
  { id: 11, name: "FISH", icon: "🐟" },
  { id: 12, name: "MISSION", icon: "🎯" },
  { id: 13, name: "SPORTS", icon: "⚽" },
  { id: 14, name: "ENGLISH", icon: "🌐" },
  { id: 15, name: "E-SPORTS", icon: "🎮" },
  { id: 16, name: "APP DOWNLOAD", icon: "📲" },
  { id: 17, name: "LOTTERY", icon: "🎟️" },
  { id: 18, name: "CUSTOMER SERVICE", icon: "🎧" },
];