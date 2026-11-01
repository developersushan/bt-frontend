/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  GameCardContainer,
  GameCardFooter,
  GameCardMedia,
  GameCardPlayOverlay,
} from "../ui/game-card-design";
import { IGame } from "@/types/game.types";
import { getSingleGame } from "@/services/games.service";
import { useModalStore, useProfileStore } from "@/lib/useModalStore";
import Image from "next/image";
import { useUser } from "@/providers/UserProvider";
import { LowBalanceDialog } from "@/components/shared/LowBalanceDialog";
export function GameCard({
  game,
  onLowBalance,
  isLoggedIn,
}: {
  game: IGame;
  onLowBalance?: () => void;
  isLoggedIn?: boolean;
}) {
  const userInfo = useUser();
  const { setActiveModal } = useModalStore();
  const { setActiveTab, setProfileModalOpen } = useProfileStore();
  const router = useRouter();
  const [showLowBalanceModal, setShowLowBalanceModal] = useState(false);
  const [showGamePreview, setShowGamePreview] = useState(false);
  const pendingPlayRef = useRef<number | null>(null);

  const openLowBalanceModal = () => {
    if (onLowBalance) {
      onLowBalance();
      return;
    }

    setShowLowBalanceModal(true);
  };

  const getResponseText = (value: unknown) =>
    typeof value === "string"
      ? value
      : JSON.stringify(value ?? {}).replace(/[{}[\]",]/g, " ");

  const { mutate: fetchSingleGame } = useMutation({
    mutationFn: (id: number) => getSingleGame(id),
    onSuccess: (data: any) => {
      const launchUrl = data?.launch_url || data?.data?.launch_url;

      if (launchUrl) {
        router.push(launchUrl);
      } else if (!launchUrl) {
        openLowBalanceModal();
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "";
      const serializedError = getResponseText(error).toLowerCase();

      if (
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("unauthenticated") ||
        errorMessage.includes("401")
      ) {
        pendingPlayRef.current = game.id;
        setActiveModal("login");
      } else if (
        `${errorMessage} ${getResponseText(error)}`.includes(
          "পর্যাপ্ত ব্যালেন্স নেই",
        ) ||
        /insufficient balance|insufficient fund|not enough balance|low balance|wallet balance/i.test(
          getResponseText(error),
        ) ||
        error?.statusCode >= 500 ||
        serializedError.includes("statuscode") ||
        serializedError.includes("api server error")
      ) {
        openLowBalanceModal();
      } else {
        alert(errorMessage || "একটি এরর ঘটেছে!");
      }
    },
  });

  useEffect(() => {
    const authenticated =
      isLoggedIn !== undefined ? isLoggedIn : userInfo != null;

    if (authenticated) {
      setActiveModal(null);

      if (pendingPlayRef.current === game.id) {
        const gameIdToPlay = pendingPlayRef.current;
        pendingPlayRef.current = null;
        fetchSingleGame(gameIdToPlay);
      }
    } else {
      pendingPlayRef.current = null;
    }
  }, [userInfo, isLoggedIn, game.id, fetchSingleGame, setActiveModal]);

  const handlePlayGame = (gameId: number) => {
    const authenticated =
      isLoggedIn !== undefined ? isLoggedIn : userInfo != null;

    if (!authenticated) {
      pendingPlayRef.current = gameId;
      setActiveModal("login");
      return;
    }

    fetchSingleGame(gameId);
  };

  const handleCardClick = () => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      setShowGamePreview(true);
    }
  };

  return (
    <>
      <GameCardContainer onClick={handleCardClick}>
        <GameCardMedia src={game.thumbnail} alt={game.name}>
          <GameCardPlayOverlay
            isFreeTrial={game.is_featured}
            onPlay={() => handlePlayGame(game.id)}
            onTrial={() => handlePlayGame(game.id)}
          />
        </GameCardMedia>
        <GameCardFooter title={game.name} provider={game.provider_name} />
      </GameCardContainer>

      {/* মোবাইল প্রিভিউ মোডাল */}
      <Dialog open={showGamePreview} onOpenChange={setShowGamePreview}>
        <DialogContent className="w-[min(92vw,420px)] overflow-hidden border-teal-500/40 bg-[#062422] p-0 text-white sm:hidden">
          <div className="relative aspect-4/5 w-full bg-black">
            <Image
              src={game.thumbnail}
              alt={game.name}
              width={400}
              height={500}
              quality={100}
              priority
              sizes="(max-width: 640px) 92vw, 400px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-linear-to-t from-black via-black/80 to-transparent px-4 pb-5 pt-16">
              <div className="w-full text-center">
                <h3 className="truncate text-base font-bold text-white">
                  {game.name}
                </h3>
                {game.provider_name && (
                  <p className="text-xs uppercase text-teal-300">
                    {game.provider_name}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowGamePreview(false);
                  handlePlayGame(game.id);
                }}
                className="w-full max-w-52 rounded-full bg-teal-foreground py-3 text-sm font-black uppercase tracking-wider text-[#022421] shadow-[0_0_16px_#00ffc4] cursor-pointer"
              >
                Play Now
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {!onLowBalance && (
        <LowBalanceDialog
          open={showLowBalanceModal}
          onOpenChange={setShowLowBalanceModal}
          onDeposit={() => {
            setActiveTab("deposit");
            setProfileModalOpen(true);
          }}
        />
      )}
    </>
  );
}
