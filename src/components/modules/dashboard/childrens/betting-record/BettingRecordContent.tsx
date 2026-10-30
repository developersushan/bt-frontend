import DynamicRecordContainer from "@/components/modules/dashboard/DynamicRecordContainer";
import { Button } from "@/components/ui/button";
import MobileHeader from "../MobileHeader";
import { Settings } from "lucide-react";

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
    <div>
      <MobileHeader
        className="gap-3"
        title="Bet History"
        isContent={true}
        rightContent={
          <button
            type="button"
            className="block h-auto w-auto whitespace-nowrap rounded-full bg-red-400 px-2 py-1 text-[10px] text-white hover:bg-red-500"
          >
            Exclusion turnover list
          </button>
        }
      />
      <DynamicRecordContainer
        tabs={categoryTabs}
        columns={columns}
        selectData={VENDOR_OPTIONS}
        label="Vendor"
        rightActions={
          <>
            <button
              type="button"
              className="p-1.5 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <Settings className="size-4" />
            </button>
            <Button className="bg-red-400 md:block hidden hover:bg-red-500 text-white rounded-full text-[11px] px-3.5 py-1 h-auto cursor-pointer">
              Exclusion turnover list
            </Button>
          </>
        }
      />
    </div>
  );
}
