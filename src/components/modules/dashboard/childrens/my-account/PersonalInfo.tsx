/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Save,
  ShieldCheck,
} from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import { useForm } from "@tanstack/react-form";
import { FacebookIcon } from "@/icons/svg";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { profileUpdateAction } from "@/services/auth.service";
import { updateProfile, UpdateProfilePayload } from "@/zod/auth.validation";

const initialize: UpdateProfilePayload = {
  withdrawer_name: "",
  nickname: "",
  facebook_id: "",
  google_id: "",
  whatsapp: "",
  email: "",
  phone: "",
};
export function PersonalInfoForm() {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["personal-info"],
    mutationFn: (payload: UpdateProfilePayload) => profileUpdateAction(payload),
  });
  const form = useForm({
    defaultValues: initialize,
    validators: {
      onChange: updateProfile,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const toastId = toast.loading("Updating profile...");

      try {
        const result = await mutateAsync(value);

        if (result.status !== "success") {
          toast.error(result.message || "Failed to update profile", {
            id: toastId,
          });
          return;
        }

        toast.success(result.message || "Profile updated successfully!", {
          id: toastId,
        });
        form.reset();
      } catch (err: any) {
        console.log(err);
        const errorMessage =
          err?.response?.data?.body?.message ||
          err?.message ||
          "An error occurred while updating profile";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });
  return (
    <div className="md:p-5">
      <div className="w-full max-w-xl mx-auto p-5 sm:p-7 md:h-auto h-screen bg-white md:rounded-2xl shadow-xl font-sans select-none text-slate-800 border border-slate-100">
        {/* 🔹 Header Section */}
        <div className="flex sm:flex-row flex-col items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-teal-600 rounded-full" />
            <h2 className="md:text-lg text-base font-bold text-slate-800 tracking-wide">
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
            void form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Withdrawer Name Field */}
          <form.Field name="withdrawer_name">
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

          {/* nickname Field */}
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
          <form.Field name="facebook_id">
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

          {/* google_id Field */}
          <form.Field name="google_id">
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

          {/* whatsapp Field */}
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
          <form.Field name="phone">
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
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Updating..."
                  disabled={!canSubmit}
                  className="px-6 py-2.5 w-35 h-9  bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Save size={15} />
                  Save Changes
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
