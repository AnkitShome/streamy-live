import { useSocketChat } from "@/hooks/useSocketChat"
import { getSelf } from "@/lib/user-actions"
import { ChatList } from "./chat-list"
import { ChatForm } from "./chat-form"
import { redirect } from "next/navigation"


interface ChatProps {
   // roomId: string,
   hostName: string;
   hostIdentity: string;    //userId or streamId
   viewerId: string;
   viewerName: string;
   isFollowing: boolean;
   isChatEnabled: boolean;
   isChatFollowersOnly: boolean;
   isChatDelayed: boolean
}

export default function Chat({
   // roomId,
   hostIdentity,
   viewerId,
   viewerName,
   hostName,
   isFollowing,
   isChatEnabled,
   isChatFollowersOnly,
   isChatDelayed
}: ChatProps) {

   const { messages, send, banned, banUser, deleteMessage } = useSocketChat(hostIdentity, viewerId, viewerName)

   return (
      <div className="flex flex-col h-full">
         <ChatList
            messages={messages}
            currentUserId={viewerId}
            onBanUser={banUser}
            onDeleteMessage={deleteMessage}
            hostIdentity={hostIdentity}
         />
         <ChatForm onSend={send} disabled={!!banned} banned={banned} />
      </div>
   );

}












// "use client"

// import { useChatSidebar } from "@/store/use-chat-sidebar";
// import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
// import { useMemo, useEffect, useState } from "react";
// import { ChatForm } from "./chat-form";
// import { ChatList } from "./chat-list";


// interface ChatProps {
//    hostName: string;
//    hostIdentity: string;
//    viewerName: string;
//    isFollowing: boolean;
//    isChatEnabled: boolean;
//    isChatDelayed: boolean;
//    isChatFollowersOnly: boolean;
// }

// export const Chat = ({
//    hostName,
//    hostIdentity,
//    viewerName,
//    isFollowing,
//    isChatEnabled,
//    isChatDelayed,
//    isChatFollowersOnly,
// }: ChatProps) => {

//    const { variant, onExpand } = useChatSidebar((state) => state)
//    const connectionState = useConnectionState();
//    const participant = useRemoteParticipant(hostIdentity)


//    const isOnline = participant && connectionState === 'connected';

//    const isHidden = !isChatEnabled || !isOnline

//    const [value, setValue] = useState("");

//    const { chatMessages: messages, send } = useChat();

//    const reversedMessages = useMemo(() => {
//       return messages.sort((a, b) => b.timestamp - a.timestamp)
//    }, [messages])

//    const onSubmit = () => {
//       if (!send) return;

//       send(value);
//       setValue("");
//    }

//    const onChange = (value: string) => {
//       setValue(value)
//    }

//    return (
//       <div className="flex flex-col bg-slate-900/100 border-b pt-0 h-[calc(100vh-80px)]">
//          <ChatList
//             messages={reversedMessages}
//             isHidden={isHidden}
//          />
//          <ChatForm
//             onSubmit={onSubmit}
//             value={value}
//             onChange={onChange}
//             isHidden={isHidden}
//             isFollowersOnly={isChatFollowersOnly}
//             isDelayed={isChatDelayed}
//             isFollowing={isFollowing}
//          />
//          Chat

//       </div>
//    )
// }     