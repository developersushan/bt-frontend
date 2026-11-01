"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LowBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeposit: () => void;
}

export function LowBalanceDialog({
  open,
  onOpenChange,
  onDeposit,
}: LowBalanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-emerald-900/60 bg-[#062422] p-4 text-white sm:max-w-md">
        <DialogHeader className="pt-2">
          <DialogTitle className="text-xl font-bold text-yellow-400">
            পর্যাপ্ত ব্যালেন্স নেই!
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-emerald-200/80">
            গেমটি চালু করতে আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই। দয়া করে
            অ্যাকাউন্টে ব্যালেন্স যোগ করুন।
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="-mx-6 -mb-6 mt-4 flex gap-2 rounded-b-lg border-t border-emerald-900/50 bg-[#031412] p-4 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-emerald-800 bg-transparent text-emerald-200"
          >
            বাতিল
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onDeposit();
            }}
            className="bg-yellow-500 font-bold text-slate-950 hover:bg-yellow-600"
          >
            ডিপোজিট করুন
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
