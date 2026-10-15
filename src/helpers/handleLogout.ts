import { logoutAction } from "@/services/auth.service";
import { toast } from "sonner";

export const handleLogout = async () => {
  const toastId = toast.loading("Logging out...");
  try {
    const result = await logoutAction();
    const successMessage = result?.message || "Logged out successfully";
    toast.success(successMessage, {
      id: toastId,
    });
    window.location.reload();
  } catch (error) {
    toast.error("Logout failed. Try again!", { id: toastId });
    console.error(error);
  }
};
