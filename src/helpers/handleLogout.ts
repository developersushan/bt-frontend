/* eslint-disable @typescript-eslint/no-explicit-any */
import { logoutAction } from "@/services/auth.service";
import { toast } from "sonner";

export const handleLogout = async (router: any) => {
  const toastId = toast.loading("Logging out...");
  try {
    const result = await logoutAction();
    const successMessage = result?.message || "Logged out successfully";
    toast.success(successMessage, {
      id: toastId,
    });
    router.refresh();
  } catch (error) {
    toast.error("Logout failed. Try again!", { id: toastId });
    console.error(error);
  }
};
