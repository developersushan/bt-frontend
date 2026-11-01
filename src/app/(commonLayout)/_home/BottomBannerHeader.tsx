"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingState from "@/components/shared/Loading";
import { useGames } from "@/lib/useGames";
import { useRouter } from "next/navigation";
import { IGame } from "@/types/game.types";
import { CATEGORY_ICONS } from "@/components/shared/navbar/Navbar";

export function BottomBannerHeader() {
  const router = useRouter();
  const { isLoading, gamesByGroup, formatCategoryTitle } = useGames();

  if (isLoading) {
    return <LoadingState message="Games loading..." />;
  }
  return (
    <ScrollArea className="w-full">
      <div className="w-full container my-6 px-0">
        {/* Horizontal Scrollable Container */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {Object.entries(gamesByGroup)
            .filter(([, games]) => (games as unknown as IGame[]).length > 0)
            .map(([categoryKey]) => {
              const formattedKey = categoryKey
                .toLowerCase()
                .replace(/[-\s]+/g, "_");
              const icon = CATEGORY_ICONS[formattedKey] ?? "🎮";

              return (
                <button
                  key={categoryKey}
                  onClick={() => {
                    router.push(`/${encodeURIComponent(categoryKey)}`);
                  }}
                  type="button"
                  className="flex-1 min-w-20 h-16 rounded-lg border bg-[#012b28] border-[#0e5c55] text-slate-200 hover:bg-[#003833]/70 hover:border-teal-foreground/50 hover:text-teal-foreground flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 select-none"
                >
                  {/* Category Emoji Icon */}
                  <span className="text-xl leading-none select-none">
                    {icon}
                  </span>

                  {/* Category Title */}
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wide text-center leading-none">
                    {formatCategoryTitle(categoryKey)}
                  </span>
                </button>
              );
            })}
        </div>
      </div>
    </ScrollArea>
  );
}
