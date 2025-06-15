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