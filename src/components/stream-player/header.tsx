"use client"

import { UserIcon } from "lucide-react"
import { UserAvatar } from "@/components/userAvatar"
import { VerifiedMark } from "../verified-mark"
import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { Actions } from "./actions"

interface HeaderProps {
   imageUrl: string,
   hostName: string,
   hostIdentity: string,
   viewerIdentity: string,
   isFollowing: boolean,
   name: string
   isLive: boolean
}

export const Header = ({
   imageUrl,
   hostName,
   hostIdentity,
   viewerIdentity,
   isFollowing,
   name,
   isLive
}: HeaderProps) => {

   const participants = useParticipants()
   const participant = useRemoteParticipant(hostIdentity)

   const participantCount = participants.length - 1

   const hostAsViewer = `host-${hostIdentity}`
   const isHost = viewerIdentity === hostAsViewer

   return (
      <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 tex-white mb-10">
         <div className="flex items-center gap-x-3">
            <UserAvatar
               imageUrl={imageUrl}
               username={hostName}
               size="lg"
               isLive={isLive}
               showBadge
            />
            <div className="space-y-1 text-white">
               <div className="flex items-center gap-x-2">
                  <h2 className="text-lg text-white font-semibold">
                     {hostName}
                  </h2>
                  <VerifiedMark />
               </div>
               <p className="text-sm font-semibold">{name}</p>

               {isLive ? (
                  <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                     <UserIcon className="h-4 w-4" />
                     <p>
                        {participantCount}{" "}
                        {participantCount === 1 ? "viewer" : "viewers"}
                     </p>
                  </div>
               ) : (
                  <p className="font-semibold text-xs text-muted-foreground">
                     Offline
                  </p>
               )}
            </div>
         </div>

         <Actions
            isFollowing={isFollowing}
            hostIdentity={hostIdentity}
            isHost={isHost}
         />
      </div>
   )
}