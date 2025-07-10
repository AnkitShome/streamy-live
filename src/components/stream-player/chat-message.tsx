import { BadgeCheck, Shield } from "lucide-react";
import { ChatMessage } from "@/hooks/useSocketChat";
import { useState } from "react";
import socket from "@/lib/socket";
import { stringToColor } from "@/lib/utils";

interface Props {
   message: ChatMessage;
   currentUserId: string;
   onBanUser: (banUserId: string, durationMins?: number, reason?: string) => void;
   onDeleteMessage: (messageId: string) => void;
   hostIdentity: string;
}

export default async function ChatMessageItem({
   message,
   currentUserId,
   hostIdentity,
   onDeleteMessage,
   onBanUser
}: Props) {
   const isHost = hostIdentity === currentUserId;
   const isMod = isHost;
   const [showActions, setShowActions] = useState(false);

   const nameColor = isHost ? "text-indigo-400" : isMod ? "text-green-400" : "";

   const customStyle = !isHost && !isMod ?
      { color: stringToColor(message.username || "") } : {}

   return (
      <div
         className="flex items-center gap-2 group relative p-1 px-2 rounded hover:bg-slate-700/60"
         onMouseEnter={() => setShowActions(true)}
         onMouseLeave={() => setShowActions(false)}
      >
         <span className={`font-semibold ${nameColor}`} style={customStyle}>
            {message.username}
         </span>

         {/* Badges for host or mod */}

         {isHost && <BadgeCheck className="text-indigo-400 w-4 h-4 ml-1" />}
         {isMod && !isHost && <Shield className="text-green-400 w-4 h-4 ml-1" />}

         <span>{message.content}</span>

         {(isMod || currentUserId === message.userId) && showActions && (
            <div className="absolute right-0 flex gap-1 z-20">
               {isMod && (
                  <>
                     <button
                        className="bg-red-500 text-white rounded px-1 py-0.5 text-xs"
                        onClick={() => onBanUser(message.userId, undefined, "Banned by mod")}
                     >
                        Ban
                     </button>
                     <button
                        className="bg-yellow-500 text-white rounded px-1 py-0.5 text-xs"
                        onClick={() => onBanUser(message.userId, 10, "Timed out")}
                     >
                        Timeout
                     </button>
                  </>
               )}
               {(isMod || (currentUserId === message.userId)) && (
                  <button
                     className="bg-gray-400 text-white rounded px-1 py-0.5 text-xs"
                     onClick={() => onDeleteMessage(message.id)}
                  >
                     Delete
                  </button>
               )}
            </div>
         )}
      </div>
   )
}


















// "use client";

// import moment from "moment"
// import { ReceivedChatMessage } from "@livekit/components-react";

// import { stringToColor } from "@/lib/utils";

// interface ChatMessageProps {
//    data: ReceivedChatMessage;
// }

// export const ChatMessage = ({ data }: ChatMessageProps) => {
//    const color = stringToColor(data.from?.name || "");

//    return (
//       <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
//          <p className="text-sm text-white/40">{moment(data.timestamp).format("HH:mm")}</p>
//          <div className="flex flex-wrap items-baseline gap-1 grow">
//             <p className="text-sm font-semibold whitespace-nowrap">
//                <span className="truncate" style={{ color: color }}>
//                   {data.from?.name}
//                </span>
//                :
//             </p>
//             <p className="text-sm break-all text-slate-400">{data.message}</p>
//          </div>
//       </div>
//    );
// };