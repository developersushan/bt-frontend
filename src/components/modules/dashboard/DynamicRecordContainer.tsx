/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FilterControl from "./FilterControl";
import DynamicTable from "./DynamicTable";

export interface TabItem {
  id: string;
  label: string;
}

export interface ColumnItem {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface SelectOption {
  value: string;
  label: string;
}

interface DynamicRecordContainerProps {
  tabList?: boolean;
  tabs: TabItem[];
  label?: string;
  columns: ColumnItem[];
  data?: Record<string, any>[];
  selectData?: SelectOption[];
  isLoading?: boolean;
  totals?: Record<string, string | number>;
  extraHeaderButton?: React.ReactNode;
  rightActions?: React.ReactNode;
  onSearch?: (filters: { tab: string; date: string; vendor: string }) => void;
}

export default function DynamicRecordContainer({
  tabs,
  columns,
  label = "",
  data = [],
  selectData = [],
  isLoading = false,
  totals,
  extraHeaderButton,
  rightActions,
  tabList = true,
  onSearch,
}: DynamicRecordContainerProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");
  const [dateFilter, setDateFilter] = useState<string>("today");
  const [vendor, setVendor] = useState<string>("all");

  const handleSearchClick = () => {
    onSearch?.({ tab: activeTab, date: dateFilter, vendor });
  };

  return (
    <div className="w-full border-slate-200/80 text-xs text-slate-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {tabList && (
          <div className="flex items-center justify-between border-b border-slate-200 px-4 pt-2 bg-white">
            <TabsList className="bg-transparent h-auto p-0 gap-6 justify-start rounded-none overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  disabled={tabs.length <= 1}
                  className={`rounded-none border-b-2 transition-all text-xs font-semibold px-1 pb-2.5 whitespace-nowrap ${
                    tabs.length <= 1
                      ? "cursor-default pointer-events-none text-slate-800 font-bold"
                      : "cursor-pointer text-slate-600 data-active:shadow-none! data-active:border-b-red-500 data-active:text-red-500 data-active:font-bold"
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {extraHeaderButton && (
              <div className="shrink-0 mb-1.5 mr-5">{extraHeaderButton}</div>
            )}
          </div>
        )}

        <FilterControl
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          label={label}
          selectData={selectData}
          vendor={vendor}
          setVendor={setVendor}
          handleSearchClick={handleSearchClick}
          rightActions={rightActions}
        />

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="m-0 pl-0 focus-visible:outline-none"
          >
            <DynamicTable
              columns={columns}
              totals={totals}
              data={data}
              isLoading={isLoading}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}