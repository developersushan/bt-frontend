"use client";

import { useProfileStore } from "@/lib/useModalStore";
import { items } from "./SecuritySettings";
export function SecurityScoreCard() {
  const { setActiveTab } = useProfileStore();
  const filteredActions = items.filter(
    (_, index) => index !== 1 && index !== 4,
  );
  return (
    <div className="w-full max-w-sm bg-rose-500 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between text-white select-none">
      {/* Upper Security Meter Section */}
      <div className="p-6 flex flex-col items-center justify-center text-center relative pt-8">
        {/* Circle Score Container */}
        <div className="w-36 h-36 rounded-full bg-white/20 p-2 flex items-center justify-center shadow-lg backdrop-blur-xs mb-5">
          <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-rose-600 shadow-inner">
            <span className="text-3xl font-extrabold tracking-tight">Low</span>
            <span className="text-xs font-semibold text-rose-400 mt-0.5">
              Security Level
            </span>
          </div>
        </div>

        {/* Score Description */}
        <p className="text-sm font-semibold text-white/90">
          Score is <span className="font-bold text-white text-base">0</span>{" "}
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
