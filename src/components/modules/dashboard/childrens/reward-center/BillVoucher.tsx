import DynamicRecordContainer from "@/components/shared/DynamicRecordTabs";
const PROFIT_LOSS_TABS = [{ id: "bill", label: "Voucher Record" }];

// ২. Table Columns
const PROFIT_LOSS_COLUMNS = [
  { key: "voucherName", label: "Voucher Name" },
  { key: "voucherType", label: "Voucher type" },
  { key: "usedTime", label: "Used Time" },
  { key: "product name", label: "Product Name" },
  { key: "redemptionCode", label: "Redemption Code" },
  { key: "voucher", label: "Voucher" },
];
const VENDOR_OPTIONS = [
  { value: "all", label: "All" },
  { value: "evolution", label: "Evolution" },
  { value: "pragmatic", label: "Pragmatic Play" },
  { value: "sexy", label: "Sexy Baccarat" },
  { value: "pg", label: "PG Soft" },
];
const BillVoucher = () => {
  return (
    <DynamicRecordContainer
      tabs={PROFIT_LOSS_TABS}
      columns={PROFIT_LOSS_COLUMNS}
      label="Voucher type"
      selectData={VENDOR_OPTIONS}
    />
  );
};

export default BillVoucher;
