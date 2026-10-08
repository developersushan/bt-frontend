import DynamicRecordContainer from "@/components/shared/DynamicRecordTabs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function AccountRecord() {
  const ACCOUNT_RECORD_TABS = [
    { id: "all", label: "All Records" },
    { id: "deposit", label: "Deposit" },
    { id: "withdraw", label: "Withdraw" },
    { id: "bonus", label: "Bonus & Promo" },
    { id: "transfer", label: "Transfer" },
  ];

  // ২. Table Columns Specification
  const ACCOUNT_RECORD_COLUMNS = [
    { key: "type", label: "Transaction Type" },
    { key: "time", label: "Transaction Time" },
    { key: "amount", label: "Transaction Amount" },
    { key: "balance", label: "Current Balance" },
    { key: "referenceNumber", label: "Order reference number" },
  ];

  // ৩. Type Dropdown Filter Options
  const ACCOUNT_TYPE_OPTIONS = [
    { value: "all", label: "All Types" },
    { value: "deposit", label: "Deposit" },
    { value: "withdraw", label: "Withdraw" },
    { value: "rebate", label: "VIP Rebate" },
    { value: "promo", label: "Promotion Bonus" },
  ];

  return (
    <DynamicRecordContainer
      tabs={ACCOUNT_RECORD_TABS}
      columns={ACCOUNT_RECORD_COLUMNS}
      selectData={ACCOUNT_TYPE_OPTIONS}
      label="Transaction type"
      rightActions={
        <button
          type="button"
          className="p-1.5 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      }
      extraHeaderButton={
        <Button className="bg-red-400 hover:bg-red-500 text-white rounded-full text-[11px] px-3.5 py-1 h-auto cursor-pointer">
          Exclusion turnover list
        </Button>
      }
    />
  );
}
