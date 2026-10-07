"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Pencil,
  Inbox,
  Lock,
  Banknote,
} from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { useProfileStore } from "@/lib/useModalStore";
const withdrawalMethods = [
  { id: "bkash", name: "Bkash", logoText: "bKash", color: "text-pink-600" },
  { id: "nagad", name: "Nagad", logoText: "নগদ", color: "text-orange-600" },
  { id: "rocket", name: "Rocket", logoText: "রকেট", color: "text-purple-600" },
];

export default function WithdrawalPaymentTabs() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setActiveTab } = useProfileStore();
  // TanStack Form Setup
  const form = useForm({
    defaultValues: {
      method: "bkash",
      amount: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Withdrawal Data Submitted:", value);
      form.reset();
    },
  });

  return (
    <div className="w-full p-4 sm:p-6 max-w-6xl mx-auto bg-slate-50/50 rounded-xl font-sans select-none">
      {/* Top Title Header */}
      <div className="border-b border-slate-200 pb-3 mb-4">
        <h2 className="text-sm font-bold text-red-500 border-b-2 border-red-500 inline-block pb-3 -mb-3.5 px-1">
          Withdrawal
        </h2>
      </div>

      {/* Main Container Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Payment Method Selection Using Shadcn Tabs */}
          <form.Field name="method">
            {(methodField) => (
              <Tabs
                value={methodField.state.value}
                onValueChange={(val) => methodField.handleChange(val)}
                className="w-full"
              >
                <div className="flex items-center gap-3">
                  <TabsList className="bg-transparent h-auto p-0 gap-3 flex-wrap justify-start">
                    {withdrawalMethods.map((method) => (
                      <TabsTrigger
                        key={method.id}
                        value={method.id}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 data-active:border-red-500 data-active:ring-2 data-active:ring-red-500 data-active:bg-white shadow-xs cursor-pointer transition-all"
                      >
                        <span
                          className={`font-extrabold text-sm ${method.color}`}
                        >
                          {method.logoText}
                        </span>
                        <span className="text-sm font-medium text-slate-600">
                          {method.name}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tab Specific Extra Notice or Content (Optional) */}
                {withdrawalMethods.map((method) => (
                  <TabsContent
                    key={method.id}
                    value={method.id}
                    className="mt-4 focus-visible:outline-none"
                  >
                    <div className="p-3 bg-orange-50/80 border border-orange-100 rounded-lg text-xs">
                      <span className="text-orange-600 font-medium">
                        {method.name} Withdrawal Time :{" "}
                      </span>
                      <span className="text-red-500 font-bold">24 hours</span>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </form.Field>

          {/* Wallet Card Section */}
          <div className="flex flex-col items-center justify-center py-6 px-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 space-y-4">
            <div className="relative w-44 h-28 bg-linear-to-tr from-slate-200 to-slate-100 rounded-xl border border-slate-300 flex flex-col justify-between p-3 shadow-inner">
              <div className="w-8 h-6 bg-slate-300/80 rounded-md" />
              <div className="space-y-1">
                <div className="w-24 h-2 bg-slate-300/80 rounded-full" />
                <div className="w-16 h-2 bg-slate-300/80 rounded-full" />
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              No E-Wallet linked yet
            </p>

            <Button
              onClick={() => setActiveTab("link-ewallet")}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 h-auto text-xs font-semibold shadow-md gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add wallet
            </Button>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 text-xs font-semibold text-slate-600 pt-2">
            <div className="grid grid-cols-12 items-center gap-2">
              <span className="col-span-4 sm:col-span-3">Central Wallet :</span>
              <span className="col-span-8 sm:col-span-9 text-sky-600 text-sm font-bold">
                0.00
              </span>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <span className="col-span-4 sm:col-span-3">
                Available Amount :
              </span>
              <span className="col-span-8 sm:col-span-9 text-sky-600 text-sm font-bold">
                0.00
              </span>
            </div>

            {/* Withdrawal Amount Field */}
            <form.Field
              name="amount"
              validators={{
                onChange: ({ value }: { value: string }) => {
                  if (!value) return "Amount is required";
                  const num = Number(value);
                  if (num < 100) return "Minimum amount is ৳100";
                  if (num > 10000) return "Maximum amount is ৳10,000";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex items-center gap-2">
                  <AppField
                    field={field}
                    label="Withdrawal Amount :"
                    type="number"
                    placeholder="100 ~ 10,000"
                    prepend={<Banknote className="w-3.5 h-3.5" />}
                  />
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[11px] mt-5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh
                  </button>
                </div>
              )}
            </form.Field>

            {/* Transaction Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }: { value: string }) => {
                  if (!value) return "Password is required";
                  if (value.length < 6) return "Min 6 characters required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Transaction Password :"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  prepend={<Lock className="w-3.5 h-3.5" />}
                  appendClassName="top-2.5"
                  append={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer hover:text-slate-600"
                    >
                      {showPassword ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                  }
                />
              )}
            </form.Field>
          </div>

          {/* Submit Area */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="bg-slate-300 hover:bg-slate-400 text-slate-700 disabled:opacity-60 rounded-full px-8 py-2 h-auto text-xs font-bold transition-all cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </form.Subscribe>
            <p className="text-xs text-slate-500 font-medium">
              Remaining Number of Withdrawal Today :{" "}
              <span className="text-red-500 font-bold">99</span>
            </p>
          </div>
        </div>

        {/* Right Column: Recent Withdrawal Sidebar */}
        <div className="lg:col-span-4 border-l border-slate-100 lg:pl-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4">
              <div className="w-1 h-4 bg-sky-500 rounded-full" />
              <h3 className="text-xs font-bold text-slate-700">
                Recent Withdrawal
              </h3>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-2 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-400">
                <Inbox className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">
                No Withdrawal Request
              </span>
            </div>
          </div>

          <div className="pt-6 text-center">
            <Button
              type="button"
              variant="outline"
              className="w-full max-w-40 mx-auto rounded-full border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              More
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
