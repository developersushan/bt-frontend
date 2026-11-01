"use client";

import React, { useState, useEffect } from "react";
import { BellRing, ArrowRight, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const ANNOUNCEMENTS = [
  {
    id: "usdt-trc20",
    title: "USDT TRC20 – DEPOSIT EASILY,...",
    bannerTitle: "USDT TRC20 FAST DEPOSIT SYSTEM!",
    description: "Instant deposit with 0% fee using USDT TRC20 network.",
    reward: "100%",
    unit: "BONUS!",
    subText: "⚡ FAST & SECURE PAYMENTS ⚡",
  },
  {
    id: "halloween-2026",
    title: "HALLOWEEN 2026 – THE BATTLE OF T...",
    bannerTitle: "HALLOWEEN 2026 – THE BATTLE OF THE DARK SEAL!",
    description:
      "Activate the Blood Moon Spin to hunt for legendary treasures! Conquer the Grand Jackpot of up to",
    reward: "99,999",
    unit: "TAKA!",
    subText: "🧛‍♂️ THE BLOOD MOON AWAKENS! 🧛‍♂️",
  },
  {
    id: "delay-bonus",
    title: "বিলম্বিত লেনদেনের জন্য ক্ষতিপূরণ বোনাস",
    bannerTitle: "বিলম্বিত লেনদেনের জন্য ১০০% ক্ষতিপূরণ বোনাস!",
    description:
      "যদি আপনার ডিপোজিট ৫ মিনিটের বেশি বিলম্বিত হয়, তাহলে অতিরিক্ত বোনাস দাবি করুন।",
    reward: "৳ 500",
    unit: "BONUS!",
    subText: "🛡️ Instant Compensation Guaranteed 🛡️",
  },
  {
    id: "download-app",
    title: "Download the App & Claim 999 TAKA...",
    bannerTitle: "DOWNLOAD MOBILE APP & GET FREE REWARD!",
    description:
      "Download our official Android app today and claim your free welcome bonus instantly.",
    reward: "999",
    unit: "TAKA!",
    subText: "📱 EXCLUSIVE MOBILE REWARD 📱",
  },
  {
    id: "personal-account",
    title: "ব্যক্তিগত অ্যাকাউন্টে টাকা জমা করার প্রক্রিয়া",
    bannerTitle: "ব্যক্তিগত অ্যাকাউন্ট ডিপোজিট গাইডলাইন",
    description:
      "সহজে এবং নিরাপদ উপায়ে পার্সোনাল বিকাশ/নগদ অ্যাকাউন্ট থেকে ডিপোজিট সম্পন্ন করুন।",
    reward: "100%",
    unit: "SAFE!",
    subText: "🔒 Direct Personal Transfer 🔒",
  },
  {
    id: "fast-payment",
    title: "FAST PAYMENT রিচার্জ প্রক্রিয়া",
    bannerTitle: "ফাস্ট পেমেন্ট রিচার্জ পদ্ধতি!",
    description:
      "সবচেয়ে দ্রুত গতিতে স্বয়ংক্রিয় পেমেন্ট গেটওয়ের মাধ্যমে রিচার্জ সম্পন্ন করুন।",
    reward: "24/7",
    unit: "ACTIVE",
    subText: "⚡ Zero Waiting Time ⚡",
  },
  {
    id: "daily-championship",
    title: "দৈনিক চ্যাম্পিয়নশিপ, প্রাইজ পুল ১০০০০০০...",
    bannerTitle: "দৈনিক লিডারবোর্ড চ্যাম্পিয়নশিপ ২০২৬!",
    description:
      "প্রতিদিনের গেমপ্লে রেকর্ড উন্নত করুন এবং আকর্ষণীয় গ্র্যান্ড প্রাইজ পুলে অংশগ্রহণ করুন।",
    reward: "10,00,000",
    unit: "TAKA!",
    subText: "🏆 GRAND PRIZE POOL 🏆",
  },
  {
    id: "red-envelope",
    title: "ইভেন্ট আপডেট: লাল খামের বৃষ্টি",
    bannerTitle: "স্পেশাল রেড এনভেলপ সাওয়ার ইভেন্ট!",
    description:
      "প্রতিদিন নির্দিষ্ট সময়ে সিস্টেমে লগইন করুন এবং সারপ্রাইজ রেড এনভেলপ ক্লেইম করুন।",
    reward: "৳ 8,888",
    unit: "MAX!",
    subText: "🎁 RED ENVELOPE RAIN 🎁",
  },
  {
    id: "link-update",
    title: "গুরুত্বপূর্ণ ঘোষণা – লিঙ্ক আপডেট",
    bannerTitle: "অফিসিয়াল ব্যাকআপ লিঙ্ক আপডেট!",
    description:
      "নিরবচ্ছিন্ন সেবার জন্য আমাদের অফিসিয়াল বিকল্প লিঙ্ক ব্যবহার করার অনুরোধ করা হচ্ছে।",
    reward: "NEW",
    unit: "DOMAINS",
    subText: "🌐 ALWAYS CONNECTED 🌐",
  },
];

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = sessionStorage.getItem("hasSeenAnnouncement");
    if (!hasSeenAnnouncement) {
      sessionStorage.setItem("hasSeenAnnouncement", "true");
      queueMicrotask(() => setIsOpen(true));
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Custom Main Container Box */}
      <div className="relative w-full max-w-5xl bg-[#0b2422] border-2 border-[#174643] rounded-2xl overflow-hidden shadow-2xl text-white font-sans">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#081d1b] border-b border-[#174643] flex flex-row items-center justify-between shrink-0">
          <h2 className="text-lg md:text-xl font-bold tracking-wide text-amber-400 flex items-center gap-2">
            <BellRing className="w-5 h-5" /> Announcement
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg bg-[#113532] hover:bg-[#1a4e4a] text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Root Tabs Component */}
        <Tabs defaultValue="halloween-2026" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 md:h-112.5">
            {/* Sidebar: Mobile (Horizontal scroll, compact height) & Desktop (Vertical sidebar) */}
            <div className="md:col-span-3 bg-[#081d1b]/80 border-b md:border-b-0 md:border-r border-[#174643] flex flex-col overflow-hidden">
              <ScrollArea className="w-full h-full">
                <div className="p-3 md:pt-4">
                  <TabsList className="flex md:flex-col flex-row w-max md:w-full bg-transparent p-0 gap-2 md:h-150! h-auto">
                    {ANNOUNCEMENTS.map((item) => (
                      <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className="w-auto md:w-full justify-start text-left px-3 py-2.5 rounded-xl text-xs font-medium gap-2.5 transition-all cursor-pointer border border-[#1d524e] bg-[#113532]/60 text-slate-200 data-[state=active]:bg-amber-400 data-[state=active]:text-slate-950 data-[state=active]:font-bold data-[state=active]:border-amber-400 data-[state=active]:shadow-md hover:bg-[#15423f] shrink-0"
                      >
                        <span className="text-amber-500 data-[state=active]:text-slate-900 shrink-0">
                          ⭐
                        </span>
                        <span className="truncate max-w-35 md:max-w-none">
                          {item.title}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </ScrollArea>
            </div>

            {/* Right Panel: Content Display */}
            <div className="md:col-span-9 p-6 flex flex-col justify-between bg-linear-to-br from-[#0b2422] to-[#071917] h-full overflow-y-auto">
              {ANNOUNCEMENTS.map((item) => (
                <TabsContent
                  key={item.id}
                  value={item.id}
                  className="m-0 space-y-4 flex flex-col justify-between h-full"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎃</span>
                    <h3 className="text-sm md:text-base font-extrabold text-amber-300 tracking-wide uppercase">
                      {item.bannerTitle}
                    </h3>
                  </div>

                  <div className="relative rounded-xl border-2 border-red-900/60 bg-black/40 overflow-hidden p-4 shadow-inner flex flex-col items-center text-center">
                    <div className="w-full h-44 md:h-52 rounded-lg bg-linear-to-r from-red-950 via-purple-950 to-black border border-amber-500/30 relative flex flex-col items-center justify-center p-4 overflow-hidden shadow-lg">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black pointer-events-none" />

                      <h4 className="text-amber-400 font-black text-xs md:text-sm tracking-wider drop-shadow-md">
                        {item.bannerTitle}
                      </h4>

                      <p className="text-[11px] text-slate-300 mt-2 max-w-sm leading-relaxed">
                        {item.description}
                      </p>

                      <div className="text-2xl md:text-4xl font-black text-amber-300 tracking-tight drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)] my-2">
                        {item.reward}{" "}
                        <span className="text-xl md:text-2xl text-red-500">
                          {item.unit}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-400 tracking-wider">
                      {item.subText}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      GO <ArrowRight className="w-4 h-4 stroke-3" />
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
