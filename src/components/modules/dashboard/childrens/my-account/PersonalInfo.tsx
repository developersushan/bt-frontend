"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  AlertCircle,
  Save,
  ShieldCheck,
} from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { useForm } from "@tanstack/react-form";
import { FacebookIcon } from "@/icons/svg";

export function PersonalInfoForm() {
  const form = useForm({
    defaultValues: {
      withdrawerName: "",
      nickname: "",
      facebookId: "",
      google: "",
      whatsapp: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form Submitted:", value);
      // API call to update profile info
    },
  });
  return (
    <div className=" my-4 w-full max-w-xl mx-auto p-5 sm:p-7 bg-white rounded-2xl shadow-xl font-sans select-none text-slate-800 border border-slate-100">
      {/* 🔹 Header Section */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-teal-600 rounded-full" />
          <h2 className="text-lg font-bold text-slate-800 tracking-wide">
            Personal Information
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
          <ShieldCheck size={14} className="text-teal-600" />
          <span className="font-medium">Account Protected</span>
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
        {/* Withdrawer Name Field */}
        <div className="space-y-1">
          <form.Field name="withdrawerName">
            {(field) => (
              <AppField
                label="Withdrawer Name"
                field={field}
                type="text"
                placeholder="Please enter 1 - 255 characters"
                prepend={
                  <button type="button">
                    <User size={16} className="text-teal-600" />
                  </button>
                }
              />
            )}
          </form.Field>
          <p className="text-[11px] font-medium text-red-500 bg-red-50 border border-red-100 px-3 py-1.5 rounded-md flex items-start gap-1.5 leading-snug">
            <AlertCircle size={14} className="shrink-0 text-red-500 mt-0.5" />
            Please ensure your name matches your withdrawal information to avoid
            withdrawal failure.
          </p>
        </div>

        {/* Nickname Field */}
        <form.Field name="nickname">
          {(field) => (
            <AppField
              label="Nickname"
              field={field}
              type="text"
              placeholder="Please enter 1 - 255 characters"
              prepend={
                <button type="button">
                  <User size={16} className="text-teal-600" />
                </button>
              }
            />
          )}
        </form.Field>

        {/* Facebook ID Field */}
        <form.Field name="facebookId">
          {(field) => (
            <AppField
              label="Facebook ID"
              field={field}
              type="text"
              placeholder="Please enter 1 - 20 characters"
              prepend={
                <button type="button">
                  <FacebookIcon size={16} className="text-teal-600" />
                </button>
              }
            />
          )}
        </form.Field>

        {/* Google Field */}
        <form.Field name="google">
          {(field) => (
            <AppField
              label="Google"
              field={field}
              type="text"
              placeholder="Please select Google"
              prepend={
                <button type="button">
                  <Globe size={16} className="text-teal-600" />
                </button>
              }
            />
          )}
        </form.Field>

        {/* WhatsApp Field */}
        <form.Field name="whatsapp">
          {(field) => (
            <AppField
              label="WhatsApp"
              field={field}
              type="text"
              placeholder="Please enter 1 - 20 characters"
              prepend={
                <button type="button">
                  <MessageSquare size={16} className="text-teal-600" />
                </button>
              }
            />
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field name="email">
          {(field) => (
            <AppField
              label="Email"
              field={field}
              type="email"
              placeholder="Please enter 1 - 255 characters"
              prepend={
                <button type="button">
                  <Mail size={16} className="text-teal-600" />
                </button>
              }
            />
          )}
        </form.Field>

        {/* Phone Number Field */}
        <form.Field name="phoneNumber">
          {(field) => (
            <AppField
              label="Phone Number"
              field={field}
              type="number"
              placeholder="Phone number"
              prepend={
                <button type="button">
                  <Phone size={16} className="text-teal-600" />
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
