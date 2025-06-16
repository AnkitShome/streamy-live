import { NextRequest, NextResponse } from "next/server";
import { getSelf, getFollowingUsers } from "@/actions/authActions";

export async function GET() {
   const user = await getSelf();
   if (!user) return NextResponse.json([], { status: 401 });

   const users = await getFollowingUsers(user.id);
   return NextResponse.json(users);
}
