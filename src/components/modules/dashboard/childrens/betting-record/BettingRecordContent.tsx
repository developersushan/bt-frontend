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
    { key: "betAmount", label: "Bet amount", align: "right" as const },
    { key: "award", label: "Award", align: "right" as const },
    { key: "profitAndLoss", label: "Profit and loss", align: "right" as const },
    { key: "validBet", label: "Valid bet", align: "right" as const },
    { key: "gameName", label: "Game name" },
    { key: "gameNumber", label: "Game number" },
  ];

  return (
    <DynamicRecordContainer
      tabs={categoryTabs}
      columns={columns}
      extraHeaderButton={
        <Button className="bg-red-400 hover:bg-red-500 text-white rounded-full text-[11px] px-3.5 py-1 h-auto cursor-pointer">
          Exclusion turnover list
        </Button>
      }
    />
  );
}
