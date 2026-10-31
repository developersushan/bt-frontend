"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/shared/Loading";
import { GameCard } from "@/components/shared/GameCard";
import { formatCategoryTitle } from "@/lib/useGames";
import { getSingleCategoryGame } from "@/services/games.service";
import { IGame } from "@/types/game.types";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { isPending, data: response } = useQuery({
    queryKey: ["category", category],
    queryFn: () => getSingleCategoryGame(category),
  });

  if (isPending) {
    return <LoadingState message="Games loading..." />;
  }

  const games: IGame[] = Array.isArray(response)
    ? response
    : (response?.data ?? []);

  if (games.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-xl font-bold text-white">
          {formatCategoryTitle(category)}
        </h1>
        <p className="text-white/70">No games found in this category.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <h1 className="text-xl font-bold text-white">
        {formatCategoryTitle(category)}
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
