import PageTabArea from "@/components/common/layout/PageTabArea";
import { mypageItems } from "@/constants/route/mypage";

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageTabArea items={mypageItems} />
      {children}
    </div>
  );
}
