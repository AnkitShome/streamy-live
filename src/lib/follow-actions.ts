import { getSelf } from "./user-actions";
import { prisma } from "./prisma";

export const isFollowing = async ({ id }: { id: string }) => {

   const self = await getSelf();
   if (!self) return false; //logged out

   if (self.id === id) return true

   const following = await prisma.follow.findFirst({
      where: {
         followerId: self.id,
         followingId: id
      }
   })

   return !!following
}

export const followUser = async ({ id }: { id: string }) => {
   const self = await getSelf()
   if (!self) throw new Error("Unauthorized")
   if (self.id === id) throw new Error("Cannot follow yourself")

   const already = await prisma.follow.findFirst({
      where: {
         followerId: self.id,
         followingId: id
      }
   })
   if (already) return; // or throw new Error("Already following")

   await prisma.follow.create({
      data: {
         followerId: self.id,
         followingId: id
      }
   })
}

export const unfollowUser = async ({ id }: { id: string }) => {
   const self = await getSelf()
   if (!self) throw new Error("Unauthorized")

   await prisma.follow.deleteMany({
      where: {
         followerId: self.id,
         followingId: id
      }
   })
}