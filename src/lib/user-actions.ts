import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getFollowedUsers } from "./follow-actions";

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

   const self = await getSelf()
   if (!self) throw new Error("Unauthorized")

   const following = await getFollowedUsers();
   const followingIds = following.map(f => f.id)
   const currentUserId = self.id

   const users = await prisma.user.findMany({
      where: { id: { not: currentUserId, notIn: followingIds } },
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

// export const getFollowingUsers = async (currentUserId: string) => {
//    const follows = await prisma.follow.findMany({
//       where: { followerId: currentUserId },
//       select: { followingId: true }
//    })

//    const followingIds = follows.map((f) => f.followingId)

//    if (!followingIds.length) return [];

//    return prisma.user.findMany({
//       where: { id: { in: followingIds } },
//       select: {
//          id: true,
//          username: true,
//          imageUrl: true,
//          stream: { select: { isLive: true } }
//       }
//    })

// }

export const getSelfByUsername = async (username: string) => {
   const self = await currentUser();

   if (!self || !self.username) throw new Error("Unauthorized")

   const user = await prisma.user.findUnique({
      where: { username }
   })

   if (!user) throw new Error("User not found")

   if (self.username !== user.username) throw new Error("Unauthorized")

   return user
}