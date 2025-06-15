import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const getSelf = async () => {

   const self = await currentUser()
   if (!self) throw new Error("Unauthorized")

   const user = await prisma.user.findUnique({
      where: { clerkUserId: self.id }
   })

   if (!user) {
      throw new Error("Not found")
   }
   return user;

}

export const getRecommendedUsers = async (currentUserId: string) => {
   return prisma.user.findMany({
      where: { id: { not: currentUserId } },
      take: 5,
      select: {
         id: true,
         username: true,
         imageUrl: true,
         stream: { select: { isLive: true } }
      }
   })
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