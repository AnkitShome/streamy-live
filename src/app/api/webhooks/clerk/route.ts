import { Webhook } from "svix"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
   const payload = await req.text()
   const headerPayload = await headers()

   const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

   let evt: any
   try {
      evt = svix.verify(payload, {
         "svix-id": headerPayload.get("svix-id") ?? "",
         "svix-timestamp": headerPayload.get("svix-timestamp") ?? "",
         "svix-signature": headerPayload.get("svix-signature") ?? "",
      })
   } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return new NextResponse("Invalid signature", { status: 400 })
   }

   const { type, data } = evt

   switch (type) {
      case "user.created":
         await prisma.user.create({
            data: {
               clerkUserId: data.id,
               username: data.username ?? `${data.first_name}-${data.last_name}` ?? "user",
               imageUrl: data.image_url || "",
               bio: "", // <- Required, set a default
               stream: {
                  create: {
                     title: `${data.username}'s stream`,
                     ingressId: uuidv4(),
                  }
               }
            },
         })
         console.log("New user:", data.id)
         break

      case "user.updated":
         await prisma.user.updateMany({
            where: { clerkUserId: data.id },
            data: {
               username: data.username || undefined,
               imageUrl: data.image_url || undefined
            }
         })
         console.log("Updated user:", data)
         break

      case "user.deleted":
         await prisma.user.deleteMany({ where: { clerkUserId: data.id } })
         console.log("Deleted user:", data)
         break

      case "session.created":
         console.log("Session created", data.id)
         break;

      case "session.ended":
         console.log("Session ended", data.id)
         break;

      default:
         console.log("Unhandled event:", type)
   }

   return new NextResponse("Webhook received", { status: 200 })
}
