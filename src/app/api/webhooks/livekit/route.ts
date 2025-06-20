import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { prisma } from "@/lib/prisma";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers(); // <-- await here!
  const authorization = headerPayload.get("Authorization");

  if (!authorization) {
    return new Response("No authorization header", { status: 400 });
  }

  let event;
  try {
    event = await receiver.receive(body, authorization); // <-- await here!
  } catch (err) {
    return new Response("Invalid signature or payload", { status: 400 });
  }

  if (event.event === "ingress_started") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }

  return new Response("OK", { status: 200 }); // <-- always return something!
}
