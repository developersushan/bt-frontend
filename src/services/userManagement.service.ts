/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from "@/lib/fetcher";

export const getAllUser = async (): Promise<any> => {
  return await fetcher("/admin/users");
};
