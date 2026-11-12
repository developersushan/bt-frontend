/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProfileStore } from "@/lib/useModalStore";
import { items } from "./SecuritySettings";
export function SecurityScoreCard({ data }: any) {
  const { setActiveTab } = useProfileStore();
  const filteredActions = items.filter(
    (_, index) => index !== 1 && index !== 4,
  );
  const levelColorMap: any = {
    High: {
      main: "text-emerald-600",
      sub: "text-emerald-500",
    },
    Medium: {
      main: "text-amber-600",
      sub: "text-amber-500",
    },
    Low: {
      main: "text-rose-600",
      sub: "text-rose-400",
    },
  };
  const securityGradientMap: any = {
    High: "bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600",
    Medium: "bg-gradient-to-b from-amber-400 via-amber-500 to-orange-600",
    Low: "bg-gradient-to-b from-rose-400 via-rose-500 to-red-600",
  };

  const currentLevel = data?.security?.level || "Low";

  const colors = levelColorMap[currentLevel] || levelColorMap.Low;
  return (
    <div
      className={`w-full  ${securityGradientMap[data?.security?.level]} rounded-2xl shadow-xl overflow-hidden flex flex-col h-full justify-between text-white select-none`}
    >
      {/* Upper Security Meter Section */}
      <div className="p-6 flex flex-col items-center justify-center text-center relative pt-8">
        {/* Circle Score Container */}
        <div className="w-36 h-36 rounded-full bg-white/20 p-2 flex items-center justify-center shadow-lg backdrop-blur-xs mb-5">
          <div
            className={`w-full h-full rounded-full bg-white flex flex-col items-center justify-center ${colors.main} shadow-inner`}
          >
            <span className="text-3xl font-extrabold tracking-tight">
              {data?.security?.level}
            </span>
            <span className={`text-xs font-semibold  ${colors.main} mt-0.5`}>
              Security Level
            </span>
          </div>
        </div>

        {/* Score Description */}
        <p className="text-sm font-semibold text-white/90">
          Score is{" "}
          <span className="font-bold text-white text-base">
            {data?.security?.score}
          </span>{" "}
          points
        </p>
        <p className="text-xs text-rose-100/80 mt-1">
          Your account security level is Low
        </p>
      </div>

      {/* Lower Recommended Setting Action Bar */}
      <div className="bg-white/20 backdrop-blur-md p-4 rounded-b-2xl border-t border-white/20">
        <p className="text-center text-xs font-bold text-white/90 mb-3">
          Recommended setting
        </p>

        <div className="grid grid-cols-3 gap-2 text-center">
          {filteredActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`size-12 rounded-full ${action.bgColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                >
                  <IconComponent size={20} />
                </div>
                <span className="text-[11px] font-medium text-white mt-1.5 leading-tight">
                  {action.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
