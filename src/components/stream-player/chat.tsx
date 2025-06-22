"use client"

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { useMemo, useEffect, useState } from "react";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";


interface ChatProps {
   hostName: string;
   hostIdentity: string;
   viewerName: string;
   isFollowing: boolean;
   isChatEnabled: boolean;
   isChatDelayed: boolean;
   isChatFollowersOnly: boolean;
}

export const Chat = ({
   hostName,
   hostIdentity,
   viewerName,
   isFollowing,
   isChatEnabled,
   isChatDelayed,
   isChatFollowersOnly,
}: ChatProps) => {

   const { variant, onExpand } = useChatSidebar((state) => state)
   const connectionState = useConnectionState();
   const participant = useRemoteParticipant(hostIdentity)


   const isOnline = participant && connectionState === 'connected';

   const isHidden = !isChatEnabled || !isOnline

   console.log("Hidden ", isHidden)

   const [value, setValue] = useState("");

   const { chatMessages: messages, send } = useChat();

   const reversedMessages = useMemo(() => {
      return messages.sort((a, b) => b.timestamp - a.timestamp)
   }, [messages])

   const onSubmit = () => {
      if (!send) return;

      send(value);
      setValue("");
   }

   const onChange = (value: string) => {
      setValue(value)
   }

   return (
      <div className="flex flex-col bg-slate-900/100 border-b pt-0 h-[calc(100vh-80px)]">
         <ChatList
            messages={reversedMessages}
            isHidden={isHidden}
         />
         <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
         />
         Chat

      </div>
   )
}     