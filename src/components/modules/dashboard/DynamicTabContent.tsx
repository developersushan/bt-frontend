import { useProfileStore } from "@/lib/useModalStore";
import { BettingRecordContent } from "./childrens/betting-record/BettingRecordContent";
import  DepositContent  from "./childrens/deposit/DepositContent";
import { PersonalInfoForm } from "./childrens/my-account/PersonalInfo";
import  LinkEWallet  from "./childrens/my-account/LinkEWallet";
import { ChangePasswordForm } from "../auth/ChangePasswordForm";
import MyAccountContent from "./childrens/my-account/MyAccountMain";
import TransactionPassword from "./childrens/my-account/TransactionPassword";
import WithdrawalMain from "./childrens/withdrawal/WithdrawalMain";

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
    case "link-ewallet":
      return <LinkEWallet />;
    case "transaction-password":
      return <TransactionPassword />;
    case "withdrawal":
      return <WithdrawalMain />;
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
