import { useEffect } from "react";
import socket from "@/lib/socket";
import { toast } from "sonner";
import { useStreamStore } from "@/store/stream-store";

export const useSocketNotifications = (userId: string) => {

   const addLiveUser = useStreamStore((state) => state.addLiveUser)
   const removeLiveUser = useStreamStore((state) => state.removeLiveUser)

   useEffect(() => {
      if (!userId) return;

      socket.emit("joinNotificationRoom", userId)
      console.log("🛜 [Socket] Joined room:", userId);

      socket.on("stream-started", (data) => {
         console.log("✅ [Frontend] Received socket notification:", data);
         toast(`${data.username} just went live`)
         addLiveUser(data.userId)
      });

      socket.on("stream-ended", (data) => {
         console.log("✅ [Frontend] Received socket notification:", data)
         toast(`You stopped the stream`)
         removeLiveUser(data.userId)
      })

      return () => {
         socket.off("stream-started")
         socket.off("stream-ended")
      }
   }, [userId])
}