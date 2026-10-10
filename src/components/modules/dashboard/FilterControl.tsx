import AppSelect from "@/components/shared/form/AppSelect.tsx";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FilterControlProps {
  dateFilter: string;
  setDateFilter: (value: string) => void;
  label?: string;
  selectData: SelectOption[];
  vendor: string;
  setVendor: (value: string) => void;
  handleSearchClick: () => void;
  rightActions?: React.ReactNode;
}

const FilterControl: React.FC<FilterControlProps> = ({
  dateFilter,
  setDateFilter,
  label = "",
  selectData = [],
  vendor,
  setVendor,
  handleSearchClick,
  rightActions,
}) => {
  return (
    <div className="p-3 bg-slate-50/70 flex flex-wrap items-center gap-4 border-b border-slate-200/60">
      {/* Date Filter Radio Group */}
      <div className="flex items-center gap-3">
        {[
          { id: "today", label: "Today" },
          { id: "yesterday", label: "Yesterday" },
          { id: "7days", label: "7-Days" },
        ].map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-600 hover:text-slate-900"
          >
            <input
              type="radio"
              name="dateFilter"
              checked={dateFilter === item.id}
              onChange={() => setDateFilter(item.id)}
              className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
            />
            {item.label}
          </label>
        ))}
      </div>

      {/* Date Range Display */}
      <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-lg px-3 py-1 shadow-2xs">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] text-slate-600 font-medium">
          10/07 00:00:00 ~ 10/07 23:59:59
        </span>
      </div>

      {/* Conditional Select Dropdown */}
      {selectData.length > 0 && (
        <AppSelect
          className="flex items-center gap-2 space-y-0!"
          label={label}
          options={selectData}
          field={{
            state: { value: vendor },
            handleChange: (val: string) => setVendor(val),
          }}
        />
      )}

      {/* Search Button and Extra Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={handleSearchClick}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 h-7 text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
        >
          <Search className="w-3 h-3" />
          Search
        </Button>
        {rightActions}
      </div>
    </div>
  );
};

export default FilterControl;