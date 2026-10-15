"use client";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/shared/Loading";
import { getAllGames } from "@/services/games.service";
import { IGame } from "@/types/game.types";

const AllCategory = () => {
  const { isLoading, data: gamesData } = useQuery({
    queryKey: ["games"],
    queryFn: () => getAllGames(),
  });

  if (isLoading) {
    return <LoadingState message="Games loading..." />;
  }

  const games = gamesData ?? [];

  // Get unique categories dynamically
  const categories = [
    ...new Set(games.map((game: IGame) => game.category.toLowerCase())),
  ];

  // Format category for display
  const formatCategory = (category: string) =>
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="w-full space-y-6">
      {categories.map((category) => {
        const categoryGames = games.filter(
          (game: IGame) => game.category.toLowerCase() === category,
        );

        return (
          <SectionHeader
            key={category}
            title={formatCategory(category)}
            moreHref={`/${category}`}
            games={categoryGames}
            rows={1}
          />
        );
      })}
    </div>
  );
};

export default AllCategory;
