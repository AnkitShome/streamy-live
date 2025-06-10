import { Webhook } from "svix"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
   const payload = await req.text()
   const headerPayload = await headers() // ✅ Await it!

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
               imageUrl: data.image_url,
               bio: "", // <- Required, set a default
            },
         })
         console.log("New user:", data.id)
         break
      case "user.updated":
         console.log("Updated user:", data)
         break
      case "user.deleted":
         console.log("Deleted user:", data)
         break
      default:
         console.log("Unhandled event:", type)
   }

   return new NextResponse("Webhook received", { status: 200 })
}
