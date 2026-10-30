export const UserRole = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super-admin",
} as const;

export type role = (typeof UserRole)[keyof typeof UserRole];
