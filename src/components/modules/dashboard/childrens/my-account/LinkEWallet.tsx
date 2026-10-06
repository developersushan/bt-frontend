"use client";

import { useState } from "react";
import { Eye, EyeOff, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppField from "@/components/shared/form/AppField";
import { useForm } from "@tanstack/react-form";

export default function LinkEWallet() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("Nagad");
  const form = useForm({
    defaultValues: {
      payeeName: "",
      accountNumber: "",
      transactionPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form Submitted:", value);
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full bg-white text-slate-800">
      {/* 🔹 Left Column: Form */}
      <div className="space-y-4 pl-6 py-6">
        {/* Header Title */}
        <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-2">
          <h2 className="text-base font-semibold text-slate-700">
            Link E-wallet
          </h2>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* E-wallet Dropdown */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-sm text-slate-600 font-normal">
              E-wallet :
            </label>
            <div className="col-span-2">
              <Select>
                <SelectTrigger className="w-full bg-white border-slate-300 text-slate-800 h-9">
                  <SelectValue placeholder="Select E-wallet" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-800">
                  <SelectItem value="Nagad">Nagad</SelectItem>
                  <SelectItem value="bKash">bKash</SelectItem>
                  <SelectItem value="Rocket">Rocket</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Name on Card */}
          <div className="space-y-1">
            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-sm text-slate-600 font-normal">
                Name on Card :
              </label>
              <div className="col-span-2">
                <form.Field name="payeeName">
                  {(field) => (
                    <AppField
                      field={field}
                      type="text"
                      placeholder="Please enter the full name of the payee"
                      className={`space-y-0!`}
                    />
                  )}
                </form.Field>
              </div>
            </div>
            <p className="text-[11px] text-red-500 font-medium leading-snug pl-[33.33%] pt-4">
              Please ensure your name matches your withdrawal information to
              avoid withdrawal failure.
            </p>
          </div>

          {/* E-wallet Type Card Box */}
          <div className="p-3 border border-slate-300 rounded-lg space-y-3 bg-white">
            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-xs text-slate-600 font-normal">
                E-wallet type :
              </label>
              <div className="col-span-2">
                <span className="inline-block px-8 py-1 border border-red-400 text-red-500 text-xs font-medium rounded bg-white">
                  {selectedWallet}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-xs text-slate-600 font-normal">
                Account Number :
              </label>
              <div className="col-span-2">
                <form.Field name="accountNumber">
                  {(field) => (
                    <AppField
                      field={field}
                      type="text"
                      placeholder={`Please fill in ${selectedWallet} account number`}
                      className={`space-y-0!`}
                    />
                  )}
                </form.Field>
              </div>
            </div>
          </div>

          {/* Transaction Password Section */}
          <div className="space-y-3 pt-1">
            <p className="text-xs text-red-500 font-medium">
              Please set up your transaction password.
            </p>

            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-xs text-slate-600 font-normal leading-tight">
                Transaction Password :
              </label>
              <div className="col-span-2">
                <form.Field name="transactionPassword">
                  {(field) => (
                    <AppField
                      field={field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Please enter transaction password"
                      className={`space-y-0!`}
                      appendClassName="inset-y-2"
                      append={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-500 hover:text-slate-700 focus:outline-none"
                        >
                          {showPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      }
                    />
                  )}
                </form.Field>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-xs text-slate-600 font-normal">
                Confirm password :
              </label>
              <div className="col-span-2">
                <form.Field name="confirmPassword">
                  {(field) => (
                    <AppField
                      field={field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Please enter confirm password"
                      className={`space-y-0!`}
                      appendClassName="inset-y-2"
                      append={
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-slate-500 hover:text-slate-700 focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      }
                    />
                  )}
                </form.Field>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full px-8 h-8 text-xs"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      {/* 🔹 Right Column: Registered List / Empty State */}
      <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-6 md:pl-6 flex flex-col justify-start">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-2 mb-8">
          <h2 className="text-base font-semibold text-slate-700">
            Registered E-wallet{" "}
            <span className="text-slate-500 font-normal text-sm">(0/5)</span>
          </h2>
        </div>

        {/* Empty State Illustration */}
        <div className="flex flex-col items-center justify-center my-auto py-12 space-y-3">
          <div className="p-4 bg-slate-50 rounded-full border border-slate-100">
            <CreditCard className="w-16 h-16 text-slate-300 stroke-1" />
          </div>
          <p className="text-xs font-normal text-slate-400">
            No E-Wallet linked yet
          </p>
        </div>
      </div>
    </div>
  );
}
