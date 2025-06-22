"use server"

import { revalidatePath } from "next/cache"
import { followUser, unfollowUser } from "@/lib/follow-actions"

export async function onFollow(userId: string) {
   const result = await followUser({ id: userId })
   revalidatePath("/")
   return result
}

export async function onUnfollow(userId: string) {
   const result = await unfollowUser({ id: userId });
   revalidatePath("/");
   return result;
}