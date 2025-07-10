import { ChatMessage } from "@/hooks/useSocketChat";
import ChatMessageItem from "./chat-message";

interface ChatListProps {
   messages: ChatMessage[];
   currentUserId: string;
   onBanUser: (userId: string, durationMins?: number, reason?: string) => void;
   onDeleteMessage: (messageId: string);
   hostIdentity: string;
}

export function ChatList({ messages, currentUserId, onBanUser, onDeleteMessage, hostIdentity }: ChatListProps) {
   return (
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-2 gap-2 bg-slate-900">
         {messages.map((msg) => (
            <ChatMessageItem
               key={msg.id}
               message={msg}
               currentUserId={currentUserId}
               hostIdentity={hostIdentity}
               onBanUser={onBanUser}
               onDeleteMessage={onDeleteMessage}
            />
         ))}
      </div>
   );
}














// "use client";

// import { ReceivedChatMessage } from "@livekit/components-react";

// import { ChatMessage } from "./chat-message";

// interface ChatListProps {
//    messages: ReceivedChatMessage[];
//    isHidden: boolean;
// }

// export const ChatList = ({ messages, isHidden }: ChatListProps) => {
//    if (isHidden || !messages || messages.length === 0) {
//       return (
//          <div className="flex flex-1 items-center justify-center">
//             <p className="text-sm text-slate-50">
//                {isHidden ? "Chat is disabled" : "Welcome to the chat!"}
//             </p>
//          </div>
//       );
//    }

//    return (
//       <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
//          {messages.map((message) => (
//             <ChatMessage key={message.timestamp} data={message} />
//          ))}
//       </div>
//    );
// };
