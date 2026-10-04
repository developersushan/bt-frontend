import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";

const getErrorMessage = (error: unknown) => {
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }
  return String(error);
};

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  appendClassName?: string;
  disabled?: boolean;
};

const AppField = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  inputClassName,
  className,
  appendClassName,
  disabled = false,
}: AppFieldProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;
  const hasError = firstError !== null;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn(hasError && "text-destructive")}
      >
        {label}
      </Label>
      <div className="relative">
        {prepend && (
          <div className="absolute top-2.5 left-0 pl-3 z-10">
            {prepend}
          </div>
        )}

        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
          className={cn(
            prepend && "pl-10",
            append && "pr-10",
            inputClassName,
            hasError && "border-destructive focus-visible:ring-destructive/20",
          )}
        />

        {append && (
          <div className={cn("absolute inset-y-0 right-0 pr-3 z-20",appendClassName)}>{append}</div>
        )}

        {hasError && (
          <p
            id={`${field.name}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {firstError}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppField;
