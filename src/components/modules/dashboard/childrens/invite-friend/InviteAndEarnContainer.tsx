"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import RewardsTab from "./tabs/RewardsTab";
import EarningsTab from "./tabs/EarningsTab";
import RecordsTab from "./tabs/RecordsTab";
import InvitedListTab from "./tabs/InvitedListTab";

export interface TabConfig {
  id: string;
  label: string;
}

const AFFILIATE_TABS: TabConfig[] = [
  { id: "overview", label: "Overview" },
  { id: "rewards", label: "Rewards" },
  { id: "earnings", label: "Earnings" },
  { id: "records", label: "Records" },
  { id: "invited_list", label: "Invited List" },
];

export default function InviteAndEarnContainer() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full bg-slate-50/50  font-sans text-xs text-slate-700 select-none">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Top Tab Bar Header */}
        <div className="pt-2 border-b border-slate-200/80 px-6">
          <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start rounded-none overflow-x-auto no-scrollbar">
            {AFFILIATE_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`rounded-none border-b-2 transition-all text-xs font-semibold px-1 pb-2.5 whitespace-nowrap ${
                  AFFILIATE_TABS.length <= 1
                    ? "cursor-default pointer-events-none border-b-transparent text-slate-800 font-bold"
                    : "cursor-pointer text-slate-500 data-active:border-b-red-500 data-active:text-red-500 data-active:font-bold data-active:shadow-none! data-active:bg-transparent"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Dynamic Separate Component Contents */}
        <div>
          <TabsContent
            value="overview"
            className="m-0 focus-visible:outline-none px-4 sm:px-6"
          >
            <OverviewTab />
          </TabsContent>

          <TabsContent
            value="rewards"
            className="m-0 focus-visible:outline-none px-4 sm:px-6"
          >
            <RewardsTab />
          </TabsContent>

          <TabsContent
            value="earnings"
            className="m-0 focus-visible:outline-none px-4 sm:px-6"
          >
            <EarningsTab />
          </TabsContent>

          <TabsContent
            value="records"
            className="m-0 focus-visible:outline-none"
          >
            <RecordsTab />
          </TabsContent>

          <TabsContent value="invited_list" className="m-0 focus-visible:outline-none">
          <InvitedListTab />
        </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
