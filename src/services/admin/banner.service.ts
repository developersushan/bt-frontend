"use server";
import { fetcher } from "@/lib/fetcher";

export const bannerCreate = async (payload: FormData) => {
  const res = await fetcher(`/admin/banners/save`, {
    method: "POST",
    body: payload,
  });
  return res;
};
export const getBanners = async () => {
  const res = await fetcher(`/admin/banners`);
  return res;
};
