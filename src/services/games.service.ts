/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { fetcher } from "@/lib/fetcher";
import { IGame } from "@/types/game.types";

export const getAllGames = async (): Promise<IGame[]> => {
  const res: any = await fetcher("/games/home");

  return res?.data || res || [];
};

export const getSingleGame = async (gameId: number) => {
  const res = await fetcher(`/games/${gameId}/launch`, {
    method: "POST",
  });
  return res;
};
