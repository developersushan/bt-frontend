import DynamicRecordContainer from "@/components/shared/DynamicRecordTabs";
import { Button } from "@/components/ui/button";

export default function BettingRecord() {
  const categoryTabs = [
    { id: "slot", label: "Slot" },
    { id: "live", label: "Live" },
    { id: "poker", label: "Poker" },
    { id: "fishing", label: "Fishing" },
    { id: "sport", label: "Sport" },
    { id: "lotto", label: "Lotto" },
  ];

  const columns = [
    { key: "betTime", label: "Bet time" },
    { key: "betAmount", label: "Bet amount" },
    { key: "award", label: "Award" },
    { key: "profitAndLoss", label: "Profit and loss" },
    { key: "validBet", label: "Valid bet" },
    { key: "gameName", label: "Game name" },
    { key: "gameNumber", label: "Game number" },
  ];

  const VENDOR_OPTIONS = [
    { value: "all", label: "All" },
    { value: "evolution", label: "Evolution" },
    { value: "pragmatic", label: "Pragmatic Play" },
    { value: "sexy", label: "Sexy Baccarat" },
    { value: "pg", label: "PG Soft" },
  ];

  return (
    <DynamicRecordContainer
      tabs={categoryTabs}
      columns={columns}
      selectData={VENDOR_OPTIONS}
      label="Vendor"
      extraHeaderButton={
        <Button className="bg-red-400 hover:bg-red-500 text-white rounded-full text-[11px] px-3.5 py-1 h-auto cursor-pointer">
          Exclusion turnover list
        </Button>
      }
    />
  );
}
