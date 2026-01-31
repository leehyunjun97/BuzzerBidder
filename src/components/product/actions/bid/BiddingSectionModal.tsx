"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getBidUnit } from "@/utils/auction";
import PriceInput from "@/components/common/ui/PriceInput";
import Button from "@/components/common/ui/Button";
import { ConfirmModal } from "@/components/common/overlay/ComfirmModal";

interface BiddingSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBid: number;
  onConfirm: (price: number) => void;
  isPending: boolean;
}

export function BiddingSectionModal({
  isOpen,
  onClose,
  currentBid,
  onConfirm,
  isPending,
}: BiddingSectionModalProps) {
  const unit = getBidUnit(currentBid);
  const minBid = currentBid + unit;

  const [bidPrice, setBidPrice] = useState(minBid);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    setBidPrice(minBid);
  }, [minBid]);

  if (!isOpen) return null;

  return (
    <div className="border-border-sub fixed inset-x-0 bottom-0 z-50 border-t bg-white px-6 pt-2 pb-8 shadow-lg">
      <div className="flex justify-center">
        <button
          className="flex items-center justify-center text-gray-500 hover:text-gray-700"
          onClick={isPending ? undefined : onClose}
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-5">
        <h2 className="text-title-main text-lg">입찰하기</h2>
        <div className="space-y-1">
          <p className="text-title-sub2 text-sm">현재 최고가: {currentBid.toLocaleString()} Bizz</p>
          <p className="text-title-sub2 text-sm">호가 단위: {unit.toLocaleString()} Bizz</p>
        </div>

        <PriceInput
          placeholder="최고가 이상으로 입찰해주세요."
          value={bidPrice}
          onChange={setBidPrice}
        />

        <Button
          className="bg-custom-orange w-full py-2 text-white disabled:bg-gray-300"
          disabled={bidPrice < minBid || isPending}
          onClick={() => setIsConfirmOpen(true)}
        >
          {isPending ? "입찰 중..." : "입찰 확정"}
        </Button>

        <ConfirmModal
          isOpen={isConfirmOpen}
          title="입찰 확인"
          message={`정말 ${bidPrice.toLocaleString()} Bizz으로 입찰하시겠습니까?`}
          confirmText="입찰"
          cancelText="취소"
          onConfirm={() => {
            onConfirm(bidPrice);
            setIsConfirmOpen(false);
          }}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </div>
    </div>
  );
}
