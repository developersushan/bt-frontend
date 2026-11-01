"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Megaphone, X, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const ANNOUNCEMENTS = [
  {
    id: "notice-1",
    title: "✨ Dear Valued Member, GO444 invi... 2026-10-03",
    bannerTitle: "✨ Dear Valued Member, GO444 invites you to experience...",
    description:
      "✨ Dear Valued Member, GO444 invites you to experience our brand-new platform!\n🚀 Fully upgraded with a smoother experience and more exciting rewards!\n🎁 Register with GO444 and bind your phone number to claim your exclusive welcome rewards!",
    reward: "GO",
  },
  {
    id: "notice-2",
    title: "🎉🎉🎉CK44 × WINTK আনুষ্ঠানিকভাবে... 2026-08-11",
    bannerTitle: "🎉🎉🎉 CK44 × WINTK আনুষ্ঠানিকভাবে যৌথভাবে...",
    description:
      "🎁 এর মাধ্যমে ব্যবহারকারীদের জন্য আরও আকর্ষণীয় অফার এবং বোনাস সুবিধা দেওয়া হচ্ছে।",
    reward: "CLAIM",
  },
  {
    id: "notice-3",
    title: "🌈🌈🌈নতুন বছরের স্বপ্নের পরিকল্পনা আনু... 2025-02-19",
    bannerTitle: "🌈🌈🌈 নতুন বছরের স্বপ্নের পরিকল্পনা আনুষ্ঠানিকভাবে...",
    description: "⭐ আপনার প্রথম জমাতে ৫০% বোনাস পান! 🎉 ৳বন্ধু...",
    reward: "JOIN",
  },
];

export default function TopBannerHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("notice-1");

  return (
    <>
      {/* Marquee Banner */}
      <div
        onClick={() => {
          document.body.style.overflow = "hidden";
          setIsOpen(true);
        }}
        className="relative flex items-center mb-6 overflow-hidden rounded-full bg-[#002C35] sm:h-9 h-7 border border-[#0e5c55] select-none cursor-pointer hover:border-amber-400/50 transition-colors"
      >
        <div className="absolute left-0 z-20 flex items-center justify-center h-full pl-3 pr-2 bg-[#002C35] pointer-events-none">
          <Megaphone className="size-4.5 text-amber-400 fill-amber-400/20 -rotate-12 shrink-0" />
        </div>

        <Marquee
          speed={40}
          gradient={false}
          pauseOnHover={true}
          className="text-[#B88843] text-xs sm:text-sm font-medium leading-none overflow-hidden"
        >
          <span className="pl-12 pr-4 flex items-center gap-2">
            🎉🎉🎉 নতুন বছরের স্বপ্নের পরিকল্পনা আনুষ্ঠানিকভাবে চালু হয়েছে!
            এখনই যোগ দিন, ১০০% ওয়েলকাম বোনাস পান এবং প্রতিদিন জিতে নিন
            আকর্ষণীয় মেগা পুরস্কার! 🚀🔥💰
          </span>
        </Marquee>
      </div>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0b2422] border-2 border-[#174643] rounded-2xl overflow-hidden shadow-2xl text-white font-sans">
            {/* Header */}
            <div className="px-5 py-4 bg-[#081d1b] border-b border-[#174643] flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-wide text-amber-400">
                Notice
              </h2>

              <button
                onClick={() => {
                  document.body.style.overflow = "unset";
                  setIsOpen(false);
                }}
                className="p-1 rounded-lg bg-[#113532] hover:bg-[#1a4e4a] text-amber-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body Container */}
            <ScrollArea className="max-h-105! w-full bg-[#0b2422] overflow-y-auto">
              <div className="p-4 ">
                <Tabs
                  value={selectedTab}
                  onValueChange={setSelectedTab}
                  className="w-full "
                >
                  <TabsList className="flex flex-col h-40!  bg-transparent p-0 space-y-2 w-full">
                    {ANNOUNCEMENTS.map((item) => (
                      <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className="w-full justify-between text-left px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer border border-[#174643] bg-[#0b2422] text-slate-200 data-[state=active]:bg-[#113532] data-[state=active]:border-teal-500 hover:bg-[#0f312e] shrink-0"
                      >
                        <span className="truncate pr-2">{item.title}</span>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="mt-4 space-y-3">
                    {ANNOUNCEMENTS.map((item) => (
                      <TabsContent
                        key={item.id}
                        value={item.id}
                        className="mt-0 bg-transparent"
                      >
                        <div className="p-4 rounded-xl border border-teal-500/40 bg-[#0d2f2d] text-xs sm:text-sm text-slate-200 flex flex-col justify-between min-h-40 shadow-inner">
                          <p className="whitespace-pre-line leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex justify-end pt-2 mt-auto">
                            <button
                              onClick={() => setIsOpen(false)}
                              className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer"
                            >
                              {item.reward}
                            </button>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
