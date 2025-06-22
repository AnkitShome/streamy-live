"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import type { User, Stream } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Video } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Chat } from "./chat";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ChatHeader } from "./chat-header";
import { Header } from "./header";

interface StreamPlayerProps {
   user: User & { stream: Stream | null };
   stream: Stream;
   isFollowing: boolean;
}

export const StreamPlayer = ({
   user,
   stream,
   isFollowing,
}: StreamPlayerProps) => {
   const { token, name, identity } = useViewerToken(user.id);
   const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

   if (!token || !name || !identity) {
      return (
         <div className="flex items-center justify-center h-full bg-gray-900 text-white">
            <div className="text-center">
               <div className="text-xl font-semibold mb-2">Unable to load stream</div>
               <div className="text-gray-400">Cannot watch the stream at this time</div>
            </div>
         </div>
      );
   }

   const chatWidth = "w-80 lg:w-96";

   return (
      <div className="h-full w-full bg-gray-900 relative overflow-hidden flex flex-col">
         <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
            className="flex-1 flex flex-col min-h-0"
         >
            <div className="flex flex-1 min-h-0">
               {/* --- Video Section --- */}
               <div className={cn("relative flex-1 h-full min-h-0 transition-all duration-300 bg-black")}>
                  <Video hostName={user.username} hostIdentity={user.id} />
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
                     "flex flex-col h-full min-h-0 transition-all duration-300 bg-gray-800 border-l border-gray-700",
                     collapsed
                        ? "w-0 min-w-0 opacity-0 pointer-events-none"
                        : `${chatWidth} min-w-[320px] opacity-100`
                  )}
               >
                  {!collapsed && (
                     <>
                        <ChatHeader onCollapse={onCollapse} />
                        {/* Make chat grow and scroll */}
                        <div className="flex-1 min-h-0 flex flex-col">
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
            {/* --- Header Always Visible at Bottom --- */}
            <div className="w-full bg-gray-800 border-t border-gray-700 px-4 py-2">
               <Header
                  hostName={user.username}
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  imageUrl={user.imageUrl}
                  isFollowing={isFollowing}
                  name={stream.title}
                  isLive={stream.isLive}
               />
            </div>
         </LiveKitRoom>
      </div>
   );
};
