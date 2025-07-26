import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { prisma } from "@/lib/prisma";
import { getFollowedUsers } from "./follow-actions";

export const getSelf = async () => {

   const self = await currentUser()
   // console.log(self)
   if (!self) {
      redirect("/sign-in"); // Instead of throw new Error
   }

   let user = await prisma.user.findUnique({
      where: { clerkUserId: self.id }
   })

   if (!user) {
      user=await prisma.user.create({
         data:{
            clerkUserId:self.id,
            username: self.username ?? `${self.firstName}-${self.lastName}` ?? "user",
            bio:"",
            stream: {
                  create: {
                     title: `${self.username}'s stream`,
                     ingressId: uuidv4(),
                  }
               }
         }
      })
   }
   return user;

}

export async function getUserByUsername(username: string) {
   return prisma.user.findUnique({
      where: { username },
      include: { stream: true }
   });
}

export async function getUserById(id:string){
   return prisma.user.findUnique({
      where:{id},
      include:{
         stream:true
      }
   })
}


export const getRecommendedUsers = async () => {

   const self = await getSelf()
   // if (!self) throw new Error("Unauthorized")
   if (!self) {
      redirect("/sign-in"); // Instead of throw new Error
   }


   const following = await getFollowedUsers();
   const followingIds = following.map(f => f.id)
   const currentUserId = self.id

   const users = await prisma.user.findMany({
      where: { id: { not: currentUserId, notIn: followingIds } },
      select: {
         id: true,
         username: true,
         imageUrl: true,
         stream: { select: { isLive: true } }
      },
   })
   return users
}


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