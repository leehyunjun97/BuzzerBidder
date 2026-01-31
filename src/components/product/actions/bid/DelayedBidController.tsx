"use client";

import { useMemo } from "react";
import { useBidDelayProduct } from "@/features/auction/hooks/useBidDelayProduct";
import { useGetMyBizz } from "@/features/mypage/hooks/useMyBizz";
import { BiddingSectionModal } from "./BiddingSectionModal";
import { getBidUnit } from "@/utils/auction";
import Toast from "@/components/common/overlay/Toast";

interface DelayedBidControllerProps {
  me: User | null;
  productId: number;
  currentBid: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function DelayedBidController({
  me,
  productId,
  currentBid,
  isOpen,
  onClose,
}: DelayedBidControllerProps) {
  const { data: myBizz, isLoading: isBizzLoading } = useGetMyBizz();
  const { mutate: bid, isPending } = useBidDelayProduct(productId);

  const unit = useMemo(() => getBidUnit(currentBid), [currentBid]);
  const minBid = currentBid + unit;

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const handleConfirmBid = (price: number) => {
    if (!me) {
      notify("로그인이 필요합니다.", "ERROR");
      return;
    }

    if (isBizzLoading || myBizz == null) {
      notify("보유 Bizz 정보를 불러오는 중입니다.", "ERROR");
      return;
    }

    if (price < minBid) {
      notify(`최소 입찰가는 ${minBid.toLocaleString()} Bizz 입니다.`, "ERROR");
      return;
    }

    if (myBizz < price) {
      notify("보유 Bizz가 부족합니다.", "ERROR");
      return;
    }

    bid(
      { bidPrice: price },
      {
        onSuccess: () => {
          notify("입찰을 성공하였습니다!", "SUCCESS");
          onClose();
        },
        onError: (error: unknown) => {
          const { msg } = error as ResponseBase;
          notify(msg ?? "입찰에 실패했습니다.", "ERROR");
        },
      }
    );
  };

  return (
    <BiddingSectionModal
      isOpen={isOpen}
      currentBid={currentBid}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirmBid}
    />
  );
}
