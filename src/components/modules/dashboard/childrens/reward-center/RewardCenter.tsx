"use client";

import { useState } from "react";
import { Award, Gift, CheckCircle2, Inbox, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CATALOG_ITEMS,
  REWARD_TASKS,
  RewardTask,
  USER_REWARD_SUMMARY,
} from "@/fake-data/rewardCenter.data";
import { useProfileStore } from "@/lib/useModalStore";
export default function RewardCenterPage() {
    const {setActiveTab}=useProfileStore()
  const [points, setPoints] = useState(USER_REWARD_SUMMARY.currentPoints);
  const [tasks, setTasks] = useState<RewardTask[]>(REWARD_TASKS);

  const handleClaim = (taskId: string, rewardPoints: number) => {
    setPoints((prev) => prev + rewardPoints);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "completed" as const } : t,
      ),
    );
  };

  const className =
    "rounded-none border-b-2 h-8.7 border-transparent data-active:border-b-red-500 data-active:text-red-500 data-active:font-bold data-active:bg-transparent data-active:shadow-none! text-xs font-semibold text-slate-600 px-1 pb-2.5 transition-all cursor-pointer whitespace-nowrap";

  return (
    <div className="w-full space-y-4 font-sans text-xs text-slate-700 select-none p-6">
      {/* Reward Center Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-red-50 text-red-500 border border-red-200 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
              {USER_REWARD_SUMMARY.tier}
            </span>
            <span className="text-slate-400 text-[11px]">
              {USER_REWARD_SUMMARY.streakDays}-Day Check-in Streak 🔥
            </span>
          </div>
          <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5 pt-0.5">
            <Gift className="w-4 h-4 text-red-500" /> Reward Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Bill Voucher Button */}
          <Button
            type="button"
            onClick={() => setActiveTab("bill-voucher")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 rounded-full px-3.5 h-8 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-500" />
            Bill Voucher
          </Button>

          {/* Points Box */}
          <div className="flex items-center gap-2.5 bg-slate-50/80 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
            <Award className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-[9px] text-slate-400 font-medium leading-none">
                Available Points
              </p>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">
                {points.toLocaleString()}{" "}
                <span className="text-[10px] font-semibold text-red-500">
                  PTS
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Container with Same Tabs Header Style */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <Tabs defaultValue="quests" className="w-full">
          {/* Exact Header Tab Style as DynamicRecordContainer */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 pt-2 bg-white">
            <TabsList className="bg-transparent h-auto p-0 gap-6 justify-start rounded-none overflow-x-auto no-scrollbar">
              <TabsTrigger value="quests" className={className}>
                Daily Quests & Tasks
              </TabsTrigger>
              <TabsTrigger value="shop" className={className}>
                Points Shop & Rewards
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Quests List */}
          <TabsContent
            value="quests"
            className="m-0 p-0 focus-visible:outline-none"
          >
            <div className="divide-y divide-slate-100">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-xs">
                          {task.title}
                        </span>
                        <span className="bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          +{task.points} PTS
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        {task.description}
                      </p>

                      <div className="flex items-center gap-2 pt-1 max-w-xs">
                        <Progress
                          value={(task.progress / task.total) * 100}
                          className="h-1.5 bg-slate-100"
                        />
                        <span className="text-[10px] text-slate-400 font-medium">
                          {task.progress}/{task.total}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {task.status === "claimable" ? (
                        <Button
                          type="button"
                          onClick={() => handleClaim(task.id, task.points)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 h-7 text-xs font-semibold shadow-xs cursor-pointer"
                        >
                          Claim
                        </Button>
                      ) : task.status === "completed" ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px] px-3 py-1 bg-emerald-50 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                        </span>
                      ) : (
                        <Button
                          type="button"
                          disabled
                          className="bg-slate-100 text-slate-400 rounded-full px-4 h-7 text-xs font-medium cursor-not-allowed shadow-none"
                        >
                          In Progress
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 py-16">
                  <Inbox className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                  <span className="text-slate-400 font-medium text-xs">
                    No active quests found
                  </span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab 2: Points Shop */}
          <TabsContent
            value="shop"
            className="m-0 p-4 focus-visible:outline-none"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CATALOG_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-slate-100/80 rounded-lg flex items-center justify-center text-xl">
                      {item.image}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        {item.type}
                      </span>
                      <h3 className="font-semibold text-slate-800 text-xs">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-red-500" />{" "}
                      {item.pointsRequired.toLocaleString()} PTS
                    </span>
                    <Button
                      type="button"
                      disabled={points < item.pointsRequired}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-slate-100 disabled:text-slate-400 text-white h-7 px-3 text-[11px] font-semibold rounded-full cursor-pointer shadow-xs"
                    >
                      Redeem
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
