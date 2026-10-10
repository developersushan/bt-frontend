export interface RewardMilestone {
  id: string;
  title: string;
  rewardAmount: string;
  currentProgress: number;
  totalRequired: number;
  status: "available" | "claimed" | "in_progress";
  iconType: "medal_red" | "medal_green" | "medal_blue" | "ribbon" | "star" | "trophy" | "diamond" | "crown";
}

export const REWARD_MILESTONES: RewardMilestone[] = [
  {
    id: "m1",
    title: "Over 3 valid referral in total.",
    rewardAmount: "30.00",
    currentProgress: 0,
    totalRequired: 3,
    status: "available",
    iconType: "medal_red",
  },
  {
    id: "m2",
    title: "Over 7 valid referral in total.",
    rewardAmount: "40.00",
    currentProgress: 0,
    totalRequired: 7,
    status: "available",
    iconType: "medal_green",
  },
  {
    id: "m3",
    title: "Over 12 valid referral in total.",
    rewardAmount: "50.00",
    currentProgress: 0,
    totalRequired: 12,
    status: "available",
    iconType: "medal_blue",
  },
  {
    id: "m4",
    title: "Over 20 valid referral in total.",
    rewardAmount: "100.00",
    currentProgress: 0,
    totalRequired: 20,
    status: "available",
    iconType: "ribbon",
  },
  {
    id: "m5",
    title: "Over 50 valid referral in total.",
    rewardAmount: "300.00",
    currentProgress: 0,
    totalRequired: 50,
    status: "available",
    iconType: "ribbon",
  },
  {
    id: "m6",
    title: "Over 100 valid referral in total.",
    rewardAmount: "500.00",
    currentProgress: 0,
    totalRequired: 100,
    status: "available",
    iconType: "star",
  },
  {
    id: "m7",
    title: "Over 200 valid referral in total.",
    rewardAmount: "1,000.00",
    currentProgress: 0,
    totalRequired: 200,
    status: "available",
    iconType: "trophy",
  },
  {
    id: "m8",
    title: "Over 500 valid referral in total.",
    rewardAmount: "3,000.00",
    currentProgress: 0,
    totalRequired: 500,
    status: "available",
    iconType: "diamond",
  },
  {
    id: "m9",
    title: "Over 1000 valid referral in total.",
    rewardAmount: "5,000.00",
    currentProgress: 0,
    totalRequired: 1000,
    status: "available",
    iconType: "crown",
  },
  {
    id: "m10",
    title: "Over 2000 valid referral in total.",
    rewardAmount: "10,000.00",
    currentProgress: 0,
    totalRequired: 2000,
    status: "available",
    iconType: "crown",
  },
  {
    id: "m11",
    title: "Over 3000 valid referral in total.",
    rewardAmount: "15,000.00",
    currentProgress: 0,
    totalRequired: 3000,
    status: "available",
    iconType: "crown",
  },
  {
    id: "m12",
    title: "Over 5000 valid referral in total.",
    rewardAmount: "30,000.00",
    currentProgress: 0,
    totalRequired: 5000,
    status: "available",
    iconType: "crown",
  },
];