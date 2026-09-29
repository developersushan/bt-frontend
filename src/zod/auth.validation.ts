import { z } from "zod";

export const loginZodSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .length(11, "Number must be exactly 11 characters"),
  // email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 8 characters long"),
});
export const registerZodSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .length(11, "Number must be exactly 11 characters"),
    // name: z.string().min(2, "Name must be at least 2 characters long"),
    // email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
