/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Sidebar } from "./sidebar";
import { useProfileStore } from "@/lib/useModalStore";
import { DynamicTabContent } from "./DynamicTabContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileCard, { ComponentItem } from "./ProfileCard";
import { getUserInitials } from "@/lib/getUserInitials";

export function NavigationMenuDemo({ userData }: any) {
  const [isOpen, setIsOpen] = useState({ popover: false, modal: false });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { setActiveTab } = useProfileStore();
  const fallbackText = getUserInitials(userData.name);
  const handleHover = (open: boolean) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setIsOpen((p) => ({ ...p, popover: open })),
      open ? 0 : 150,
    );
  };

  const handleSelect = (item: ComponentItem) => {
    // if (timer.current) clearTimeout(timer.current);
    // (document.activeElement as HTMLElement)?.blur();
    // blur active element safely
    if (typeof window !== "undefined") {
      (document.activeElement as HTMLElement)?.blur();
    }
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
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>{fallbackText}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={5}
            className="bg-[#002632] border-teal-400 rounded-md text-slate-100 z-50 w-52 p-1"
          >
            <ProfileCard handleSelect={handleSelect} />
          </PopoverContent>
        </Popover>
      </div>

      <Dialog
        open={isOpen.modal}
        onOpenChange={(v) => setIsOpen((p) => ({ ...p, modal: v }))}
      >
        <DialogContent className="xl:max-w-7xl sm:max-w-6xl border-none bg-transparent [&>button.absolute]:hidden [&>button.absolute]:md:block">
          <Sidebar>
            {/* 👈 Dynamic Content Switcher*/}
            <DynamicTabContent />
          </Sidebar>
        </DialogContent>
      </Dialog>
    </>
  );
}
