"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GameCategoryData } from "@/fake-data/category";
export interface HotGamesProps {
  data: GameCategoryData;
  rows?: 1 | 2;
}
const HotGames = ({ data, rows }: HotGamesProps) => {
  return (
    <section className="w-full my-6">
      <SectionHeader
        title={data?.title}
        moreHref={data?.moreHref}
        games={data?.games}
        rows={rows}
      />
    </section>
  );
};

export default HotGames;
