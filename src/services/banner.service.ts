"use server"
import { fetcher } from "@/lib/fetcher";

export type UserBanner = {
  id: number | string;
  image_url?: string;
  image_path?: string;
  alt_text?: string;
};

type UserBannersResponse = {
  status?: string;
  data?: UserBanner[];
};

export const getUserBanners = async () => {
  const res = await fetcher<UserBannersResponse>("/banners");

  return res;
};