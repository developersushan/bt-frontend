
import {
  User,
  Lock,
  Wallet,
  KeyRound,
  Power,
  AlertCircle,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { useProfileStore } from "@/lib/useModalStore";

interface SecurityItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgGradient: string;
  status?: "warning" | "success" | "none";
  isLogout?: boolean;
}

const items: SecurityItem[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description:
      "Complete the personal information to improve your account security.",
    icon: User,
    iconBgGradient: "from-amber-300 to-yellow-500 shadow-yellow-200",
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
    status: "warning",
  },
  {
    id: "transaction-password",
    title: "Transaction Password",
    description:
      "Transaction password will use to verify your identity for any fund related operation for account safety purposes.",
    icon: KeyRound,
    iconBgGradient: "from-amber-600/60 to-yellow-700/70 shadow-amber-200",
    status: "warning",
  },
  {
    id: "logout",
    title: "Logout",
    description: "Logout Safely",
    icon: Power,
    iconBgGradient: "from-red-400 to-rose-600 shadow-red-200",
    status: "none",
    isLogout: true,
  },
];

export function SecuritySettings() {
  const { setActiveTab } = useProfileStore();

  return (
    <div className="w-full max-w-md space-y-5 p-2 font-sans select-none">
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
  );
}
