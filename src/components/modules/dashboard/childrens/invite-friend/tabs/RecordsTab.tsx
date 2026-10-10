"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppSelect from "@/components/shared/form/AppSelect.tsx";
import DynamicTable, { ColumnConfig } from "../../../DynamicTable";


const VENDOR_OPTIONS = [
  { label: "All Types", value: "all" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
];

export default function InvitedListRecordsTab() {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Columns Configuration
  const columns: ColumnConfig[] = [
    { key: "regDate", label: "Registration date", align: "center" },
    { key: "username", label: "Username", align: "center" },
    { key: "amount", label: "Amount", align: "center" },
  ];

  // 2. Table Rows Data
  const data = [
    {
      regDate: "2026-10-07 12:30:00",
      username: "user_01*****3",
      amount: "$250.00",
    },
    {
      regDate: "2026-10-07 14:15:00",
      username: "user_02*****1",
      amount: "$150.00",
    },
  ];

  // 3. Totals Configuration
  const totals = {
    Count: data.length,
    Amount: "$400.00",
  };

  const form = useForm({
    defaultValues: {
      type: "all",
      dateRange: "10/07 00:00:00 ~ 10/07 23:59:59",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      console.log("Form Submitted Values:", value);
    },
  });

  return (
    <div className="space-y-4 font-sans text-xs text-slate-700 select-none">
      {/* Filter Form Section */}
      <div className="bg-white border border-slate-200/80 p-4 shadow-2xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-wrap items-center gap-5"
        >
          <form.Field name="type">
            {(field) => (
              <AppSelect
                field={field}
                label="Types :"
                options={VENDOR_OPTIONS}
                className="flex items-center gap-2 space-y-0!"
              />
            )}
          </form.Field>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-3 h-9 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-600 font-medium whitespace-nowrap">
              10/07 00:00:00 ~ 10/07 23:59:59
            </span>
          </div>

          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg h-8 px-4 text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </Button>
        </form>
      </div>

      {/* Reusable Dynamic Table Section */}
      <DynamicTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        totals={totals}
      />
    </div>
  );
}
