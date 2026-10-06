
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  History,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Wallet,
  AlertCircle,
} from "lucide-react";

const depositMethods = [
  {
    id: "bkash-send",
    name: "bKash Send Money",
    type: "bKash",
    badge: "Fastest",
    channels: [
      { id: "c1", name: "VIP Channel (Instant)", fee: "0%" },
      { id: "c2", name: "Express Pay Channel", fee: "0%" },
      { id: "c3", name: "Standard Payment Channel", fee: "0%" },
      { id: "c3_2", name: "Merchant Auto Pay", fee: "0%" },
    ],
  },
  {
    id: "nagad-send",
    name: "Nagad Send Money",
    type: "Nagad",
    badge: "Popular",
    channels: [
      { id: "c4", name: "Nagad VIP Express", fee: "0%" },
      { id: "c5", name: "Quick Pay Channel", fee: "0%" },
    ],
  },
  {
    id: "nagad-cashout",
    name: "Nagad VIP Cashout",
    type: "Nagad",
    badge: "VIP",
    channels: [{ id: "c6", name: "Direct Agent Cashout", fee: "0%" }],
  },
  {
    id: "bkash-cashout",
    name: "bKash VIP Cashout",
    type: "bKash",
    badge: "VIP",
    channels: [{ id: "c7", name: "Merchant Cashout Line", fee: "0%" }],
  },
];

const presetAmounts = [100, 200, 500, 1000, 3000, 5000, 10000, 15000];

export default function DepositContent() {
  const [selectedChannel, setSelectedChannel] = useState(
    depositMethods[0].channels[0].id,
  );
  const [amount, setAmount] = useState<string>("500");

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
  };

  return (
    <div>
      {/* 🔹 Main Card Container */}
      <div className="w-full p-4 sm:p-6">
        {/* 🔹 Fixed Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Deposit Funds
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Select your preferred payment gateway & channel
            </p>
          </div>

          <button className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer">
            <History className="w-3.5 h-3.5 text-rose-500" />
            Deposit History
          </button>
        </div>

        {/* 🔹 Tabs Layout Area */}
        <Tabs
          defaultValue={depositMethods[0].id}
          className="flex-1 min-h-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
            {/*  Left Side: FIXED Navigation */}
            <div className="lg:col-span-4 flex flex-col h-full mt-4">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block shrink-0">
                1. Select Payment Method
              </label>

              <TabsList className="flex flex-col h-55! w-full bg-transparent gap-2 p-0 ">
                {depositMethods.map((method) => (
                  <TabsTrigger
                    key={method.id}
                    value={method.id}
                    className="group relative w-full justify-between px-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/60 transition-all duration-200 cursor-pointer text-left data-active:border-rose-500"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-transform group-hover:scale-105 ${
                          method.type === "bKash"
                            ? "bg-pink-50 text-pink-600 border border-pink-100"
                            : "bg-orange-50 text-orange-600 border border-orange-100"
                        }`}
                      >
                        {method.type === "bKash" ? "bK" : "NG"}
                      </div>

                      <span className="text-xs font-bold text-slate-700 group-data-[state=active]:text-slate-900">
                        {method.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/60 text-slate-600 group-data-[state=active]:bg-rose-500 group-data-[state=active]:text-white">
                      {method.badge}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Right Side: SCROLLABLE Content */}
            <div className="lg:col-span-8 h-full overflow-y-auto p-4 pb-0 border-l border-slate-100">
              {depositMethods.map((method) => (
                <TabsContent
                  key={method.id}
                  value={method.id}
                  className="mt-0 space-y-6 focus-visible:outline-none pb-4"
                >
                  {/* Step 2: Channel Selection */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      2. Select Payment Channel
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {method.channels.map((channel) => {
                        const isSelected = selectedChannel === channel.id;
                        return (
                          <div
                            key={channel.id}
                            onClick={() => setSelectedChannel(channel.id)}
                            className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start justify-between ${
                              isSelected
                                ? "bg-rose-50/60 border-rose-500 text-slate-900 shadow-sm"
                                : "bg-white border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-50/30"
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold leading-tight">
                                {channel.name}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                                Fee:{" "}
                                <span className="text-emerald-600 font-bold">
                                  {channel.fee}
                                </span>
                              </p>
                            </div>

                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 transition-opacity ${
                                isSelected
                                  ? "text-rose-600 opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Deposit Amount Section */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      3. Select Amount
                    </label>

                    {/* Quick Amount Buttons Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {presetAmounts.map((amt) => {
                        const isSelected = amount === amt.toString();
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => handlePresetClick(amt)}
                            className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-500/20"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                            }`}
                          >
                            ৳{amt.toLocaleString()}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amount Input Field */}
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                        ৳
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Deposit Amount"
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:ring-1 focus:ring-rose-500/20 transition-all"
                      />
                    </div>

                    {/* Deposit Info & Limits Badge */}
                    <div className="flex flex-wrap items-center justify-between text-xs font-medium pt-1 px-1 gap-2">
                      <div className="flex items-center gap-1.5 text-rose-600 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Deposit Limit: ৳100 - ৳15,000</span>
                      </div>
                      <div className="text-slate-500">
                        Daily Limit Status:{" "}
                        <span className="text-rose-600 font-bold">24/24</span>
                      </div>
                    </div>
                  </div>

                  {/* Instructions Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-rose-600 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Instruction Guide</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      ১. আপনার অ্যাপ থেকে{" "}
                      <strong className="text-slate-900">{method.name}</strong>{" "}
                      অপশনে যান। <br />
                      ২. প্রদত্ত মার্চেন্ট/ব্যক্তিগত নাম্বারে নির্দিষ্ট পরিমাণ
                      টাকা পাঠান। <br />
                      ৩. ট্রানজেকশন আইডি (TxnID) সংগ্রহ করে আবেদন জমা দিন।
                    </p>
                  </div>

                  {/* Apply Action Section Button */}
                  <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">
                      Processing:{" "}
                      <span className="text-emerald-600 font-bold">
                        Instant
                      </span>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all cursor-pointer">
                      <Wallet className="w-4 h-4" />
                      <span>Apply for Deposit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
