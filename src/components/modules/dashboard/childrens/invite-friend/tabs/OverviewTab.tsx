"use client";

import { Copy} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OverviewTab() {
  return (
    <div className="space-y-4">
      {/* Top Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Revenue Goals Banner */}
        <div className="md:col-span-7 bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-900 rounded-2xl p-5 text-white shadow-xs relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1 z-10">
            <h2 className="text-xl font-black italic tracking-wide">Revenue goals</h2>
            <p className="text-[11px] text-blue-100">
              Invite <span className="font-bold text-amber-300">1</span> user to meet the target
            </p>
          </div>
          <div className="text-right z-10">
            <span className="text-2xl font-extrabold text-white">৳ 1,000.00</span>
          </div>
        </div>

        {/* Income Cards Grid */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3">
          <div className="bg-linear-to-r from-sky-400 to-blue-500 rounded-2xl p-3.5 text-white shadow-2xs">
            <p className="text-[10px] text-sky-100 font-medium">Today&apos;s Income</p>
            <p className="text-base font-bold mt-1">৳ 0.00</p>
          </div>
          <div className="bg-linear-to-r from-purple-400 to-indigo-500 rounded-2xl p-3.5 text-white shadow-2xs">
            <p className="text-[10px] text-purple-100 font-medium">Yesterday&apos;s Income</p>
            <p className="text-base font-bold mt-1">৳ 0.00</p>
          </div>
          <div className="bg-linear-to-r from-purple-300 to-purple-400 rounded-2xl p-3.5 text-white shadow-2xs">
            <p className="text-[10px] text-purple-100 font-medium">Registers</p>
            <p className="text-base font-bold mt-1">0</p>
          </div>
          <div className="bg-linear-to-r from-sky-300 to-blue-400 rounded-2xl p-3.5 text-white shadow-2xs">
            <p className="text-[10px] text-sky-100 font-medium">Valid Referral</p>
            <p className="text-base font-bold mt-1">0</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Leaderboard + Referral Link Share */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Side: Top Winners / Received Rewards */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-800 text-xs">Who received the rewards</h3>
          <div className="space-y-2">
            {[
              { phone: "17*******4", status: "Received", amount: "৳ 240.00" },
              { phone: "17*******4", status: "Received", amount: "৳ 240.00" },
              { phone: "01*******2", status: "Received", amount: "৳ 160.00" },
            ].map((row, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50/80 rounded-full px-4 py-1.5 text-xs"
              >
                <span className="font-mono text-slate-600">{row.phone}</span>
                <span className="text-slate-500 font-medium">{row.status}</span>
                <span className="font-bold text-slate-800">{row.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Share Link & QR Code */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-[11px] text-slate-500 font-medium">Share with your friends</span>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1.5">
              <input
                type="text"
                readOnly
                value="http://www.ck-44vip.com/?r=lhx8764"
                className="bg-transparent text-[11px] text-slate-600 font-mono w-full outline-none px-1"
              />
              <Button type="button" size="sm" className="h-6 px-2.5 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Rewards Released to Date */}
      <div className="space-y-2">
        <h3 className="font-bold text-slate-800 text-xs">Rewards Released to Date</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: "Invitation Rewards", amount: "৳ 35,619,980.00", count: "50165 claimed" },
            { title: "Achievement Rewards", amount: "৳ 945,150.00", count: "11194 claimed" },
            { title: "Deposit Rebate", amount: "৳ 40,155,487.35", count: "162290 claimed" },
            { title: "Betting Rebate", amount: "৳ 65,820,219.19", count: "297496 claimed" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs space-y-1">
              <p className="text-[10px] text-slate-400 font-medium">{item.title}</p>
              <p className="text-sm font-bold text-slate-900">{item.amount}</p>
              <p className="text-[10px] text-slate-400">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}