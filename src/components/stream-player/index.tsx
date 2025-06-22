"use client"

import { useViewerToken } from "@/hooks/use-viewer-token"
import { LiveKitRoom } from "@livekit/components-react"
import type { User, Stream } from "@prisma/client"
import { cn } from "@/lib/utils"
import { Video } from "./video"
import { useChatSidebar } from "@/store/use-chat-sidebar"
import { Chat } from "./chat"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"

interface StreamPlayerProps {
   user: User & { stream: Stream | null }
   stream: Stream
   isFollowing: boolean
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
   const { token, name, identity } = useViewerToken(user.id)
   const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state)

   if (!token || !name || !identity) {
      return (
         <div className="flex items-center justify-center h-full bg-gray-900 text-white">
            <div className="text-center">
               <div className="text-xl font-semibold mb-2">Unable to load stream</div>
               <div className="text-gray-400">Cannot watch the stream at this time</div>
            </div>
         </div>
      )
   }

   // Chat sidebar width (can adjust as needed)
   const chatWidth = "w-80 lg:w-96" // 320px/384px

   return (
      <div className="h-full w-full bg-gray-900 relative overflow-hidden">
         <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!} className="h-full w-full">
            <div className="flex h-full w-full">
               {/* --- Video Container --- */}
               <div
                  className={cn(
                     "relative flex-1 h-full transition-all duration-300",
                     // Remove the black bg; let video fill space
                     // Also remove "w-full" which could fight flex-1
                  )}
               >
                  <Video hostName={user.username} hostIdentity={user.id} />
                  {/* --- Chat Toggle Button (overlay on video, only if chat is closed) --- */}
                  {collapsed && (
                     <Button
                        onClick={onExpand}
                        variant="secondary"
                        size="sm"
                        className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600 shadow"
                     >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                     </Button>
                  )}
               </div>

               {/* --- Chat Sidebar --- */}
               <div
                  className={cn(
                     "flex flex-col h-full transition-all duration-300 bg-gray-800 border-l border-gray-700 overflow-hidden",
                     collapsed ? "w-0 min-w-0 opacity-0 pointer-events-none" : `${chatWidth} min-w-[320px] opacity-100`
                  )}
               >
                  {/* Mount chat only when open to prevent rendering issues */}
                  {!collapsed && (
                     <>
                        {/* Chat Header */}
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
                        {/* Chat Component */}
                        <div className="flex-1 min-h-0">
                           <Chat
                              viewerName={name}
                              hostName={user.username}
                              hostIdentity={user.id}
                              isFollowing={isFollowing}
                              isChatEnabled={stream.isChatEnabled}
                              isChatFollowersOnly={stream.isChatFollowersOnly}
                              isChatDelayed={stream.isChatDelayed}
                           />
                        </div>
                     </>
                  )}
               </div>
            </div>
         </LiveKitRoom>
      </div>
   )
}
