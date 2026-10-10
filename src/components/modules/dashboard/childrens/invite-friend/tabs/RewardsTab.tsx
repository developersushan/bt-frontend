"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Award, Trophy, Crown, Gem, Star, Medal } from "lucide-react";
import { REWARD_MILESTONES, RewardMilestone } from "@/fake-data/reward";

// Lucide Icons Helper based on Image Badges
const renderBadgeIcon = (type: RewardMilestone["iconType"]) => {
  switch (type) {
    case "medal_red":
      return <Medal className="w-8 h-8 text-red-500 shrink-0" />;
    case "medal_green":
      return <Medal className="w-8 h-8 text-emerald-500 shrink-0" />;
    case "medal_blue":
      return <Medal className="w-8 h-8 text-blue-500 shrink-0" />;
    case "ribbon":
      return <Award className="w-8 h-8 text-indigo-500 shrink-0" />;
    case "star":
      return <Star className="w-8 h-8 text-amber-400 fill-amber-400 shrink-0" />;
    case "trophy":
      return <Trophy className="w-8 h-8 text-amber-500 shrink-0" />;
    case "diamond":
      return <Gem className="w-8 h-8 text-cyan-500 shrink-0" />;
    case "crown":
      return <Crown className="w-8 h-8 text-amber-500 fill-amber-400 shrink-0" />;
    default:
      return <Award className="w-8 h-8 text-slate-400 shrink-0" />;
  }
};

export default function RewardsTab() {
  return (
    <div className="space-y-3 font-sans text-xs text-slate-700 select-none">
      
      {/* Top Header Filter / Info */}
      <div className="flex items-center justify-end px-1">
        <span className="text-[11px] font-semibold text-slate-400 lowercase tracking-wider">
          permanent
        </span>
      </div>

      {/* Responsive Grid Layout (3 Columns on Desktop, Same as Image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {REWARD_MILESTONES.map((item) => {
          const isClaimable = item.currentProgress >= item.totalRequired;

          return (
            <div
              key={item.id}
              className="bg-slate-100/70 hover:bg-slate-100 border border-slate-200/60 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-colors shadow-2xs"
            >
              {/* Left Side: Badge Icon + Text Info */}
              <div className="flex items-center gap-3 min-w-0">
                {renderBadgeIcon(item.iconType)}

                <div className="space-y-1 truncate">
                  <p className="text-[11px] font-semibold text-slate-600 truncate leading-snug">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-400/20 text-slate-600 text-[9px] font-bold flex items-center justify-center">
                      ৳
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {item.rewardAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Progress Counter + Action Button */}
              <div className="flex flex-col items-end justify-center shrink-0 space-y-1.5">
                <div className="text-xs font-black text-slate-800">
                  <span>{item.currentProgress}</span>
                  <span className="text-[10px] text-slate-400 font-medium">/{item.totalRequired}</span>
                </div>

                <Button
                  type="button"
                  disabled={!isClaimable}
                  className={`h-6 px-3 text-[10px] font-semibold rounded-md transition-all shadow-none ${
                    isClaimable
                      ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer shadow-xs"
                      : "bg-purple-200/60 text-purple-600/80 cursor-not-allowed"
                  }`}
                >
                  {isClaimable ? "Claim" : "Available"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}