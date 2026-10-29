"use client";

import React from "react";
import { RefreshCcw, Flame, Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function MissionMilestones() {
  const milestones = [
    { id: 1, current: 0, target: 100.0, bonus: 1.0 },
    { id: 2, current: 0, target: 1000.0, bonus: 5.0 },
    { id: 3, current: 0, target: 5000.0, bonus: 10.0 },
    { id: 4, current: 0, target: 10000.0, bonus: 15.0 },
  ];

  const className =
    "cursor-pointer text-slate-600 data-active:shadow-none! data-active:border-b-red-500 data-active:text-red-500 data-active:font-bold rounded-none border-b-2 transition-all text-xs font-semibold px-1 pb-2.5 whitespace-nowrap";    

  return (
    <div className="w-full bg-slate-50/50 p-4 md:p-6 rounded-xl border border-slate-200/80 shadow-2xs space-y-6">
      {/* (In progress, Coming soon, Finished) */}
      <Tabs defaultValue="in-progress" className="w-full space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-4">
          <TabsList className="bg-transparent p-0 h-auto gap-6">
            <TabsTrigger value="in-progress" className={className}>
              In progress
            </TabsTrigger>
            <TabsTrigger value="coming-soon" className={className}>
              Coming soon
            </TabsTrigger>
            <TabsTrigger value="finished" className={className}>
              Finished
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="in-progress" className="m-0">
          <Tabs defaultValue="milestones" className="w-full space-y-6">
            <div className="flex border-b border-slate-200 pb-3 justify-end">
              <TabsList className="bg-transparent p-0 h-auto gap-6">
                <TabsTrigger value="milestones" className={className}>
                  Milestones
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className={className}>
                  Leaderboard
                </TabsTrigger>
                <TabsTrigger value="rules" className={className}>
                  Rules
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative w-full rounded-2xl bg-linear-to-br from-indigo-900 via-purple-700 to-indigo-600 p-5 text-white shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                        alt="User"
                        className="w-11 h-11 rounded-full border-2 border-white/30 object-cover shadow-xs"
                      />
                      <span className="font-semibold text-sm tracking-wide">
                        01612302011
                      </span>
                    </div>
                    <button className="text-white/80 hover:text-white transition-transform active:rotate-180 duration-300">
                      <RefreshCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center py-2">
                    <p className="text-xs text-purple-200 font-medium mb-1">
                      Available Balance
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight">
                      ৳ 0.00
                    </h2>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-2xs">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800">
                          New Mem...
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          Date : 2026.10.25~2026.10.26
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                      Leaderboard
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex flex-col gap-1">
                    <p>
                      Remaining :{" "}
                      <strong className="text-slate-800 font-mono">
                        03:48:09
                      </strong>
                    </p>
                    <p>
                      Milestones :{" "}
                      <strong className="text-slate-800">0/7</strong>
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2 bg-slate-100" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <TabsContent value="milestones" className="m-0">
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col gap-4">
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 mb-1">
                        New Member Daily Challenge
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                        <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                        <span>Incomplete milestones (7)</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 relative pl-4 pt-2">
                      <div className="absolute left-6.75 top-6 bottom-6 w-0.5 bg-slate-200 z-0" />

                      {milestones.map((item) => (
                        <div
                          key={item.id}
                          className="relative z-10 flex items-start gap-4"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-2xs flex items-center justify-center text-slate-400 shrink-0">
                            <span className="text-xs font-bold">🏃‍♂️</span>
                          </div>

                          <div className="flex-1 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex flex-col gap-2.5 hover:shadow-2xs transition-shadow">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                Valid bet
                              </span>
                              <span className="font-mono font-bold text-slate-800">
                                ৳ {item.current.toFixed(2)} /{" "}
                                {item.target.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                })}
                              </span>
                            </div>

                            <div className="flex items-center justify-between bg-sky-50 border border-sky-100 rounded-lg px-3 py-1.5">
                              <div className="flex items-center gap-1.5 text-xs text-sky-800 font-medium">
                                <span className="w-4 h-4 rounded bg-sky-500 text-white flex items-center justify-center text-[10px]">
                                  🎁
                                </span>
                                <span>Bonus :</span>
                              </div>
                              <span className="text-xs font-bold text-sky-700 font-mono">
                                ৳ {item.bonus.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="leaderboard"
                  className="m-0 bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs"
                >
                  Leaderboard information will appear here.
                </TabsContent>

                <TabsContent
                  value="rules"
                  className="m-0 bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs"
                >
                  Challenge rules and terms will appear here.
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </TabsContent>

        <TabsContent
          value="coming-soon"
          className="m-0 bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs"
        >
          No upcoming missions available right now.
        </TabsContent>

        <TabsContent
          value="finished"
          className="m-0 bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs"
        >
          No completed missions found.
        </TabsContent>
      </Tabs>
    </div>
  );
}
