"use client";

import React from "react";
import { RefreshCw, Eye, PiggyBank, Banknote, Edit3, ShieldAlert } from "lucide-react";

export function UserProfileCard() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 border border-slate-100 flex flex-col justify-between select-none">
      <div>
        {/* Profile Header with Banner Overlay */}
        <div className="relative bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-xl p-4 mb-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-3 z-10">
            {/* User Avatar */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* User Info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-slate-700/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <span>🛡️</span> VIP0
                </span>
                <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  🎁
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="font-bold text-slate-800 text-sm">01612302011</span>
                <Edit3 size={13} className="text-slate-500 cursor-pointer hover:text-slate-800" />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Joined 2026-10-03</p>
            </div>
          </div>
          {/* Trophy Watermark Background */}
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 text-slate-800 pointer-events-none">
            <ShieldAlert size={90} />
          </div>
        </div>

        {/* User Account ID */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 px-1">
          <span>01612302011</span>
          <span className="w-3.5 h-3.5 rounded-full bg-slate-300 text-white text-[9px] flex items-center justify-center font-bold">
            ✓
          </span>
        </div>

        {/* Balance Display */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 px-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-slate-900">৳</span>
            <span className="text-2xl font-black text-slate-900">0.00</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <RefreshCw size={16} className="cursor-pointer hover:text-slate-700 transition-colors" />
            <Eye size={16} className="cursor-pointer hover:text-slate-700 transition-colors" />
          </div>
        </div>

        {/* Transaction Requests List */}
        <div className="space-y-3">
          {/* Deposit Request */}
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center shrink-0">
              <PiggyBank size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">0 deposit request processing.</p>
              <p className="text-[10px] text-slate-400">04/10/2026</p>
            </div>
          </div>

          <div className="border-b border-dashed border-slate-200" />

          {/* Withdrawal Request */}
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Banknote size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">0 withdrawal request processing.</p>
              <p className="text-[10px] text-slate-400">04/10/2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}