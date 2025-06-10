import { NextRequest, NextResponse } from "next/server";
import { createStream, fetchStreams } from "@/actions/streamActions";

export async function GET() {
   const streams = await fetchStreams();
   return NextResponse.json(streams);
}

// export async function POST(req: NextRequest) {
//    const data = await req.json();
//    const newStream = await createStream(data);
//    return NextResponse.json(newStream, { status: 201 });
// }
export async function POST(req: NextRequest) {
   try {
      const data = await req.json();
      const newStream = await createStream(data);
      return NextResponse.json(newStream, { status: 201 });
   } catch (error) {
      console.error('STREAMS POST ERROR:', error); // <--- SEE THE ERROR IN TERMINAL
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
}