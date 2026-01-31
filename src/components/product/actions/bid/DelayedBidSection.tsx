import Button from "@/components/common/ui/Button";
import DelayedBidController from "./DelayedBidController";

interface DelayedBidSectionProps {
  me: User | null;
  productId: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentBid: number;
}

export default function DelayedBidSection({
  me,
  productId,
  isOpen,
  onOpen,
  onClose,
  currentBid,
}: DelayedBidSectionProps) {
  return (
    <>
      <DelayedBidController
        me={me}
        productId={productId}
        currentBid={currentBid}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Button className="bg-custom-brown flex-1 text-white" onClick={onOpen}>
        입찰하기
      </Button>
    </>
  );
}
