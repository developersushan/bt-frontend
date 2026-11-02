"use client";

import React, { useState } from "react";
import {
  Inbox as InboxIcon,
  Send,
  Trash2,
  MailOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { messages } from "@/fake-data/messages";
import MobileHeader from "../MobileHeader";

export default function InternalMessages() {
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map((m) => m.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id: number) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter((item) => item !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const className =
    "cursor-pointer text-slate-600 data-active:shadow-none! data-active:border-b-red-500 data-active:text-red-500 data-active:font-bold rounded-none border-b-2 transition-all text-xs font-semibold px-1 pb-2.5 whitespace-nowrap";

  return (
    <div className="md:max-h-135 h-screen">
      <MobileHeader title="Internal Message" isContent={true} />
      <div className="w-full bg-white border border-slate-200/80 rounded-lg shadow-2xs overflow-hidden flex flex-col">
        {/* shadcn TabsInbox / Outbox */}
        <Tabs defaultValue="inbox" className="w-full">
          <div className="border-b border-slate-200 bg-slate-50/50 px-4 pt-3">
            <TabsList className="bg-transparent p-0 h-auto gap-4">
              <TabsTrigger value="inbox" className={className}>
                <InboxIcon className="w-4 h-4" />
                Inbox
              </TabsTrigger>
              <TabsTrigger value="outbox" className={className}>
                <Send className="w-4 h-4" />
                Outbox
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-200 bg-white gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium select-none">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                <span>Select all</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                disabled={selectedMessages.length === 0}
                className="h-8 w-8 text-slate-500 hover:text-red-600"
                title="Delete selected"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                disabled={selectedMessages.length === 0}
                className="h-8 w-8 text-slate-500 hover:text-slate-800"
                title="Mark as read"
              >
                <MailOpen className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer border border-slate-200 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition">
              <span>Sort by time</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Inbox Content */}
          <TabsContent value="inbox" className="mx-2">
            <div className="w-full min-h-87.5">
              <div className="divide-y divide-slate-100 lg:hidden">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`grid grid-cols-[32px_minmax(0,1fr)_auto] gap-x-2 px-2 py-3 ${
                      msg.unread ? "bg-slate-50/40" : "bg-white"
                    }`}
                  >
                    <div className="row-span-2 pt-0.5">
                      <Checkbox
                        checked={selectedMessages.includes(msg.id)}
                        onCheckedChange={() => toggleSelect(msg.id)}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {msg.unread && (
                          <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                        )}
                        <span className="truncate text-xs font-semibold text-slate-800">
                          {msg.sender}
                        </span>
                      </div>
                      <div className="mt-1 min-w-0 text-xs">
                        <span className="block font-medium text-slate-900">
                          {msg.title}
                        </span>
                        <span className="mt-0.5 block truncate text-slate-400">
                          {msg.preview}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              <Table className="hidden lg:table min-w-160">
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow
                      key={msg.id}
                      className={`hover:bg-slate-50/80 transition-colors border-b border-slate-100 ${
                        msg.unread ? "bg-slate-50/40 font-medium" : "bg-white"
                      }`}
                    >
                      <TableCell className="w-10 py-3">
                        <Checkbox
                          checked={selectedMessages.includes(msg.id)}
                          onCheckedChange={() => toggleSelect(msg.id)}
                        />
                      </TableCell>
                      <TableCell className="w-6 py-3 text-center">
                        {msg.unread && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        )}
                      </TableCell>
                      <TableCell className="w-36 py-3 text-xs font-semibold text-slate-800 truncate">
                        {msg.sender}
                      </TableCell>
                      <TableCell className="py-3 text-xs text-slate-600 truncate">
                        <span className="text-slate-900 font-medium mr-2">
                          {msg.title}
                        </span>
                        <span className="text-slate-400">{msg.preview}</span>
                      </TableCell>
                      <TableCell className="w-28 py-3 text-right text-[11px] text-slate-400 whitespace-nowrap">
                        {msg.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Outbox Content */}
          <TabsContent value="outbox" className="m-0">
            <div className="flex items-center justify-center h-87.5 text-slate-400 text-xs">
              No sent messages found.
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50/60">
          <Button
            variant="ghost"
            size="icon"
            disabled={selectedMessages.length === 0}
            className="h-8 w-8 text-slate-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 bg-white text-slate-400"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 bg-white text-slate-600"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>

            <Button
              size="icon"
              className="w-7 h-7 bg-slate-700 text-white font-medium text-xs hover:bg-slate-800"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 bg-white text-slate-600 text-xs"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 bg-white text-slate-600 text-xs"
            >
              3
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 bg-white text-slate-600"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 bg-white text-slate-400"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
