import { NextResponse } from "next/server";
import { followUser, unfollowUser } from "@/lib/follow-actions";

// This works for both POST and DELETE
export async function POST(
  req: Request,
  context: { params: { userId: string } }
) {
  const { params } = context;
  const { userId } = typeof params.then === "function" ? await params : params;
  try {
    await followUser({ id: userId });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { userId: string } }
) {
  const { params } = context;
  const { userId } = typeof params.then === "function" ? await params : params;
  try {
    await unfollowUser({ id: userId });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
