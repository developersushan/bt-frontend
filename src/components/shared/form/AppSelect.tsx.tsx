import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Option {
  label: string;
  value: string;
}

interface AppSelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  field?: {
    state: {
      value: any;
      meta?: {
        isTouched?: boolean;
        errors?: any;
      };
    };
    handleChange: (val: any) => void;
  };
  value?: string;
  onValueChange?: (val: string) => void;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  options,
  placeholder = "Select option",
  className = "",
  field,
  value,
  onValueChange,
}) => {
  const currentValue = field ? field.state.value : value;

  const handleChange = (val: string) => {
    if (field) {
      field.handleChange(val);
    }
    if (onValueChange) {
      onValueChange(val);
    }
  };

  const errors = field?.state?.meta?.errors || [];
  const isTouched = field?.state?.meta?.isTouched;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <Label>{label}</Label>}

      <Select
        value={currentValue || ""}
        onValueChange={(val) => {
          if (val !== null) {
            handleChange(val);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isTouched && errors.length > 0 && (
        <p className="text-xs text-red-500">{errors.join(", ")}</p>
      )}
    </div>
  );
};
