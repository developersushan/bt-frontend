import { useProfileStore } from "@/lib/useModalStore";
import BettingRecord from "./childrens/betting-record/BettingRecordContent";
import DepositContent from "./childrens/deposit/DepositContent";
import { PersonalInfoForm } from "./childrens/my-account/PersonalInfo";
import LinkEWallet from "./childrens/my-account/LinkEWallet";
import { ChangePasswordForm } from "../auth/ChangePasswordForm";
import MyAccountContent from "./childrens/my-account/MyAccountMain";
import TransactionPassword from "./childrens/my-account/TransactionPassword";
import WithdrawalMain from "./childrens/withdrawal/WithdrawalMain";
import AccountRecord from "./childrens/account-record/AccountRecord";
import ProfitLoss from "./childrens/profit-and-loss/ProfitLoss";
import RewardCenter from "./childrens/reward-center/RewardCenter";
import BillVoucher from "./childrens/reward-center/BillVoucher";

export function DynamicTabContent() {
  const activeTab = useProfileStore((state) => state.activeTab);

  switch (activeTab) {
    case "my-account":
      return <MyAccountContent />;
    case "deposit":
      return <DepositContent />;
    case "betting-record":
      return <BettingRecord />;
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
    case "account-record":
      return <AccountRecord />;
    case "profit-and-loss":
      return <ProfitLoss />;
    case "reward-center":
      return <RewardCenter />;
    case "internal-message":
      return <AccountRecord />;
    case "custom-service":
      return <AccountRecord />;
    case "invite-friends":
      return <AccountRecord />;
    case "mission":
      return <AccountRecord />;
    case "bill-voucher":
      return <BillVoucher />;
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
