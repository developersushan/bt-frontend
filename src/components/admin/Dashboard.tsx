"use client";
import React from "react";
import {
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineTicket,
} from "react-icons/hi";
export default function Dashboard() {
  // start card data
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      icon: <HiOutlineUsers />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Total Bets Today",
      value: "3,210",
      icon: <HiOutlineTicket />,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      title: "Total Deposits",
      value: "$45,200",
      icon: <HiOutlineCurrencyDollar />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      title: "Active Matches",
      value: "24",
      icon: <HiOutlineChartBar />,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];
  return (
    <div>
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#111827] p-5 rounded-xl border border-gray-800 shadow-lg flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white">
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-lg ${stat.bg} ${stat.color} text-2xl`}
                >
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* TABLES & CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bets Table (Takes 2 columns) */}
            <div className="lg:col-span-2 bg-[#111827] rounded-xl border border-gray-800 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">
                  Recent Bets
                </h2>
                <button className="text-sm text-yellow-500 hover:text-yellow-400">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1F2937] text-gray-400">
                    <tr>
                      <th className="px-6 py-3 font-medium">User</th>
                      <th className="px-6 py-3 font-medium">Match</th>
                      <th className="px-6 py-3 font-medium">Amount</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {[
                      {
                        user: "Rahim Uddin",
                        match: "BAN vs IND",
                        amount: "$50",
                        status: "Won",
                        color: "text-green-400 bg-green-400/10",
                      },
                      {
                        user: "Karim Ahmed",
                        match: "ENG vs AUS",
                        amount: "$120",
                        status: "Pending",
                        color: "text-yellow-400 bg-yellow-400/10",
                      },
                      {
                        user: "Sabbir Hossain",
                        match: "PAK vs NZ",
                        amount: "$30",
                        status: "Lost",
                        color: "text-red-400 bg-red-400/10",
                      },
                      {
                        user: "Nusrat Jahan",
                        match: "BAN vs SL",
                        amount: "$75",
                        status: "Won",
                        color: "text-green-400 bg-green-400/10",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="hover:bg-[#1F2937]/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-white">{row.user}</td>
                        <td className="px-6 py-4">{row.match}</td>
                        <td className="px-6 py-4 font-medium text-white">
                          {row.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.color}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions / Recent Transactions */}
            <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Recent Transactions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Deposit",
                    user: "Rahim Uddin",
                    amount: "+$100",
                    color: "text-green-400",
                  },
                  {
                    name: "Withdraw",
                    user: "Karim Ahmed",
                    amount: "-$50",
                    color: "text-red-400",
                  },
                  {
                    name: "Deposit",
                    user: "Sabbir Hossain",
                    amount: "+$200",
                    color: "text-green-400",
                  },
                  {
                    name: "Withdraw",
                    user: "Nusrat Jahan",
                    amount: "-$30",
                    color: "text-red-400",
                  },
                ].map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${tx.color.replace("text", "bg")}`}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {tx.name}
                        </p>
                        <p className="text-xs text-gray-500">{tx.user}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${tx.color}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
