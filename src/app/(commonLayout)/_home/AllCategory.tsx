"use client";
import { SectionHeader } from "@/components/shared/SectionHeader";
import LoadingState from "@/components/shared/Loading";
import { IGame } from "@/types/game.types";
import { useGames } from "@/lib/useGames";

const AllCategory = () => {
  const { isLoading, gamesByGroup, formatCategoryTitle } = useGames();

  if (isLoading) {
    return <LoadingState message="Games loading..." />;
  }

  return (
    <div className="w-full space-y-6">
      {Object.entries(gamesByGroup).map(([categoryKey, games], index) => {
        const categoryGames = (games as IGame[]) ?? [];
        if (categoryGames.length === 0) return null;
        const calculatedRows = index % 2 === 0 ? 1 : 2;
        return (
          <SectionHeader
            key={categoryKey}
            title={formatCategoryTitle(categoryKey)}
            moreHref={`/${categoryKey}`}
            games={categoryGames}
            rows={calculatedRows}
          />
        );
      })}
    </div>
  );
};

export default AllCategory;
