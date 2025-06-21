"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { User } from "@prisma/client";
import { Stream } from "@prisma/client";
import { Video } from "./video";

interface StreamPlayerProps {
   user: User & { stream: Stream | null };
   stream: Stream;
   isFollowing: boolean;
}

export const StreamPlayer = ({
   user, stream, isFollowing
}: StreamPlayerProps) => {
   const { token, name, identity } = useViewerToken(user.id);

   if (!token || !name || !identity) {
      return <div className="text-white">Cannot watch the stream</div>;
   }

   return (
      <div className="h-full w-full">
         <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
            className="grid grid-rows-2 h-full w-full"
         >
            {/* ─── Top (Video) ─── */}
            <div className="h-full border-b border-gray-300">
               <Video
                  hostName={user.username}
                  hostIdentity={user.id}
               />
            </div>

            {/* ─── Bottom (Chat) ─── */}
            <div className="h-full">
               {/* Chat goes here later */}
            </div>
         </LiveKitRoom>
      </div>
   );
};
