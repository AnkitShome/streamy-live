"use server"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { getSelf } from "@/lib/user-actions"

export const updateStream = async (values: Partial<Stream>) => {
   try {
      const self = await getSelf()
      const selfStream = await prisma.stream.findUnique({
         where: { userId: self.id }
      })

      if (!selfStream) throw new Error("Stream not found")

      const validData = {
         name: values.name,
         isChatEnabled: values.isChatEnabled,
         isChatFollowersOnly: values.isChatFollowersOnly,
         isChatDelayed: values.isChatDelayed
      }

      const stream = await prisma.stream.update({
         where: { id: selfStream.id },
         data: {
            ...validData
         }
      })

      revalidatePath(`/user/${self.username}/chat`)
      revalidatePath(`/user/${self.username}`)
      revalidatePath(`/${self.username}`)

      return stream;
   }
   catch {
      throw new Error("Internal Error")
   }
}