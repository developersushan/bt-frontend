/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Inbox } from "lucide-react";

// Shadcn Table Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import AppSelect from "./form/AppSelect.tsx";

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
  tabs: TabItem[];
  label?: string;
  columns: any[];
  data?: any[];
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
  onSearch,
}: DynamicRecordContainerProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");
  const [dateFilter, setDateFilter] = useState<string>("today");
  const [vendor, setVendor] = useState<string>("all");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch({ tab: activeTab, date: dateFilter, vendor });
    }
  };

  return (
    <div className="w-full border-slate-200/80 text-xs text-slate-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Dynamic Header Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 pt-2 bg-white">
          <TabsList className="bg-transparent h-auto p-0 gap-6 justify-start rounded-none overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                disabled={tabs.length <= 1}
                className={`rounded-none border-b-2 transition-all text-xs font-semibold px-1 pb-2.5 whitespace-nowrap ${
                  tabs.length <= 1
                    ? "cursor-default pointer-events-none  text-slate-800 font-bold"
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

        {/* Filter Controls Bar */}
        <div className="p-3 bg-slate-50/70 flex flex-wrap items-center gap-4 border-b border-slate-200/60">
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

          <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-lg px-3 py-1 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] text-slate-600 font-medium">
              10/07 00:00:00 ~ 10/07 23:59:59
            </span>
          </div>

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

        {/* Dynamic Table Section */}
        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="m-0 pl-0 focus-visible:outline-none"
          >
            <div className="min-h-80 flex flex-col justify-between">
              {/* Shadcn Table Primitive */}
              <Table>
                <TableHeader className="bg-slate-100/80">
                  <TableRow className="hover:bg-transparent border-b border-slate-200 ">
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className={`h-9 text-slate-500 font-semibold text-[11px] px-4 ${
                          col.align === "right"
                            ? "text-right"
                            : col.align === "center"
                              ? "text-center"
                              : "text-left"
                        }`}
                      >
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-80 text-center"
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-slate-400 font-medium text-xs">
                            Loading data...
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data.length > 0 ? (
                    data.map((row, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-slate-50 border-b border-slate-100"
                      >
                        {columns.map((col) => (
                          <TableCell
                            key={col.key}
                            className={`py-2.5 text-xs text-slate-700 ${
                              col.align === "right"
                                ? "text-right"
                                : col.align === "center"
                                  ? "text-center"
                                  : "text-left"
                            }`}
                          >
                            {row[col.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="hover:bg-transparent border-0">
                      <TableCell colSpan={columns.length} className="h-80">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Inbox className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                          <span className="text-slate-400 font-medium text-xs">
                            No matched data found
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                {/* Shadcn Table Footer for Totals */}
                {totals && (
                  <TableFooter className="bg-slate-100/90 border-t border-slate-200 font-semibold text-xs">
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={1}
                        className="text-slate-600 font-bold"
                      >
                        Total
                      </TableCell>
                      <TableCell
                        colSpan={columns.length - 1}
                        className="text-right"
                      >
                        <div className="flex items-center justify-end gap-8 font-medium text-slate-700">
                          {Object.entries(totals).map(([key, value]) => (
                            <span key={key}>
                              {key}:{" "}
                              <span className="font-bold text-slate-900">
                                {value}
                              </span>
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
