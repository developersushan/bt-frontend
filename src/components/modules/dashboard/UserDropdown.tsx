"use client";

import { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  User,
  History,
  FileText,
  Mail,
  Wallet,
  ArrowUpRight,
  Headphones,
  LogOut,
  ChevronDown,
  LucideIcon,
} from "lucide-react";
import { Sidebar } from "./sidebar";
import { useProfileStore } from "@/lib/useModalStore";
import { DynamicTabContent } from "./DynamicTabContent";

export interface ComponentItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

const components: ComponentItem[] = [
  { id: "my-account", title: "My Account", icon: User },
  { id: "betting-record", title: "Betting Record", icon: History },
  { id: "account-record", title: "Account Record", icon: FileText },
  { id: "internal-message", title: "Internal Message", icon: Mail },
  { id: "deposit", title: "Deposit", icon: Wallet },
  { id: "withdrawal", title: "Withdrawal", icon: ArrowUpRight },
  { id: "custom-service", title: "Custom Service", icon: Headphones },
];

export function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = useState({ popover: false, modal: false });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { setActiveTab } = useProfileStore();

  const handleHover = (open: boolean) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setIsOpen((p) => ({ ...p, popover: open })),
      open ? 0 : 150,
    );
  };

  const handleSelect = (item: ComponentItem) => {
    if (timer.current) clearTimeout(timer.current);
    (document.activeElement as HTMLElement)?.blur();

    setActiveTab(item.id); // Zustand state sync
    setIsOpen({ popover: false, modal: true });
  };
  return (
    <>
      <div
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="inline-block"
      >
        <Popover
          open={isOpen.popover}
          onOpenChange={(v) => setIsOpen((p) => ({ ...p, popover: v }))}
        >
          <PopoverTrigger>
            <button
              type="button"
              className="bg-[#002632] hover:bg-[#003833] text-slate-100 font-semibold px-2 text-sm py-1.5 rounded-md flex items-center gap-2 outline-none cursor-pointer transition-colors"
            >
              My Profile <ChevronDown className="w-4 h-4 text-slate-300" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={5}
            className="bg-[#002632] border-teal-400 w-52 p-1 rounded-md text-slate-100 z-50"
          >
            <ul className="flex flex-col space-y-0.5">
              {components.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="group flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#003833] text-left outline-none transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-300 group-hover:text-teal-400" />
                      <span className="text-sm font-medium group-hover:text-teal-400">
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
              <li className="border-t border-teal-500/20 pt-1">
                <button
                  type="button"
                  className="group flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-red-500/10 text-left outline-none transition-colors"
                >
                  <LogOut className="w-4 h-4 text-slate-300 group-hover:text-red-400" />
                  <span className="text-sm font-medium group-hover:text-red-400">
                    Sign Out
                  </span>
                </button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <Dialog
        open={isOpen.modal}
        onOpenChange={(v) => setIsOpen((p) => ({ ...p, modal: v }))}
      >
        <DialogContent className="sm:max-w-6xl p-0 border-none bg-transparent overflow-hidden">
          <Sidebar>
            {/* 👈 Dynamic Content Switcher*/}
            <DynamicTabContent />
          </Sidebar>
        </DialogContent>
      </Dialog>
    </>
  );
}
