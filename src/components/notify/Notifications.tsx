"use client";

import { notifyGroupByDate } from "@/utils/notify";
import MileStoneSemiTitle from "../common/MileStoneSemiTitle";
import { useNotificatoins } from "@/features/notify/hooks/useNotifications";
import { useNotificationStore } from "@/features/notify/store/useNotification";
import { useEffect } from "react";
import NotificationItem from "./NotificationItem";
import { useQueryClient } from "@tanstack/react-query";
import { se } from "date-fns/locale";

interface NotifyListProps {
  notifications: NotificationItem<NotificationType>[];
}

export default function Notifications({ notifications }: NotifyListProps) {
  const { data } = useNotificatoins(notifications);
  const { resetUnread, unreadCount, lastSeenAt, setLastSeenAt } = useNotificationStore(
    state => state
  );
  const { group, sortedKeys } = notifyGroupByDate(data);
  const queryClient = useQueryClient();

  useEffect(() => {
    resetUnread();
    setLastSeenAt(Date.now());
  }, [resetUnread, setLastSeenAt]);

  const handleNewNotifyClick = () => {
    resetUnread();
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return (
    <div className="relative">
      {!!unreadCount && (
        <div
          onClick={handleNewNotifyClick}
          className="bg-content-area text-custom-red z-10 mb-4 ml-6 flex w-[98%] cursor-pointer items-center justify-center rounded-md py-2 shadow hover:underline"
        >
          🔴 새로운 알림이 왔습니다!
        </div>
      )}
      <div className="relative min-h-screen">
        {sortedKeys.length > 0 ? (
          <>
            <div className="bg-border-main absolute top-0 left-7 h-full w-[3px]" />
            {sortedKeys.map((dateKey, index) => (
              <div key={dateKey} className="mb-12">
                <MileStoneSemiTitle title={dateKey} className="mb-8 ml-2" />

                {group[dateKey].map(notify => {
                  const isNew = lastSeenAt !== null && Date.parse(notify.createDate) > lastSeenAt;
                  return <NotificationItem key={notify.id} notify={notify} isNew={isNew} />;
                })}

                {index !== sortedKeys.length - 1 && (
                  <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="text-title-sub2 flex h-[60vh] items-center justify-center text-sm">
            알림이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
