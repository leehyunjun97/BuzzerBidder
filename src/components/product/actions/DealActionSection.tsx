"use client";

import { useState } from "react";
import Button from "../../common/ui/Button";
import { getDelayStatus } from "@/utils/auction";
import DelayedBuyNowSection from "./buy-now/DelayedBuyNowSection";
import DelayedBidSection from "./bid/DelayedBidSection";

type DealMode = "NONE" | "BID" | "BUY_NOW";

interface DealActionSectionProps {
  product: ProductDetail;
  me: User | null;
}

export default function DealActionSection({ product, me }: DealActionSectionProps) {
  const [mode, setMode] = useState<DealMode>("NONE");

  if (getDelayStatus(product.auctionStatus) !== "ONGOING") {
    return <Button className="bg-custom-brown/50 flex-1 text-white">마감</Button>;
  }

  return (
    <>
      {product.type === "DELAYED" && (
        <>
          <DelayedBidSection
            me={me}
            productId={product.id}
            currentBid={product.currentPrice}
            isOpen={mode === "BID"}
            onOpen={() => setMode("BID")}
            onClose={() => setMode("NONE")}
          />

          <DelayedBuyNowSection
            me={me}
            productId={product.id}
            buyNowPrice={product.buyNowPrice}
            isOpen={mode === "BUY_NOW"}
            onOpen={() => setMode("BUY_NOW")}
            onClose={() => setMode("NONE")}
          />
        </>
      )}
    </>
  );
}
