// src/app/api/admin/ingress/reset/route.ts
import { NextResponse } from "next/server";
import { IngressClient } from "livekit-server-sdk";

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST() {
  try {
    const ingresses = await ingressClient.listIngress();

    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await ingressClient.deleteIngress(ingress.ingressId);
        console.log(`✅ Deleted ingress: ${ingress.ingressId}`);
      }
    }

    return NextResponse.json({ success: true, message: "All ingresses deleted" });
  } catch (err) {
    console.error("❌ Failed to delete ingresses:", err);
    return NextResponse.json({ success: false, error: "Failed to delete ingresses" }, { status: 500 });
  }
}
