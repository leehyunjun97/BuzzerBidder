import ProductInfo from "@/components/product/ProductInfo";
import { getMeServer } from "@/features/auth/api/auth.server.api";
import { getDelayProduct } from "@/features/product/api/product.server.api";
import ReactDOM from "react-dom";

export default async function DelayProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  ReactDOM.preconnect("https://web7-9-devut.s3.ap-northeast-2.amazonaws.com");

  const initialDelayProduct = await getDelayProduct(Number(productId));
  const me = await getMeServer();

  return <ProductInfo initialProduct={initialDelayProduct} me={me} />;
}
