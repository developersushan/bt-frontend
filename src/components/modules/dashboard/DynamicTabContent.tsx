import { useProfileStore } from "@/lib/useModalStore";
import { BettingRecordContent } from "./childrens/betting-record/BettingRecordContent";
import { DepositContent } from "./childrens/deposit/DepositContent";
import { PersonalInfoForm } from "./childrens/my-account/PersonalInfo";
import { ChangePasswordForm } from "../auth/ChangePasswordForm";
import MyAccountContent from "./childrens/my-account/MyAccountContent";

export function DynamicTabContent() {
  const activeTab = useProfileStore((state) => state.activeTab);

  switch (activeTab) {
    case "my-account":
      return <MyAccountContent />;
    case "deposit":
      return <DepositContent />;
    case "betting-record":
      return <BettingRecordContent />;
    case "personal-info":
      return <PersonalInfoForm />;
    case "login-password":
      return <ChangePasswordForm />;
    default:
      return (
        <div className="text-slate-500 py-10 text-center">
          Content for
          <span className="font-semibold text-teal-600">{activeTab}</span> is
          under development.
        </div>
      );
  }
}
