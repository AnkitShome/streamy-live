import { useState } from "react";
import { BanEvent } from "@/hooks/useSocketChat";

interface ChatFormProps {
   onSend: (msg: string) => void;
   disabled?: boolean;
   banned?: BanEvent | null;
}

export default function ChatForm({ onSend, disabled, banned }: ChatFormProps) {
   const [value, setValue] = useState("");

   if (banned) {
      return (
         <div className="p-2 text-center text-red-600 bg-red-50 border border-red-200 rounded">
            You are {banned.expiresAt ? "timed out" : "banned"} from chat.
            {banned.reason && <> Reason: {banned.reason}</>}
            {banned.expiresAt && <> Until: {new Date(banned.expiresAt).toLocaleString()}</>}
         </div>
      );
   }

   return (
      <form
         onSubmit={e => {
            e.preventDefault();
            if (value.trim()) onSend(value.trim());
            setValue("");
         }}
         className="flex gap-2 p-2 border-t"
      >
         <input
            type="text"
            className="flex-1 px-2 py-1 rounded border bg-slate-800 text-white"
            value={value}
            onChange={e => setValue(e.target.value)}
            disabled={disabled}
            placeholder={disabled ? "You cannot send messages" : "Type your message..."}
         />

         <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="bg-indigo-600 text-white px-4 py-1 rounded"
         >
            Send
         </button>
      </form>
   );
}






// "use client"

// import { useState } from "react"
// import { Send } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Input } from "../ui/input"
// import { Button } from "../ui/button"
// import { ChatInfo } from "./chat-info"

// interface ChatFormProps {
//    onSubmit: () => void
//    value: string
//    onChange: (value: string) => void
//    isHidden: boolean
//    isFollowersOnly: boolean
//    isDelayed: boolean
//    isFollowing: boolean
// }

// export const ChatForm = ({
//    onSubmit,
//    value,
//    onChange,
//    isHidden,
//    isFollowersOnly,
//    isDelayed,
//    isFollowing
// }: ChatFormProps) => {

//    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false)

//    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
//    const isDisabled = isHidden || isFollowersOnlyAndNotFollowing

//    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       e.stopPropagation();

//       if (!value || isDisabled) return;

//       if (isDelayed && !isDelayedBlocked) {
//          setIsDelayedBlocked(true);
//          setTimeout(() => {
//             setIsDelayedBlocked(false)
//             onSubmit()
//          }, 3000)
//       }

//       else {
//          onSubmit();
//       }
//    }

//    return (
//       <form
//          onSubmit={handleSubmit}
//          className="flex flex-col items-center gap-y-4 p-3">
//          <div className="w-full">
//             <ChatInfo
//                isDelayed={isDelayed}
//                isFollowersOnly={isFollowersOnly}
//             />
//             <div className="flex space-x-2">
//                <div className="w-full mb-2">
//                   <Input
//                      onChange={(e) => onChange(e.target.value)}
//                      value={value}
//                      disabled={isDisabled}
//                      placeholder="Send a message"
//                      className={
//                         cn("border-white/10 text-slate-200",
//                            (isFollowersOnly || isDelayed) && "rounded-t-noneborder-t-0"
//                         )
//                      }
//                   />
//                </div>
//                <div className="ml-auto">
//                   <Button
//                      type="submit"
//                      variant='ghost'
//                      size="sm"
//                      disabled={isDisabled}
//                   >
//                      <Send className="mt-1 text-white w-10 h-10" />
//                   </Button>
//                </div>
//             </div>
//          </div>
//       </form>
//    )
// }