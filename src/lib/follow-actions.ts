import { getSelf } from "./user-actions";
import { prisma } from "./prisma";

export const isFollowingUser = async ({ id }: { id: string }) => {

   try {
      const self = await getSelf();
      if (!self) return false; //logged out

      const otherUser = await prisma.user.findUnique({
         where: { id }
      })

      if (!otherUser) throw new Error("User not found")

      if (otherUser.id === self.id) return true

      const following = await prisma.follow.findFirst({
         where: {
            followerId: self.id,
            followingId: id
         }
      })

      return !!following
   } catch {
      return false
   }
}

export const followUser = async ({ id }: { id: string }) => {
   const self = await getSelf()

   if (!self) throw new Error("Unauthorized")

   if (self.id === id) throw new Error("Cannot follow yourself")

   const otherUser = await prisma.user.findUnique({
      where: { id }
   })

   if (!otherUser) throw new Error("User not found")

   const alreadyFollowed = await prisma.follow.findFirst({
      where: {
         followerId: self.id,
         followingId: id
      }
   })
   if (alreadyFollowed) throw new Error("Already following")

   const follow = await prisma.follow.create({
      data: {
         followerId: self.id,
         followingId: id
      }
   })

   return follow
}

export const unfollowUser = async ({ id }: { id: string }) => {

   const self = await getSelf()

   if (!self) throw new Error("Unauthorized")

   const otherUser = await prisma.user.findUnique({
      where: { id }
   });

   if (!otherUser) throw new Error("User not found")

   if (otherUser.id === self.id) throw new Error("Cannot unfollow yourself")

   const existingFollow = await prisma.follow.findFirst({
      where: {
         followerId: self.id,
         followingId: otherUser.id
      }
   })

   if (!existingFollow) throw new Error("Not following")

   const follow = await prisma.follow.delete({
      where: {
         id: existingFollow.id
      },
   })

   return follow
}

export const getFollowedUsers = async () => {
   try {
      const self = await getSelf();

      if (!self) throw new Error("Unauthorized")

      const follows = await prisma.follow.findMany({
         where: { followerId: self.id }
      });

      const followingIds = follows.map(f => f.followingId)

      const users = await prisma.user.findMany({
         where: { id: { in: followingIds } },

         select: {
            id: true,
            username: true,
            imageUrl: true,
            stream: { select: { isLive: true } }
         }
      })

      return users;

   } catch (error) {
      throw error
   }
}