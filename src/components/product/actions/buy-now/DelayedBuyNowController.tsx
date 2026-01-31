"use client";

import { useBuyNowDelayProduct } from "@/features/auction/hooks/useBuyNowDelayProduct";
import { useGetMyBizz } from "@/features/mypage/hooks/useMyBizz";
import Toast from "../../../common/overlay/Toast";
import { BuyNowSectionModal } from "./BuyNowSectionModal";

interface DelayedBuyNowControllerProps {
  me: User | null;
  productId: number;
  buyNowPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function DelayedBuyNowController({
  me,
  productId,
  buyNowPrice,
  isOpen,
  onClose,
}: DelayedBuyNowControllerProps) {
  const { data: myBizz, isLoading: isBizzLoading } = useGetMyBizz();
  const { mutate: buyNow, isPending } = useBuyNowDelayProduct(productId);

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const handleConfirmBuyNow = () => {
    if (!me) {
      notify("로그인이 필요합니다.", "ERROR");
      return;
    }

    if (isBizzLoading || myBizz == null) {
      notify("보유 Bizz 정보를 불러오는 중입니다.", "ERROR");
      return;
    }

    if (myBizz < buyNowPrice) {
      notify("보유 Bizz가 부족합니다.", "ERROR");
      return;
    }

    buyNow(undefined, {
      onSuccess: () => {
        notify("구매를 성공하였습니다!", "SUCCESS");
        onClose();
      },
      onError: (error: unknown) => {
        const { msg } = error as ResponseBase;
        notify(msg ?? "구매에 실패했습니다.", "ERROR");
      },
    });
  };

  return (
    <BuyNowSectionModal
      isOpen={isOpen}
      price={buyNowPrice}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirmBuyNow}
    />
  );
}
