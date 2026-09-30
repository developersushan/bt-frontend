/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { EyeOff, Eye, Phone, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import GooleFacebookButton from "./GooleFacebookButton";
interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}
const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: registerZodSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Card className="bg-primary-cyan border border-[#0e5c55] text-white shadow-2xl rounded-2xl overflow-hidden max-w-sm w-full">
      <CardHeader className="text-left pb-2">
        {/* Title in Bright Yellow */}
        <CardTitle className="text-2xl font-black text-[#ffcc00] tracking-wide">
          Register
        </CardTitle>
        <CardDescription className="text-xs text-emerald-100/70 pt-1 flex items-center gap-1.5">
          <span>Already have an account ?</span>

          <button
            onClick={onSwitchToLogin}
            className="text-teal-foreground hover:text-[#00ffaa] font-semibold hover:underline"
          >
            Login
          </button>
        </CardDescription>
      </CardHeader>

      <CardContent>
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
          {/* Email Field */}
          <form.Field name="phoneNumber">
            {(field) => (
              <AppField
                label="Phone Number"
                inputClassName="bg-[#022421] border-[#0c4e48] text-white placeholder:text-teal-200/40 focus:border-teal-foreground "
                field={field}
                type="number"
                placeholder="Phone number"
                prepend={
                  <button>
                    <Phone size={16} className="text-emerald-300" />
                  </button>
                }
              />
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => (
              <AppField
                label="Password"
                inputClassName="bg-[#022421] border-[#0c4e48] text-white placeholder:text-teal-200/40 focus:border-teal-foreground "
                field={field}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                prepend={
                  <button>
                    <LockKeyhole size={16} className="text-emerald-300" />
                  </button>
                }
                append={
                  <Button
                    type="button"
                    size="icon"
                    variant={"ghost"}
                    className="hover:bg-transparent text-emerald-300 hover:text-teal-foreground"
                    onClick={() => setShowPassword((prev: boolean) => !prev)}
                  >
                    {showPassword ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => (
              <AppField
                label="Confirm Password"
                inputClassName="bg-[#022421] border-[#0c4e48] text-white placeholder:text-teal-200/40 focus:border-teal-foreground "
                field={field}
                type={confirmShowPassword ? "text" : "password"}
                placeholder="Confirm password"
                prepend={
                  <button>
                    <LockKeyhole size={16} className="text-emerald-300" />
                  </button>
                }
                append={
                  <Button
                    type="button"
                    size="icon"
                    variant={"ghost"}
                    className="hover:bg-transparent text-emerald-300 hover:text-teal-foreground"
                    onClick={() =>
                      setConfirmShowPassword((prev: boolean) => !prev)
                    }
                  >
                    {confirmShowPassword ? (
                      <Eye className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-4" aria-hidden="true" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between mt-2 text-xs">
            <label className="flex items-center gap-1.5 text-emerald-100/80 cursor-pointer">
              <Checkbox
                id="terms-checkbox-2"
                name="terms-checkbox-2"
                defaultChecked
              />
              Remember
            </label>
            <Link
              href="/forgot-password"
              className="text-[#ffcc00] hover:underline underline-offset-4 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Yellow Primary Login Button */}
          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting}
                pendingLabel="Logging In..."
                disable={!canSubmit}
                className="w-full py-2.5 font-bold text-black bg-[#FFD600] hover:bg-[#FFD600]/90 rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
              >
                Login
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>

        {/* Divider */}
        <div className="relative my-5 text-center text-xs text-teal-200/50">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#0d5952]"></div>
          </div>
          <span className="relative bg-primary-cyan px-3">or connect with</span>
        </div>

        {/* Social Buttons */}
        <GooleFacebookButton />
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
