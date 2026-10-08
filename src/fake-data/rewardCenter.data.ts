export interface RewardTask {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  status: "claimable" | "in_progress" | "completed";
}

export interface RedeemableItem {
  id: string;
  title: string;
  pointsRequired: number;
  type: "Bonus Cash" | "Free Spins" | "Voucher";
  image: string;
}

export const USER_REWARD_SUMMARY = {
  currentPoints: 4250,
  tier: "VIP Gold",
  expiringSoon: 250,
  streakDays: 4,
};

export const REWARD_TASKS: RewardTask[] = [
  {
    id: "task_1",
    title: "Daily Login Bonus",
    description: "Log in today to claim your daily activity reward",
    points: 50,
    progress: 1,
    total: 1,
    status: "claimable",
  },
  {
    id: "task_2",
    title: "Place 5 Bets in Slot Games",
    description: "Play any PG Soft or Pragmatic slot games",
    points: 150,
    progress: 3,
    total: 5,
    status: "in_progress",
  },
  {
    id: "task_3",
    title: "First Deposit of the Day",
    description: "Deposit $20 or more to earn bonus points",
    points: 300,
    progress: 1,
    total: 1,
    status: "completed",
  },
];

export const CATALOG_ITEMS: RedeemableItem[] = [
  {
    id: "item_1",
    title: "$10 Bonus Cash",
    pointsRequired: 1000,
    type: "Bonus Cash",
    image: "💵",
  },
  {
    id: "item_2",
    title: "50 Free Spins (Gates of Olympus)",
    pointsRequired: 1500,
    type: "Free Spins",
    image: "🎰",
  },
  {
    id: "item_3",
    title: "$50 Reload Voucher",
    pointsRequired: 4500,
    type: "Voucher",
    image: "🎟️",
  },
];