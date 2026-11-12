/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Lock, CheckCircle2, Save, Eye, EyeOff } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { changeTransactionPasswordAction } from "@/services/my-account.service";
import {
  transactionPasswordSchema,
  TransactionPayload,
} from "@/zod/my-account.validation";

function TransactionPassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["change-transaction-password"],
    mutationFn: (payload: TransactionPayload) =>
      changeTransactionPasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      current_transaction_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validators: {
      onChange: transactionPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating transaction password...");

      try {
        const result = await mutateAsync(value);

        if (result.status !== "success") {
          const errorMessage =
            result.message ||
            Object.values(result.errors || {}).flat()[0] ||
            "Failed to update transaction password";

          toast.error(errorMessage, { id: toastId });
          return;
        }

        toast.success("Transaction password updated successfully!", {
          id: toastId,
        });

        form.reset();
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.";

        toast.error(errorMessage, { id: toastId });
      }
    },
  });

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <div className="flex flex-col justify-center items-center w-full md:h-137.5 h-screen">
      <div className="w-full max-w-lg p-5 sm:p-7 bg-white rounded-2xl shadow-xl font-sans select-none text-slate-800 border border-slate-100">
        {/* 🔹 Header Section */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-teal-600 rounded-full" />
            <h2 className="text-lg font-bold text-slate-800 tracking-wide">
              Transaction Password
            </h2>
          </div>
        </div>

        {/* 🔹 Form Section */}
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* New Password Field */}
          <form.Field name="current_transaction_password">
            {(field) => (
              <AppField
                label="New Password"
                field={field}
                type={showPassword.current ? "text" : "password"}
                placeholder="Enter new password"
                prepend={
                  <button type="button">
                    <Lock size={16} className="text-teal-600" />
                  </button>
                }
                appendClassName="inset-y-2"
                append={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showPassword.current ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>
          <form.Field name="new_password">
            {(field) => (
              <AppField
                label="New Password"
                field={field}
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter new password"
                prepend={
                  <button type="button">
                    <Lock size={16} className="text-teal-600" />
                  </button>
                }
                appendClassName="inset-y-2"
                append={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showPassword.new ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Confirm Password Field */}
          <form.Field name="new_password_confirmation">
            {(field) => (
              <AppField
                label="Confirm Password"
                field={field}
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm new password"
                prepend={
                  <button type="button">
                    <CheckCircle2 size={16} className="text-teal-600" />
                  </button>
                }
                appendClassName="inset-y-2"
                append={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showPassword.confirm ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Saving Password..."
                  disabled={!canSubmit}
                  className="px-6 py-2.5 w-52 h-9  bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Save size={15} />
                  Save Transaction Password
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TransactionPassword;
