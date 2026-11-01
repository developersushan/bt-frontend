"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronDown, ChevronUp, Gift, Grid2X2, Target, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IGame } from "@/types/game.types";
import { useGames } from "@/lib/useGames";
import { GameCard } from "@/components/shared/GameCard";
import { useProfileStore } from "@/lib/useModalStore";
import { LowBalanceDialog } from "@/components/shared/LowBalanceDialog";

interface FeaturedModalProps {
  games?: IGame[];
  isLoggedIn?: boolean;
  onLoginPrompt?: () => void;
}

export const FeaturedGamesModalTrigger = ({
  isLoggedIn = false,
}: FeaturedModalProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLowBalanceModal, setShowLowBalanceModal] = useState(false);
  const { setActiveTab, setProfileModalOpen } = useProfileStore();
  const { formatCategoryTitle, gamesByGroup } = useGames();
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 2200, stopOnInteraction: false }),
    [],
  );

  const categories = Object.entries(gamesByGroup).filter(
    ([, categoryGames]) => (categoryGames as IGame[]).length > 0,
  );

  const openCategory = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
  };

  const openDashboard = (tab: "reward-center" | "mission") => {
    setActiveTab(tab);
    setProfileModalOpen(true);
  };

  const categoryGames = selectedCategory
    ? ((gamesByGroup[selectedCategory] ?? []) as IGame[])
    : [];

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="fixed right-0 bottom-24 z-50 flex size-11 items-center justify-center rounded-l-full border border-amber-400/50 bg-[#0a2623] text-yellow-400 shadow-2xl cursor-pointer"
        aria-label="Show featured games"
      >
        <Grid2X2 className="size-5" />
      </button>
    );
  }

  return (
    <>
      <div className="fixed right-0 bottom-24 z-50 flex flex-col items-end gap-2">
        <div className="flex items-end gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="flex size-8 items-center justify-center rounded-full border border-teal-400/30 bg-[#092b29] text-teal-200 shadow-xl cursor-pointer"
            aria-label={
              isExpanded ? "Collapse category panel" : "Expand category panel"
            }
          >
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </button>

          <div
            className={`overflow-hidden rounded-xl border border-teal-500/30 bg-linear-to-b from-[#123f3b] to-[#071f1d] shadow-2xl transition-all duration-300 ${
              isExpanded
                ? "sm:h-50 h-46 w-[min(94vw,250px)]"
                : "h-14 w-22 rounded-full"
            }`}
          >
            <div className="flex h-14 items-center gap-1 px-2">
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[autoplayPlugin]}
                className="min-w-0 flex-1"
              >
                <CarouselContent className="-ml-2">
                  {categories.map(([categoryKey]) => (
                    <CarouselItem
                      key={categoryKey}
                      className={`pl-2 ${isExpanded ? "basis-1/3" : "basis-1/1"}`}
                    >
                      <button
                        type="button"
                        onClick={() => openCategory(categoryKey)}
                        aria-label={`Open ${formatCategoryTitle(categoryKey)}`}
                        className="relative h-10 w-full overflow-hidden rounded-lg border border-amber-400/40 bg-[#092b29] shadow-lg cursor-pointer hover:border-yellow-300"
                      >
                        {gamesByGroup[categoryKey]?.[0]?.thumbnail ? (
                          <Image
                            src={gamesByGroup[categoryKey][0].thumbnail}
                            alt={formatCategoryTitle(categoryKey)}
                            fill
                            sizes="150px"
                            className="object-cover"
                          />
                        ) : (
                          <Grid2X2 className="mx-auto size-5 text-yellow-400" />
                        )}
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {isExpanded && (
              <div className="border-t border-teal-500/20 px-3 pb-3">
                {isLoggedIn && (
                  <div className="grid grid-cols-2 gap-2 py-2">
                    <button
                      type="button"
                      onClick={() => openDashboard("reward-center")}
                      aria-label="Open Reward Center"
                      className="relative h-14 overflow-hidden rounded-lg border border-yellow-400/40 bg-[#092d2b] cursor-pointer"
                    >
                      <Image
                        src="/images/banner/banner3.webp"
                        alt="Reward Center"
                        fill
                        sizes="240px"
                        className="object-cover opacity-70"
                      />
                      <Gift className="absolute inset-0 m-auto size-6 text-yellow-300 drop-shadow-lg" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openDashboard("mission")}
                      aria-label="Open Mission"
                      className="relative h-14 overflow-hidden rounded-lg border border-yellow-400/40 bg-[#092d2b] cursor-pointer"
                    >
                      <Image
                        src="/images/banner/banner4.webp"
                        alt="Mission"
                        fill
                        sizes="240px"
                        className="object-cover opacity-70"
                      />
                      <Target className="absolute inset-0 m-auto size-6 text-yellow-300 drop-shadow-lg" />
                    </button>
                  </div>
                )}
                <div className="mb-3 flex items-center gap-2 overflow-x-auto py-2">
                  {categories.map(([categoryKey]) => (
                    <button
                      key={categoryKey}
                      type="button"
                      onClick={() => openCategory(categoryKey)}
                      className="shrink-0 rounded-full border border-teal-400/30 bg-black/20 px-3 py-1.5 text-[11px] font-bold uppercase text-teal-100 hover:border-yellow-400/60 hover:text-yellow-300 cursor-pointer"
                    >
                      {formatCategoryTitle(categoryKey)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="flex size-8 items-center justify-center rounded-full border border-teal-400/30 bg-[#092b29] text-slate-300 shadow-xl hover:bg-red-500/20 hover:text-white cursor-pointer"
            aria-label="Close featured games"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <Dialog
        open={selectedCategory !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCategory(null);
        }}
      >
        <DialogContent className="lg:max-h-[80vh] max-h-screen w-[min(94vw,720px)] max-w-none overflow-hidden border-teal-500/30 bg-[#071f1d] p-0 text-white sm:max-w-none">
          <DialogHeader className="border-b border-teal-500/20 px-5 py-4">
            <DialogTitle className="text-yellow-400">
              {selectedCategory
                ? formatCategoryTitle(selectedCategory)
                : "Games"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid max-h-[calc(100vh-120px)] grid-cols-2 items-stretch gap-2 overflow-y-auto p-3 sm:gap-3 sm:p-4 md:grid-cols-3 lg:max-h-[65vh] lg:grid-cols-4">
            {categoryGames.map((game) => (
              <div key={game.id || game.code} className="min-w-0">
                <GameCard
                  game={game}
                  isLoggedIn={isLoggedIn}
                  onLowBalance={() => {
                    setSelectedCategory(null);
                    requestAnimationFrame(() => setShowLowBalanceModal(true));
                  }}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <LowBalanceDialog
        open={showLowBalanceModal}
        onOpenChange={setShowLowBalanceModal}
        onDeposit={() => {
          setActiveTab("deposit");
          setProfileModalOpen(true);
        }}
      />
    </>
  );
};
