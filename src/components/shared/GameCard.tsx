/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  GameCardContainer,
  GameCardFooter,
  GameCardMedia,
  GameCardPlayOverlay,
} from "../ui/game-card-design";
import { IGame } from "@/types/game.types";
import { getSingleGame } from "@/services/games.service";

export function GameCard({ game }: { game: IGame }) {
  const router = useRouter();
  const [showLowBalanceModal, setShowLowBalanceModal] = useState(false);

  const { mutate: fetchSingleGame } = useMutation({
    mutationFn: (id: string | number) => getSingleGame(id as number),
    onSuccess: (data: any) => {
      router.push(data.launch_url);
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "";

      if (errorMessage.includes("পর্যাপ্ত ব্যালেন্স নেই")) {
        setShowLowBalanceModal(true);
      } else {
        alert(errorMessage || "একটি এরর ঘটেছে!");
      }
    },
  });

  return (
    <>
      <GameCardContainer>
        <GameCardMedia src={game.thumbnail} alt={game.name}>
          <GameCardPlayOverlay
            isFreeTrial={game.is_featured}
            onPlay={() => fetchSingleGame(game.id)}
            onTrial={() => fetchSingleGame(game.id)}
          />
        </GameCardMedia>
        <GameCardFooter title={game.name} provider={game.provider_name} />
      </GameCardContainer>

      <Dialog open={showLowBalanceModal} onOpenChange={setShowLowBalanceModal}>
        <DialogContent className="sm:max-w-md bg-[#062422] text-white border-emerald-900/60 overflow-hidden">
          <DialogHeader className="pt-2">
            <DialogTitle className="text-xl font-bold text-yellow-400">
              পর্যাপ্ত ব্যালেন্স নেই!
            </DialogTitle>
            <DialogDescription className="text-emerald-200/80 text-sm mt-1">
              গেমটি চালু করতে আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই। দয়া করে
              অ্যাকাউন্টে ব্যালেন্স যোগ করুন।
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="bg-[#031412] -mx-6 -mb-6 p-4 rounded-b-lg border-t border-emerald-900/50 flex gap-2 sm:justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setShowLowBalanceModal(false)}
              className="border-emerald-800 text-emerald-200 hover:bg-emerald-900/40 hover:text-white bg-transparent"
            >
              বাতিল
            </Button>
            <Button
              onClick={() => {
                setShowLowBalanceModal(false);
                router.push("/deposit");
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold"
            >
              ডিপোজিট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
