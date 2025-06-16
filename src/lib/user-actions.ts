import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const getSelf = async () => {

   const self = await currentUser()
   // console.log(self)
   if (!self) {
      return null;
      redirect("/sign-in"); // Instead of throw new Error
   }

   const user = await prisma.user.findUnique({
      where: { clerkUserId: self.id }
   })

   if (!user) {
      throw new Error("Not found")
   }
   return user;

}

export async function getUserByUsername(username: string) {
   return prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true }
   })
}


export const getRecommendedUsers = async () => {
   const user = await getSelf()
   if (!user) return []
   const currentUserId = user.id
   const users = await prisma.user.findMany({
      where: { id: { not: currentUserId } },
      take: 5,
      select: {
         id: true,
         username: true,
         imageUrl: true,
         stream: { select: { isLive: true } }
      }
   })
   return users
}

export const getFollowingUsers = async (currentUserId: string) => {
   const follows = await prisma.follow.findMany({
      where: { followerId: currentUserId },
      select: { followingId: true }
   })

   const followingIds = follows.map((f) => f.followingId)

   if (!followingIds.length) return [];

   return prisma.user.findMany({
      where: { id: { in: followingIds } },
      select: {
         id: true,
         username: true,
         imageUrl: true,
         stream: { select: { isLive: true } }
      }
   })

}