"use client";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/shared/Loading";
import { getAllGames } from "@/services/games.service";
import { IGame } from "@/types/game.types";

const AllCategory = () => {
  const { isLoading, data: response } = useQuery({
    queryKey: ["games"],
    queryFn: () => getAllGames(),
  });

  if (isLoading) {
    return <LoadingState message="Games loading..." />;
  }

  const gamesByGroup = response ?? {};

  const formatCategoryTitle = (key: string) =>
    key
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

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
