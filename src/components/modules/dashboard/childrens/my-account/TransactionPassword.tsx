"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Lock, CheckCircle2, Save, Eye, EyeOff } from "lucide-react";
import AppField from "@/components/shared/form/AppField";

function TransactionPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Password Change Submitted:", value);
      // API integration here
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="w-full max-w-xl p-5 sm:p-7 bg-white rounded-2xl shadow-xl font-sans select-none text-slate-800 border border-slate-100">
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
          <form.Field name="newPassword">
            {(field) => (
              <AppField
                label="New Password"
                field={field}
                type={showNew ? "text" : "password"}
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
                    onClick={() => setShowNew(!showNew)}
                    className="text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showNew ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Confirm Password Field */}
          <form.Field name="confirmPassword">
            {(field) => (
              <AppField
                label="Confirm Password"
                field={field}
                type={showConfirm ? "text" : "password"}
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
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Save size={15} />
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TransactionPassword;
