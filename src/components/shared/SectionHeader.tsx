/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import  { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { MainHeader, TitleHeader } from "./HeaderTitle";
import {
  CarouselSlide,
  CarouselTrack,
  CarouselViewport,
} from "./DynamicCarousel";
import { GameCard } from "./GameCard";

export interface SectionHeaderProps {
  title: string;
  moreHref?: string;
  games: any[];
  rows?: 1 | 2;
  onMore?: () => void;
  showNavigation?: boolean;
}

export function SectionHeader({
  title,
  games = [],
  rows = 2,
  moreHref,
  onMore,
  showNavigation = true,
}: SectionHeaderProps) {
  const defaultSlug = `/games/${title.toLowerCase().replace(/\s+/g, "-")}`;
  const targetHref = moreHref || defaultSlug;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback((api: any) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // updateScrollState(emblaApi);
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);

    const timer = setTimeout(() => {
      emblaApi.reInit();
      updateScrollState(emblaApi);
    }, 150);

    return () => clearTimeout(timer);
  }, [emblaApi, updateScrollState, games]);

  const gamePairs = useMemo(() => {
    if (rows === 1) return [];
    const pairs: any[][] = [];
    for (let i = 0; i < games.length; i += 2) {
      pairs.push(games.slice(i, i + 2));
    }
    return pairs;
  }, [games, rows]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
    <div className="w-full space-y-3">
      <MainHeader>
        <TitleHeader>{title}</TitleHeader>

        <div className="flex items-center gap-2">
          {onMore ? (
            <button
              onClick={onMore}
              type="button"
              className="px-3.5 py-1.5 bg-[#003833] hover:bg-[#004d46] text-[#ffb703] hover:text-[#ffc107] text-xs font-bold rounded-md border border-[#0e5c55] transition-colors cursor-pointer"
            >
              More
            </button>
          ) : (
            <Link
              href={targetHref}
              className="px-3.5 py-1.5 bg-[#003833] hover:bg-[#004d46] text-[#ffb703] hover:text-[#ffc107] text-xs font-bold rounded-md border border-[#0e5c55] transition-colors inline-block"
            >
              More
            </Link>
          )}

          {showNavigation && (
            <div className="flex items-center gap-1">
              <button
                onClick={scrollPrev}
                type="button"
                disabled={!canScrollPrev}
                aria-label="Previous slide"
                className="p-1.5 bg-[#003833] hover:bg-[#004d46] text-slate-200 hover:text-[#00ffc4] rounded-md border border-[#0e5c55] hover:border-[#00ffc4]/60 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronLeft className="size-4 stroke-[2.5]" />
              </button>
              <button
                onClick={scrollNext}
                type="button"
                disabled={!canScrollNext}
                aria-label="Next slide"
                className="p-1.5 bg-[#003833] hover:bg-[#004d46] text-slate-200 hover:text-[#00ffc4] rounded-md border border-[#0e5c55] hover:border-[#00ffc4]/60 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronRight className="size-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </MainHeader>

      <CarouselViewport ref={emblaRef}>
        <CarouselTrack layout="flex" className="gap-2 sm:gap-3">
          {rows === 1
            ? games?.map((game: any) => (
                <CarouselSlide
                  key={game.id}
                  className="pl-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 shrink-0 min-w-0"
                >
                  <GameCard game={game} />
                </CarouselSlide>
              ))
            : gamePairs.map((pair, index) => (
                <CarouselSlide
                  key={index}
                  className="pl-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 shrink-0 min-w-0"
                >
                  <div className="flex flex-col gap-2.5 sm:gap-3.5 w-full">
                    {pair.map((game: any) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </CarouselSlide>
              ))}
        </CarouselTrack>
      </CarouselViewport>
    </div>
  );
}
