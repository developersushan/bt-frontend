"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "@/helpers/AppError";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookieUtlis";
import { fetcher } from "@/lib/fetcher";
import {
  changePasswordZodSchema,
  IChangePasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  loginZodSchema,
  registerZodSchema,
  updateProfile,
  UpdateProfilePayload,
} from "@/zod/auth.validation";
import type { UserInfoResponse } from "@/types/auth.types";
import status from "http-status";
import { UserRole } from "@/lib/enum";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new AppError(status.NOT_FOUND, "API_BASE_URL is not defined");
}

export const loginAction = async (payload: ILoginPayload) => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0]?.message ?? "Invalid Input";
    return {
      status: "error",
      message: firstError,
    };
  }

  const { phone, password, rememberMe } = parsedPayload.data;

  try {
    const res = await fetcher<any>("/login", {
      method: "POST",
      body: {
        phone,
        password,
      },
    });
    if (!res?.token) {
      return {
        status: "error",
        message: res?.message || "লগইন ব্যর্থ হয়েছে",
      };
    }
    await setCookie("token", res.token, rememberMe);
    const userInfo = await getUserInfo();
    if (!userInfo) {
      await deleteCookie("token");
    }
    const role = Array.isArray(userInfo?.user?.roles)
      ? userInfo.user.roles
      : userInfo?.user?.roles
        ? [userInfo.user.roles]
        : [];

    const redirectTo =
      role.includes(UserRole.ADMIN) || role.includes(UserRole.SUPER_ADMIN)
        ? "/admin"
        : "/";
    return {
      message: res.message,
      role,
      data: res,
      redirectTo,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.message || "Something went wrong during login",
    };
  }
};

export const registerAction = async (payload: IRegisterPayload) => {
  const parsedPayload = registerZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0]?.message ?? "Invalid Input";
    return {
      status: "error",
      message: firstError,
    };
  }

  const { phone, password, password_confirmation, rememberMe } =
    parsedPayload.data;

  try {
    const res = await fetcher<any>("/register", {
      method: "POST",
      body: {
        phone,
        password,
        password_confirmation,
      },
    });
    if (!res?.token) {
      return {
        message: res?.message || "রেজিস্ট্রার ব্যর্থ হয়েছে",
      };
    }
    await setCookie("token", res.token, rememberMe);

    return {
      message: res.message,
      data: res,
    };
  } catch (error: any) {
    return {
      status: "error",
      message: error?.message || "Something went wrong during register",
    };
  }
};

export async function getUserInfo() {
  const token = await getCookie("token");
  if (!token) return null;

  try {
    const res = await fetcher<UserInfoResponse>("/me", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res) {
      return null;
    }
    return res;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export async function logoutAction(): Promise<{
  message?: string;
  [key: string]: any;
}> {
  const token = await getCookie("token");
  if (!token) {
    return { message: "No active session found" };
  }

  try {
    const res = (await fetcher("/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })) as { message?: string };

    return res;
  } catch (error) {
    console.error("Error during logout:", error);
    return { message: "Logout failed", error };
  } finally {
    await deleteCookie("token");
  }
}

export const changePasswordAction = async (payload: IChangePasswordPayload) => {
  const parsedPayload = changePasswordZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      status: "error",
      message: firstError,
    };
  }

  try {
    const response = await fetcher<any>(
      `/user/personal-center/change-password`,
      {
        method: "POST",
        body: parsedPayload.data,
      },
    );
    return response;
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.body?.message ||
      error?.data?.message ||
      error?.message ||
      "Failed to change password";

    return {
      status: "error",
      message: errorMessage,
    };
  }
};

export const profileUpdateAction = async (payload: UpdateProfilePayload) => {
  const parsedPayload = updateProfile.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid Input";
    return {
      status: "error",
      message: firstError,
    };
  }

  try {
    const response = await fetcher<any>(
      "/user/personal-center/update-profile",
      {
        method: "POST",
        body: parsedPayload.data,
      },
    );
    return response;
  } catch (error: any) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.body?.message ||
      error?.data?.message ||
      error?.message ||
      "Failed to update profile";

    return {
      status: "error",
      message: errorMessage,
    };
  }
};
