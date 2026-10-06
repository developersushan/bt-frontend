import {
  User,
  Lock,
  Wallet,
  KeyRound,
  Power,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  LucideIcon,
} from "lucide-react";
import { useProfileStore } from "@/lib/useModalStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SecurityItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgGradient: string;
  bgColor?: string;
  status?: "warning" | "success" | "none";
  isLogout?: boolean;
}

export const items: SecurityItem[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description:
      "Complete the personal information to improve your account security.",
    icon: User,
    iconBgGradient: "from-amber-300 to-yellow-500 shadow-yellow-200",
    bgColor: "bg-amber-400",
    status: "warning",
  },
  {
    id: "login-password",
    title: "Login password",
    description:
      "Recommended password with combination of letters and numbers, mixed with uppercase and lowercase.",
    icon: Lock,
    iconBgGradient: "from-cyan-300 to-cyan-500 shadow-cyan-200",
    status: "success",
  },
  {
    id: "link-ewallet",
    title: "Link E-wallet",
    description: "Link E-wallet for withdrawal.",
    icon: Wallet,
    iconBgGradient: "from-fuchsia-400 to-pink-500 shadow-pink-200",
    bgColor: "bg-fuchsia-500",
    status: "warning",
  },
  {
    id: "transaction-password",
    title: "Transaction Password",
    description:
      "Transaction password will use to verify your identity for any fund related operation for account safety purposes.",
    icon: KeyRound,
    iconBgGradient: "from-amber-600/60 to-yellow-700/70 shadow-amber-200",
    bgColor: "bg-amber-600",
    status: "warning",
  },
];

export function SecuritySettings() {
  const { setActiveTab } = useProfileStore();

  return (
    <div className="max-w-md space-y-5 font-sans select-none">
      <div className="w-full space-y-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="group flex items-start gap-4 cursor-pointer transition-all duration-200 hover:opacity-90"
            >
              <div
                className={`w-12 h-12 rounded-full bg-linear-to-br ${item.iconBgGradient} flex items-center justify-center shrink-0 shadow-lg text-white`}
              >
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div className="flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-700">
                    {item.title}
                  </h3>
                  {item.status === "warning" && (
                    <AlertCircle className="w-4 h-4 fill-red-500 text-white stroke-2" />
                  )}
                  {item.status === "success" && (
                    <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white stroke-2" />
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-snug mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <LogoutDialog />
    </div>
  );
}

export function LogoutDialog() {
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="flex items-center gap-4 w-full text-left cursor-pointer group transition-all duration-200 hover:opacity-90"
          >
            <div className="bg-linear-to-br from-red-400 to-rose-600 shadow-lg shadow-red-200 size-12 flex items-center justify-center rounded-full text-white shrink-0">
              <Power className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-slate-700">
                Logout
              </h4>
              <p className="text-xs text-slate-400 leading-snug mt-1">
                Logout Safely
              </p>
            </div>
          </button>
        }
      />

      <DialogContent className="sm:max-w-sm p-6 bg-slate-900 border border-slate-800 text-white shadow-2xl rounded-3xl outline-none focus:outline-none">
        <form onSubmit={handleLogout} className="space-y-6">
          <DialogHeader className="space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-white">
                Confirm Session Logout
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400 font-normal leading-relaxed mt-1">
                Are you sure you want to end your current session and exit?
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex items-center justify-end gap-2.5 pt-1">
            <DialogClose>
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer h-9 px-4"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-500/25 cursor-pointer h-9 px-5 transition-all"
            >
              Logout
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
