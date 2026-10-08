import DynamicRecordContainer from "@/components/shared/DynamicRecordTabs";

 const PROFIT_LOSS_TABS = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "this_week", label: "This Week" },
  { id: "this_month", label: "This Month" },
];

// ২. Table Columns
 const PROFIT_LOSS_COLUMNS = [
  { key: "time", label: "Date " },
  { key: "category", label: "Deposit" },
  { key: "withdraw", label: "Withdraw", align: "center" },
  { key: "expenses", label: "Expenses", align: "right" },
  { key: "income", label: "Income", align: "right" },
  { key: "rebate", label: "Rebate", align: "right" },
  { key: "promotion", label: "Promotion", align: "right" },
  { key: "profitAndLoss", label: "Profit and loss", align: "center" },
];

export default function ProfitLoss() {
  return (
    <DynamicRecordContainer
      tabs={PROFIT_LOSS_TABS}
      columns={PROFIT_LOSS_COLUMNS}
    />
  );
}
