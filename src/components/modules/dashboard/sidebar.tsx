"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Wallet,
  ArrowUpRight,
  History,
  FileText,
  TrendingUp,
  Gift,
  Users,
  Target,
  Mail,
  PieChart,
  LucideIcon,
} from "lucide-react";
import { useProfileStore } from "@/lib/useModalStore";

export interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: number;
}

export const menuItems: MenuItem[] = [
  { id: "my-account", title: "My Account", icon: User },
  { id: "deposit", title: "Deposit", icon: Wallet },
  { id: "withdrawal", title: "Withdrawal", icon: ArrowUpRight },
  { id: "betting-record", title: "Betting Record", icon: History },
  { id: "account-record", title: "Account Record", icon: FileText },
  { id: "profit-and-loss", title: "Profit And Loss", icon: TrendingUp },
  { id: "reward-center", title: "Reward Center", icon: Gift },
  { id: "invite-friends", title: "Invite Friends", icon: Users },
  { id: "mission", title: "Mission", icon: Target, badge: 1 },
  { id: "internal-message", title: "Internal Message", icon: Mail, badge: 1 },
  { id: "manual-rebate", title: "Manual rebate", icon: PieChart },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useProfileStore();

  // const activeItem = menuItems.find((item) => item.id === activeTab);
  // const ActiveIcon = activeItem?.icon;

  return (
    <div className="flex w-full min-h-[60vh] max-h-[60vh] overflow-hidden bg-linear-to-b rounded-l-lg from-[#023333] via-[#012526] to-[#011a1b]">
      {/* 🔹 Left Navigation Sidebar */}
      <ScrollArea className="bg-transparent [&>div>div]:hidden">
        <nav className="w-50 text-white flex flex-col shrink-0 relative select-none h-full">
          <div className="pt-6 pb-4 px-4 text-center relative z-10">
            <h1 className="text-xl font-bold tracking-wide text-white drop-shadow">
              Personal Center
            </h1>
          </div>

          <ul className="flex-1 py-2 space-y-0.5 relative z-10">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold transition-all duration-150 cursor-pointer text-left relative ${
                      isActive
                        ? "bg-slate-400/30 text-white shadow-inner backdrop-blur-sm"
                        : "text-slate-200 hover:bg-teal-900/40 hover:text-white"
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="p-1 rounded-full border border-slate-300/40 bg-slate-800/20">
                        <Icon className="w-4 h-4 text-white" />
                      </div>

                      {item.badge && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-slate-900 shadow">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <span className="truncate">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>

      {/* 🔹 Right Dynamic Content Area */}
      <main className="flex-1 bg-white rounded-r-lg flex flex-col overflow-y-auto">
        <div className="flex-1">{children}</div>
      </main>
      {/* <main className="flex-1 bg-white p-6 text-slate-800 rounded-r-lg flex flex-col overflow-y-auto">
        <DialogHeader className="border-b border-teal-500/20 pb-3">
          <DialogTitle className="text-teal-600 text-xl font-bold flex items-center gap-2">
            {ActiveIcon && <ActiveIcon className="w-5 h-5 text-teal-600" />}
            {activeItem?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex-1">{children}</div>
      </main> */}
    </div>
  );
}
