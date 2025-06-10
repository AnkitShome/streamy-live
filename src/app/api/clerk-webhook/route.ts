import { NextRequest, NextResponse } from "next/server";
import { handleClerkWebhook } from "@/actions/clerkActions";

export async function POST(req: NextRequest) {
   const event = await req.json();
   await handleClerkWebhook(event)
   return NextResponse.json({ received: true });
}

