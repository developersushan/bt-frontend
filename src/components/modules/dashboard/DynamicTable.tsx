/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Inbox } from "lucide-react";

export interface ColumnConfig {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: Record<string, any>[];
  isLoading?: boolean;
  totals?: Record<string, string | number>;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  isLoading = false,
  totals,
}) => {
  return (
    <div className="w-full max-w-dvw md:min-h-80 bg-white border border-slate-200/80 shadow-2xs flex flex-col overflow-hidden">
      <div className="w-full overflow-x-auto">
        <Table className="w-full caption-bottom text-sm">
          <TableHeader className="bg-slate-100/80">
            <TableRow className="hover:bg-transparent border-b border-slate-200">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`h-9 text-slate-500 font-semibold text-[11px] px-4 whitespace-nowrap ${
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
                  className="h-48 text-center"
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
                      className={`py-2.5 px-4 text-xs text-slate-700 whitespace-nowrap ${
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
                <TableCell
                  colSpan={columns.length}
                  className="h-48 text-center"
                >
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

          {/* ফুটার */}
          {totals && data.length > 0 && (
            <TableFooter className="bg-slate-100/90 border-t border-slate-200 font-semibold text-xs">
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-3 text-right"
                >
                  <div className="flex justify-end gap-6">
                    <span>
                      Total Count:{" "}
                      <strong className="text-slate-900">
                        {totals.Count || totals.totalCount}
                      </strong>
                    </span>
                    <span>
                      Total Amount:{" "}
                      <strong className="text-slate-900">
                        {totals.Amount || totals.totalAmount}
                      </strong>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
};

export default DynamicTable;
