"use client";

import Button from "@/components/common/ui/Button";
import { useSocketStore } from "@/features/socket/store/useSocketStore";

export default function NetworkOverlay() {
  const status = useSocketStore(state => state.status);

  if (status === "connected" || status === "idle") return null;

  if (status === "reconnecting" || status === "connecting") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
        <div className="bg-content-area flex flex-col items-center gap-4 rounded-xl p-6 shadow-2xl">
          <div className="border-t-custom-orange h-10 w-10 animate-spin rounded-full border-4 border-gray-300" />
          <div className="text-center">
            <h3 className="text-title-main-dark text-lg font-bold">연결 재시도 중...</h3>
            <p className="text-sm text-gray-500">잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error" || status === "disconnected") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-all">
        <div className="bg-content-area flex max-w-sm flex-col items-center gap-4 rounded-xl p-8 text-center shadow-2xl">
          <div className="text-4xl">🔌</div>
          <div>
            <h3 className="text-title-main-dark text-xl font-bold">네트워크 연결 끊김</h3>
            <p className="mt-2 text-sm break-keep text-gray-600">
              서버와의 연결이 끊어졌습니다. <br />
              인터넷 상태를 확인하거나 새로고침 해주세요.
            </p>
          </div>

          <Button
            onClick={() => window.location.reload()}
            className="mt-2 w-full rounded-lg px-4 py-3 font-bold transition-colors"
          >
            새로고침
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
