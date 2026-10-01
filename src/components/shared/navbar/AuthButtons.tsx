"use clinet";
import LoginForm from "@/components/modules/auth/LoginForm";
import RegisterForm from "@/components/modules/auth/RegisterForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

function AuthButtons() {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null,
  );

  return (
    <>
      {/* Trigger Buttons Header Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setActiveModal("login")}
          className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-teal-foreground bg-[#0e4431] border border-teal-foreground rounded-md hover:bg-teal-foreground hover:text-[#031c13] transition-colors cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={() => setActiveModal("register")}
          className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-black bg-linear-to-r from-amber-400 to-orange-500 rounded-md shadow-md hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          Register
        </button>
      </div>

      {/* Single Controlled Dialog Component */}
      <Dialog
        open={activeModal !== null}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <DialogContent className="rounded-2xl p-0! border-none bg-transparent max-w-sm w-full [&>button]:bg-[#022421] [&>button]:text-white [&>button]:hover:bg-[#003840] [&>button]:p-2 sm:[&>button]:mr-0 [&>button]:mr-4 [&>button]:rounded-full [&>button]:border [&>button]:border-[#0e5c55] [&>button]:top-3 [&>button]:right-3 transition-all">
          {activeModal === "login" && (
            <LoginForm onSwitchToRegister={() => setActiveModal("register")} />
          )}
          {activeModal === "register" && (
            <RegisterForm onSwitchToLogin={() => setActiveModal("login")} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AuthButtons;
