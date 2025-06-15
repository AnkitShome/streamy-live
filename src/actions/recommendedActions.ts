import { prisma } from "@/lib/prisma";
import { getSelf } from "./authActions";


export const getRecommended = async () => {
   const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
   })

   return users
}