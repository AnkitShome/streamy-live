"use client"

import { useChatSidebar } from "@/store/use-chat-sidebar"
import { MessageSquare, X } from "lucide-react"
import { Button } from "../ui/button"

interface ChatHeaderProps {
   onCollapse: () => void;
}

export const ChatHeader = ({ onCollapse }: ChatHeaderProps) => {

   return (
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
         <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span className="text-white font-medium text-sm">Stream Chat</span>
         </div>
         <Button
            onClick={onCollapse}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
         >
            <X className="h-4 w-4" />
         </Button>
      </div>
   )
}