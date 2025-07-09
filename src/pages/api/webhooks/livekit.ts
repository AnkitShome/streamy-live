import type { NextApiRequest, NextApiResponse } from "next";
import { WebhookReceiver } from "livekit-server-sdk";
import { prisma } from "@/lib/prisma";

const receiver = new WebhookReceiver(
   process.env.LIVEKIT_API_KEY!,
   process.env.LIVEKIT_API_SECRET!
);

export const config = {
   api: {
      bodyParser: false,
   },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== "POST") {
      return res.status(405).end("Method Not Allowed");
   }

   try {
      // 1. Read raw body as buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of req) {
         chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      }
      const body = Buffer.concat(chunks);

      // 2. Auth header
      const authorization = req.headers["authorization"];
      if (!authorization || typeof authorization !== "string") {
         return res.status(400).send("Missing authorization header");
      }

      const event = await receiver.receive(body, authorization);
      console.log("📦 LiveKit Webhook Event:", event.event, JSON.stringify(event, null, 2));


      if (event.event === "ingress_started") {
         const stream = await prisma.stream.update({
            where: { ingressId: event.ingressInfo?.ingressId },
            data: { isLive: true },
            include: { user: true }
         });

         const streamer = stream.user

         const followers = await prisma.follow.findMany({
            where: { followingId: streamer.id },
         })

         const io = (global as any).io

         for (const follower of followers) {
            const followerId = follower.followerId;

            console.log(`➡️ Emitting to room ${followerId}`);

            io.to(followerId).emit("stream-started", {
               username: stream.user.username,
               userId: streamer.id,
               // imageUrl: stream.image.imageUrl
            })

         }


         console.log(`📢 Notified ${followers.length} followers`);
      }

      if (event.event === "ingress_ended") {
         const stream = await prisma.stream.update({
            where: { ingressId: event.ingressInfo?.ingressId },
            data: { isLive: false },
            include: { user: true }
         });

         const streamer = stream.user;
         const followers = await prisma.follow.findMany({
            where: { followingId: streamer.id }
         });

         const io = (global as any).io;
         for (const follower of followers) {
            io.to(follower.followerId).emit("stream-ended", {
               username: streamer.username,
               userId: streamer.id
            });
         }

         // Optionally, also notify the streamer themselves:
         io.to(streamer.id).emit("stream-ended", {
            username: streamer.username,
            userId: streamer.id
         });

         console.log(`📢 Notified ${followers.length} followers and streamer of stream end`);
      }
      return res.status(200).send("OK");
   } catch (err) {
      console.error("❌ Webhook processing failed:", err);
      return res.status(400).send("Invalid signature or payload");
   }
}
