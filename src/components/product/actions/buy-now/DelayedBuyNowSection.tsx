import Button from "../../../common/ui/Button";
import DelayedBuyNowController from "./DelayedBuyNowController";

interface DelayedBuyNowSectionProps {
  me: User | null;
  productId: number;
  buyNowPrice: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function DelayedBuyNowSection({
  me,
  productId,
  buyNowPrice,
  isOpen,
  onOpen,
  onClose,
}: DelayedBuyNowSectionProps) {
  return (
    <>
      <Button className="bg-custom-dark-brown border-border-sub flex-1 text-white" onClick={onOpen}>
        즉시 구매
      </Button>

      <DelayedBuyNowController
        me={me}
        productId={productId}
        buyNowPrice={buyNowPrice}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
