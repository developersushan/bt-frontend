"use client";

import { EARNINGS_DATA, EarningsBreakdown } from "@/fake-data/earnings";
import React from "react";

interface EarningsCardProps {
  title: string;
  data: EarningsBreakdown;
}

// Reusable Metric Box inside the card grid
function MetricBox({
  label,
  value,
  isCurrency = true,
}: {
  label: string;
  value: string | number;
  isCurrency?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center">
      <span className="text-[11px] font-semibold text-slate-500 mb-1.5 whitespace-nowrap">
        {label}
      </span>
      <span className="text-sm font-extrabold text-indigo-950 flex items-center gap-0.5">
        {isCurrency && <span className="text-xs">৳</span>}
        {value}
      </span>
    </div>
  );
}

// Main Earnings Section Container Card (Today / Total)
function EarningsSectionCard({ title, data }: EarningsCardProps) {
  return (
    <div className="bg-slate-100/60 border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs space-y-2 p-4">
      
      {/* Top Header Label & Total Amount */}
      <div className="pb-3 border-b border-slate-200/60 flex items-center gap-1.5">
        <h3 className="text-sm font-extrabold text-slate-800">{title}:</h3>
        <span className="text-base font-black text-indigo-950 flex items-center gap-0.5">
          ৳ {data.totalAmount}
        </span>
      </div>

      {/* Grid Content Background Box */}
      <div className="bg-blue-50/40 rounded-xl p-3 border border-blue-100/50">
        {/* Row 1: 5 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <MetricBox label="Invitation Rewards" value={data.invitationRewards} />
          <MetricBox label="Achievement Rewards" value={data.achievementRewards} />
          <MetricBox label="Deposit Rebate" value={data.depositRebate} />
          <MetricBox label="Betting Rebate" value={data.bettingRebate} />
          <MetricBox label="Registers" value={data.registers} isCurrency={false} />
        </div>

        {/* Row 2: Centered Items */}
        <div className="grid grid-cols-2 sm:grid-cols-2 max-w-md mx-auto gap-2 pt-2 border-t border-slate-200/40 mt-1">
          <MetricBox label="Valid Referral" value={data.validReferrals} isCurrency={false} />
          <MetricBox label="Depositors" value={data.depositors} isCurrency={false} />
        </div>
      </div>
    </div>
  );
}

export default function EarningsTab() {
  return (
    <div className="space-y-4 font-sans text-xs text-slate-700 select-none">
      {/* Today's Income Section */}
      <EarningsSectionCard title="Today's Income" data={EARNINGS_DATA.today} />

      {/* Total Income Section */}
      <EarningsSectionCard title="Total Income" data={EARNINGS_DATA.overall} />
    </div>
  );
}