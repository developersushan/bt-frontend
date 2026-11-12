/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { fetcher } from "@/lib/fetcher";
import {
  EwalletPayload,
  ewalletSchema,
  transactionPasswordSchema,
  TransactionPayload,
} from "@/zod/my-account.validation";

export const getPersonalCenterDashboardAction = async () => {
  return await fetcher<any>("/user/personal-center/dashboard");
};


export const eWalletAction = async (payload: EwalletPayload) => {
  const parsedPayload = ewalletSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      status: "error",
      message: parsedPayload.error.issues[0]?.message || "Invalid Input",
    };
  }

  try {
    return await fetcher<any>("/user/personal-center/link-ewallet", {
      method: "POST",
      body: parsedPayload.data,
    });
  } catch (error: unknown) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to link eWallet",
    };
  }
};

export const changeTransactionPasswordAction = async (
  payload: TransactionPayload,
) => {
  const parsedPayload = transactionPasswordSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      status: "error",
      message: parsedPayload.error.issues[0]?.message || "Invalid Input",
    };
  }

  try {
    return await fetcher<any>(
      "/user/personal-center/set-transaction-password",
      {
        method: "POST",
        body: parsedPayload.data,
      },
    );
  } catch (error: unknown) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to update transaction password",
    };
  }
};
