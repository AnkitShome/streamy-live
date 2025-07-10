import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import socket from "@/lib/socket";


export interface ChatMessage {
   id: string;
   userId: string;
   username: string;
   content: string;
   createdAt: string;
}


export interface BanEvent {
   reason?: string;
   expiresAt?: string;
}

export const useSocketChat = (roomId: string, userId: string, username: string) => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [banned, setBanned] = useState<BanEvent | null>(null);
   const isJoined = useRef(false);

   useEffect(() => {
      if (!roomId || !userId || !username) return;

      if (!isJoined.current) {
         socket.emit("joinChatRoom", { roomId, userId });
         isJoined.current = true
      }

      socket.on("chatMessage", (msg: ChatMessage) => {
         setMessages((prev) => [msg, ...prev]);
      })

      socket.on("deleteMessage", (id: string) => {
         setMessages((prev) => prev.filter((m) => m.id !== id))
      })

      socket.on("banned", (event: BanEvent) => {
         setBanned(event)
         toast.error(`You’ve been banned: ${event.reason ?? ""}`)
      })

      return () => {
         socket.off("chatMessage");
         socket.off("deleteMessage");
         socket.off("banned");
      }
   }, [roomId, userId, username])

   const send = (content: string) => {
      if (banned) return;
      socket.emit("chatMessage", { roomId, userId, username, content })
   }

   const banUser = (banUserId: string, durationMins?: number, reason?: string) => {
      //only host/mod can call
      socket.emit("banUser", {
         roomId,
         userId: banUserId,
         bannedBy: userId,
         reason,
         durationMins
      })
   }

   const deleteMessage = (messageId: string) => {
      socket.emit("deleteMessage", {
         roomId,
         messageId,
         userId
      })
   }

   return { messages, send, banned, banUser, deleteMessage }
}