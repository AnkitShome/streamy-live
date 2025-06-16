import { NextResponse } from "next/server";
import { followUser, unfollowUser } from "@/lib/follow-actions";

export async function POST(
   req: Request,
   { params }: { params: { userId: string } }
) {
   try {
      await followUser({ id: params.userId });
      return NextResponse.json({ ok: true });
   } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
   }
}

export async function DELETE(
   req: Request,
   { params }: { params: { userId: string } }
) {
   try {
      await unfollowUser({ id: params.userId });
      return NextResponse.json({ ok: true });
   } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
   }
}
