"use client"

import { Participant, Track } from "livekit-client"
import { useRef, useState } from "react"
import { useTracks } from "@livekit/components-react"
import { FullScreenControl } from "./fullscreen-control"
import { useEventListener } from "usehooks-ts";

interface LiveVideoProps {
   participant: Participant
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {

   const videoRef = useRef<HTMLVideoElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null)

   const [isFullscreen, setIsFullscreen] = useState(false)

   const toggleFullScreen = () => {
      if (isFullscreen) {
         document.exitFullscreen()
      }
      else if (wrapperRef?.current) {
         wrapperRef.current.requestFullscreen()
      }
   }

   const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isCurrentlyFullscreen)
   }

   useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef)

   useTracks([Track.Source.Camera, Track.Source.Microphone])
      .filter((track) => track.participant.identity === participant.identity)
      .forEach((track) => {
         if (videoRef.current) {
            track.publication.track?.attach(videoRef.current)
         }
      })

   return (
      <div
         ref={wrapperRef}
         className="relative h-full w-full flex items-center justify-center">
         <video
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            autoPlay
            playsInline
            muted
         />
         <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
            <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
               <FullScreenControl
                  isFullScreen={isFullscreen}
                  onToggle={toggleFullScreen}
               />
            </div>
         </div>
      </div>
   )
}
