import { z } from "zod";

export const loginZodSchema = z.object({
  phone: z.string().min(10, "Invalid phone number"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  rememberMe: z.boolean(),
});

export const registerZodSchema = z
  .object({
    phone: z.string().min(10, "Invalid phone number"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    password_confirmation: z.string().min(1, "Confirm Password is required"),
    rememberMe: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const verifyEmailZodSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
});

export const forgetPasswordZodSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordZodSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
  newPassword: z
    .string()
    .min(5, "Password must be at least 8 characters long")
    .min(1, "Password is required"),
});

export const changePasswordZodSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "Current password must be at least 8 characters long"),

    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters long"),

    new_password_confirmation: z
      .string()
      .min(8, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.current_password !== data.new_password_confirmation, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const updateProfile = z.object({
  withdrawer_name: z.string().min(1, "Withdrawer name is required"),
  nickname: z.string().optional(),
  facebook_id: z.string().optional(),
  google_id: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
});

export type UpdateProfilePayload = z.infer<typeof updateProfile>;
export type ILoginPayload = z.infer<typeof loginZodSchema>;
export type IRegisterPayload = z.infer<typeof registerZodSchema>;
export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;
export type IForgetPasswordPayload = z.infer<typeof forgetPasswordZodSchema>;
export type IResetPasswordPayload = z.infer<typeof resetPasswordZodSchema>;
export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;
