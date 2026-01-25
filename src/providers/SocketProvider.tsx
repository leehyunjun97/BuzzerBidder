"use client";

import { useEffect } from "react";
import { stompClient } from "@/features/socket/stompClient";
import { useSocketStore } from "@/features/socket/store/useSocketStore";
import { onlineManager, useQueryClient } from "@tanstack/react-query";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const store = useSocketStore.getState();

    stompClient.activate();

    const handleOffline = () => {
      store.setReconnecting();
      stompClient.deactivate();
      onlineManager.setOnline(false);
    };

    const handleOnline = () => {
      onlineManager.setOnline(true);

      if (!stompClient.active) {
        stompClient.activate();
        setTimeout(() => {
          queryClient.invalidateQueries();
        }, 1000);
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);

      store.setDisconnected();
      void stompClient.deactivate();
    };
  }, [queryClient]);

  return <>{children}</>;
}
