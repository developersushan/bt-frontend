import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface AppSubmitButtonProps {
  isPending: boolean;
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  disable: boolean;
}

const AppSubmitButton = ({
  isPending,
  children,
  disable,
  className,
  pendingLabel = "submitting",
}: AppSubmitButtonProps) => {
  const isDisabled = disable || isPending;
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn("w-full", className)}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden={true} />
          {pendingLabel ? pendingLabel : children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default AppSubmitButton;