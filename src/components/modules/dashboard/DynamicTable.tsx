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
    <div className="bg-white border border-slate-200/80 overflow-hidden shadow-2xs min-h-80 flex flex-col justify-between">
      {/* Shadcn Table Primitive */}
      <Table>
        <TableHeader className="bg-slate-100/80">
          <TableRow className="hover:bg-transparent border-b border-slate-200">
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
              <TableCell colSpan={columns.length} className="h-80 text-center">
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
                    className={`py-2.5 px-4 text-xs text-slate-700 ${
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
              <TableCell colSpan={columns.length} className="h-80 text-center">
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
        {totals && data.length > 0 && (
          <TableFooter className="bg-slate-100/90 border-t border-slate-200 font-semibold text-xs">
            <TableRow className="hover:bg-transparent">
              <TableCell className="text-slate-600 font-bold px-4 text-center">
                Total
              </TableCell>
              <TableCell className="text-slate-600 font-medium px-4 text-center">
                Count: {totals.Count || totals.totalCount}
              </TableCell>
              <TableCell className="text-slate-900 font-extrabold px-4 text-center">
                Amount: {totals.Amount || totals.totalAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default DynamicTable;
