import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

/* eslint-disable @typescript-eslint/no-explicit-any */

type Option = {
  label: string;
  value: string;
};

type Props = {
  clasName?: string;
  field: any;
  label: string;
  options: Option[];
};

export default function AppSelect({ field, label, options, clasName }: Props) {
  return (
    <div className={cn("space-y-1", clasName)}>
      <Label>{label}</Label>
      <Select
        value={field.state.value || ""}
        onValueChange={(value) => field.handleChange(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select  ${label}`} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
