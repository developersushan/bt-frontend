import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* eslint-disable @typescript-eslint/no-explicit-any */

type Option = {
  label: string;
  value: string;
};

type Props = {
  field: any;
  label: string;
  options: Option[];
};

export default function AppSelect({ field, label, options }: Props) {
  return (
    <div className="space-y-1">
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