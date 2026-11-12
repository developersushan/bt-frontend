/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, EyeOff, CreditCard } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { useForm } from "@tanstack/react-form";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { EwalletPayload, ewalletSchema } from "@/zod/my-account.validation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { eWalletAction } from "@/services/my-account.service";
import { AppSelect } from "@/components/shared/form/AppSelect.tsx";
const initialize: EwalletPayload = {
  name_on_card: "",
  ewallet_type: "bkash",
  ewallet_account_number: "",
  transaction_password: "",
  transaction_password_confirmation: "",
};
export default function LinkEWallet() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("nagad");

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["ewallet"],
    mutationFn: (payload: EwalletPayload) => eWalletAction(payload),
  });
  const form = useForm({
    defaultValues: initialize,
    validators: {
      onChange: ewalletSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating e-wallet details...");

      try {
        const result = await mutateAsync(value);
        if (result.status !== "success") {
          toast.error(result.message || "Failed to update ewallet", {
            id: toastId,
          });
          return;
        }

        toast.success("E-wallet updated successfully!", { id: toastId });
        form.reset();
      } catch (err: any) {
        console.error(err);
        const errorMessage =
          err?.response?.data?.body?.message ||
          err?.message ||
          "Something went wrong. Please try again.";

        toast.error(errorMessage, { id: toastId });
      }
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full bg-white text-slate-800">
      {/* 🔹 Left Column: Form */}
      <div className="space-y-4 pl-6 md:pr-0 pr-6 py-6">
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
              <form.Field name="ewallet_type">
                {(field) => (
                  <AppSelect
                    field={field}
                    options={[
                      { label: "bKash", value: "bkash" },
                      { label: "Nagad", value: "nagad" },
                      { label: "Rocket", value: "rocket" },
                    ]}
                    onValueChange={(val: any) => {
                      setSelectedWallet(val);
                    }}
                  />
                )}
              </form.Field>
            </div>
          </div>

          {/* Name on Card */}
          <div className="space-y-1">
            <div className="grid grid-cols-3 items-center gap-2">
              <label className="text-sm text-slate-600 font-normal">
                Name on Card :
              </label>
              <div className="col-span-2">
                <form.Field name="name_on_card">
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
                <form.Field name="ewallet_account_number">
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

          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-xs text-slate-600 font-normal leading-tight">
              Transaction Password :
            </label>
            <div className="col-span-2">
              <form.Field name="transaction_password">
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
              <form.Field name="transaction_password_confirmation">
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

          {/* Submit Button */}
          <div className="pt-2">
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Updating..."
                  disabled={!canSubmit}
                  className="px-6 py-2.5 w-26 h-9  bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  Submit
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>

      {/* 🔹 Right Column: Registered List / Empty State */}
      <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-6 pl-6 flex flex-col justify-start">
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
