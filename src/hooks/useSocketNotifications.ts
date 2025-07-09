import { useEffect } from "react";
import socket from "@/lib/socket";
import { toast } from "sonner";
import { useStreamStore } from "@/store/stream-store";

export const useSocketNotifications = (userId: string) => {

   const addLiveUser = useStreamStore((state) => state.addLiveUser)

   useEffect(() => {
      if (!userId) return;

      socket.emit("join", userId)
      console.log("🛜 [Socket] Joined room:", userId);

      socket.on("stream-started", (data) => {

         console.log("✅ [Frontend] Received socket notification:", data);
         toast(`${data.username} just went live`)
         addLiveUser(data.userId)
      });

      return () => {
         socket.off("stream-started")
      }
   }, [userId])
}