"use server";
import { fetcher } from "@/lib/fetcher";

export const getAllGames = async () => {
  return await fetcher("/games");
};
