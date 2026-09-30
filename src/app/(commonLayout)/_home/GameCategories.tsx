"use client";

import { useState } from "react";
import {
  Flame,
  Heart,
  Dices,
  Fish,
  Gamepad2,
  Ticket,
  Trophy,
  Boxes,
} from "lucide-react";

// Category Data List matching image_1749b6.png
const categories = [
  { id: "hot", label: "HOT GAMES", icon: Flame },
  { id: "favorites", label: "FAVORITES", icon: Heart },
  { id: "slots", label: "SLOTS", icon: Boxes },
  { id: "live", label: "LIVE", icon: Dices },
  { id: "poker", label: "POKER", icon: Dices },
  { id: "fish", label: "FISH", icon: Fish },
  { id: "sports", label: "SPORTS", icon: Trophy },
  { id: "esports", label: "E-SPORTS", icon: Gamepad2 },
  { id: "lottery", label: "LOTTERY", icon: Ticket },
];

export function GameCategories() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="w-full container my-6 px-2 sm:px-0">
      {/* Scrollable Container for Mobile/Desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none]">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              type="button"
              className={`flex-1 min-w-20 sm:min-w-16 h-17.5 sm:h-16 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 select-none ${
                isActive
                  ? "bg-[#003833] border-teal-foreground text-teal-foreground shadow-md shadow-teal-foreground/10"
                  : "bg-[#012b28] border-[#0e5c55] text-slate-200 hover:bg-[#003833]/70 hover:border-teal-foreground/50 hover:text-teal-foreground"
              }`}
            >
              {/* Category Icon */}
              <Icon
                className={`size-6 transition-colors duration-200 ${
                  isActive
                    ? "text-teal-foreground fill-teal-foreground/20"
                    : "text-white group-hover:text-teal-foreground"
                }`}
              />

              {/* Category Title */}
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wide text-center leading-none">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
