import type { role } from "@/lib/enum";

export interface User {
  id: number;
  name: string | null;
  phone: string;
  phone_verified_at: string | null;
  created_at: string;
}

export interface UserInfoResponse {
  user: User & {
    roles: role;
    permissions: string[];
  };
}

export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}