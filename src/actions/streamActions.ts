import { prisma } from '../lib/prisma'

export async function createStream(data: {
   title: string;
   description?: string;
   videoUrl?: string;
   userId: string;
}) {
   const { title, description, videoUrl, userId } = data;
   return prisma.stream.create({
      data: { title, description, videoUrl, userId }
   });
}

export async function fetchStreams() {
   return prisma.stream.findMany({
      orderBy: { createdAt: 'desc' }
   });
}

export async function fetchStreamById(id: string) {
   return prisma.stream.findUnique({ where: { id } });
}

export async function updateStream(id: string, updates: Partial<{
   title: string;
   description?: string;
   videoUrl?: string;
}>) {
   return prisma.stream.update({
      where: { id },
      data: updates,
   });
}

export async function deleteStream(id: string) {
   return prisma.stream.delete({ where: { id } });
}