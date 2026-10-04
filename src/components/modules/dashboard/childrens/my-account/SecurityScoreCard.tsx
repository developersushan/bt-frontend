"use client";

import React from "react";
import { User, Wallet, KeyRound } from "lucide-react";

export function SecurityScoreCard() {
  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-rose-500 via-rose-500 to-rose-400 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between text-white select-none">
      {/* Upper Security Meter Section */}
      <div className="p-6 flex flex-col items-center justify-center text-center relative pt-10">
        {/* Glowing Circle Score Container */}
        <div className="relative w-44 h-44 rounded-full bg-white/20 p-2 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] backdrop-blur-sm mb-6">
          <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-rose-600 shadow-inner">
            <span className="text-4xl font-extrabold tracking-tight">Low</span>
            <span className="text-xs font-semibold text-rose-400 mt-1">Security Level</span>
          </div>
        </div>

        {/* Score Description */}
        <p className="text-sm font-semibold text-white/90">
          Score is <span className="font-bold text-white text-base">0</span> points
        </p>
        <p className="text-xs text-white/80 mt-1">Your account security level is Low</p>
      </div>

      {/* Lower Recommended Setting Action Bar */}
      <div className="bg-white/20 backdrop-blur-md p-4 rounded-b-2xl border-t border-white/20">
        <p className="text-center text-xs font-bold text-white/90 mb-3">Recommended setting</p>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Action 1 */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <User size={20} />
            </div>
            <span className="text-[11px] font-medium text-white mt-1.5 leading-tight">
              Personal Information
            </span>
          </div>

          {/* Action 2 */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-fuchsia-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Wallet size={20} />
            </div>
            <span className="text-[11px] font-medium text-white mt-1.5 leading-tight">
              Link E-wallet
            </span>
          </div>

          {/* Action 3 */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <KeyRound size={20} />
            </div>
            <span className="text-[11px] font-medium text-white mt-1.5 leading-tight">
              Transaction Password
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}