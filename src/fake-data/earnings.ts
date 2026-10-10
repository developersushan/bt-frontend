export interface EarningsBreakdown {
  invitationRewards: string;
  achievementRewards: string;
  depositRebate: string;
  bettingRebate: string;
  registers: number;
  validReferrals: number;
  depositors: number;
  totalAmount: string;
}

export const EARNINGS_DATA: {
  today: EarningsBreakdown;
  overall: EarningsBreakdown;
} = {
  today: {
    invitationRewards: "0.00",
    achievementRewards: "0.00",
    depositRebate: "0.00",
    bettingRebate: "0.00",
    registers: 0,
    validReferrals: 0,
    depositors: 0,
    totalAmount: "0.00",
  },
  overall: {
    invitationRewards: "0.00",
    achievementRewards: "0.00",
    depositRebate: "0.00",
    bettingRebate: "0.00",
    registers: 0,
    validReferrals: 0,
    depositors: 0,
    totalAmount: "0.00",
  },
};