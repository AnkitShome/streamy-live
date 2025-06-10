import { NextRequest, NextResponse } from "next/server";
import { createStream, fetchStreams } from "@/actions/streamActions";

export async function GET() {
   const streams = await fetchStreams();
   return NextResponse.json(streams);
}

export async function POST(req: NextRequest) {
   const data = await req.json();
   const newStream = await createStream(data);
   return NextResponse.json(newStream, { status: 201 });
}