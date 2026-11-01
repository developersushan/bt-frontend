import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "@/services/games.service";
import { IGame } from "@/types/game.types";

export const useGames = () => {
  const { isLoading, data: response } = useQuery({
    queryKey: ["games"],
    queryFn: () => getAllGames(),
  });

  const gamesByGroup = (response as unknown as Record<string, IGame[]>) ?? {};

  return {
    isLoading,
    gamesByGroup,
    formatCategoryTitle,
  };
};

export const formatCategoryTitle = (key: string) =>
  key
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
