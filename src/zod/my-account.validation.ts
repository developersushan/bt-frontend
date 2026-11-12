import { z } from "zod";

export const ewalletSchema = z
  .object({
    ewallet_type: z.string().min(1, "E-wallet type is required"),
    ewallet_account_number: z
      .string()
      .min(1, "Account number is required")
      .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
    name_on_card: z.string().optional(),
    transaction_password: z
      .string()
      .min(6, "Transaction password must be at least 6 characters"),
    transaction_password_confirmation: z
      .string()
      .min(1, "Please confirm your transaction password"),
  })
  .refine(
    (data) =>
      data.transaction_password === data.transaction_password_confirmation,
    {
      message: "Passwords do not match",
      path: ["transaction_password_confirmation"],
    },
  );

export const transactionPasswordSchema = z
  .object({
    current_transaction_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must not exceed 32 characters"),
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(32, "Password must not exceed 32 characters"),

    new_password_confirmation: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  })
  .refine((data) => data.current_transaction_password !== data.new_password, {
    message: "New password must be different from current password",
    path: ["new_password"], 
  });

export type TransactionPasswordValues = z.infer<
  typeof transactionPasswordSchema
>;

export type EwalletPayload = z.infer<typeof ewalletSchema>;
export type TransactionPayload = z.infer<typeof transactionPasswordSchema>;
