import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSocketStore } from "./store/useSocketStore";
import { useDMSocketStore } from "./store/useDMSocketStore";
import { useLiveRoomStore } from "../auction/store/useLiveRoomStore";

let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(process.env.NEXT_PUBLIC_WS_URL!),
  reconnectDelay: 3000,
  heartbeatIncoming: 3000,
  heartbeatOutgoing: 3000,

  onConnect: () => {
    const { subscribedAuctionIds } = useLiveRoomStore.getState();
    useSocketStore.getState().clearSubscriptions?.();

    if (subscribedAuctionIds.length > 0) {
      useSocketStore.getState().rejoinRooms(subscribedAuctionIds);
    }

    const { subscriptions: dmSubs } = useDMSocketStore.getState();
    Object.keys(dmSubs).forEach(itemId => {
      useDMSocketStore.getState().subscribeDM(Number(itemId));
    });

    useSocketStore.getState().setConnected();
  },

  onWebSocketClose: () => {
    if (!stompClient.active) {
      return;
    }

    reconnectAttempts++;
    if (reconnectAttempts > MAX_RECONNECT_ATTEMPTS) {
      useSocketStore.getState().setError();
      stompClient.deactivate();
    } else {
      useSocketStore.getState().setReconnecting();
    }
  },

  onStompError: frame => {
    console.error("[STOMP] Broker error", frame);
    useSocketStore.getState().setError();
  },
});
