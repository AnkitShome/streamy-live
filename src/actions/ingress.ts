"use server"

import {
   IngressAudioEncodingOptions,
   IngressInput,
   IngressClient,
   IngressVideoEncodingOptions,
   RoomServiceClient,
   type CreateIngressOptions,
   IngressVideoEncodingPreset,
   IngressAudioEncodingPreset
} from "livekit-server-sdk"
import { TrackSource } from "livekit-server-sdk"


import { prisma } from "@/lib/prisma"
import { getSelf } from "@/lib/user-actions"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
   process.env.LIVEKIT_API_URL!,
   process.env.LIVEKIT_API_KEY!,
   process.env.LIVEKIT_API_SECRET!,
);


const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!)

const ingressTypeMap: Record<string | number, IngressInput> = {
   "0": IngressInput.RTMP_INPUT,
   0: IngressInput.RTMP_INPUT,
   "2": IngressInput.WHIP_INPUT,
   2: IngressInput.WHIP_INPUT,
};


export const resetIngresses = async (hostIdentity: string) => {
   const ingresses = await ingressClient.listIngress({
      roomName: hostIdentity,
   });

   const rooms = await roomService.listRooms([hostIdentity]);

   for (const room of rooms) {
      await roomService.deleteRoom(room.name);
   }

   for (const ingress of ingresses) {
      if (ingress.ingressId) {
         await ingressClient.deleteIngress(ingress.ingressId);
      }
   }
};

export const createIngress = async (ingressType: IngressInput) => {
   const self = await getSelf();

   //reset prev ingress
   await resetIngresses(self.id)


   const mappedType = ingressTypeMap[ingressType];
   if (mappedType === undefined) throw new Error("Invalid ingress type")

   const options: CreateIngressOptions = {
      name: self.username,
      roomName: self.id,
      participantName: self.username,
      participantIdentity: self.id,
   }

   if (mappedType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true
   }
   else {
      options.video = {
         source: TrackSource.CAMERA,
         preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
         source: TrackSource.MICROPHONE,
         preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
      }
   }

   const ingress = await ingressClient.createIngress(
      ingressType,
      options
   )

   if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error("Failed to create ingress")
   }

   await prisma.stream.update({
      where: { userId: self.id },
      data: {
         ingressId: ingress.ingressId,
         serverUrl: ingress.url,
         streamKey: ingress.streamKey
      }
   })

   revalidatePath(`/user/${self.username}/key`)
   return {
      ingressId: ingress.ingressId,
      url: ingress.url,
      streamKey: ingress.streamKey
   }
}