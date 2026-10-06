import {
  User,
  History,
  FileText,
  Mail,
  Wallet,
  ArrowUpRight,
  Headphones,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentItem {
  id: string;
  title: string;
  icon: LucideIcon;
}
const components: ComponentItem[] = [
  { id: "my-account", title: "My Account", icon: User },
  { id: "betting-record", title: "Betting Record", icon: History },
  { id: "account-record", title: "Account Record", icon: FileText },
  { id: "internal-message", title: "Internal Message", icon: Mail },
  { id: "deposit", title: "Deposit", icon: Wallet },
  { id: "withdrawal", title: "Withdrawal", icon: ArrowUpRight },
  { id: "custom-service", title: "Custom Service", icon: Headphones },
];
interface Props {
  handleSelect: (selected: ComponentItem) => void;
}
const ProfileCard = ({ handleSelect }: Props) => {
  return (
    <div
      className={cn(
        "bg-[#002632] border-teal-400 w-52 p-1 rounded-md text-slate-100 z-50",
      )}
    >
      <ul className="flex flex-col space-y-0.5">
        {components.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className="group flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#003833] text-left outline-none transition-colors"
              >
                <Icon className="w-4 h-4 text-slate-300 group-hover:text-teal-400" />
                <span className="text-sm font-medium group-hover:text-teal-400">
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
        <li className="border-t border-teal-500/20 pt-1">
          <button
            type="button"
            className="group flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-red-500/10 text-left outline-none transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-300 group-hover:text-red-400" />
            <span className="text-sm font-medium group-hover:text-red-400">
              Sign Out
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
