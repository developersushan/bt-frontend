import DynamicRecordContainer from "@/components/modules/dashboard/DynamicRecordContainer";

export default function InvitedListTab() {
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
      tabList={false}
      columns={columns}
      selectData={VENDOR_OPTIONS}
    />
  );
}
