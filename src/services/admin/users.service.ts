"use server";
import { fetcher } from "@/lib/fetcher";

export const allUsers = async () => {
  const res = await fetcher(`/admin/users`);
  return res;
};
