import { PrismaClient } from "@prisma/client";

declare global {
   var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
   global.prisma = prisma;
}

// Explicitly connect and log once (helpful for debugging)
if (!global.__mongoConnected) {
   prisma.$connect()
      .then(() => {
         console.log("✅ MongoDB (via Prisma) connected successfully!");
         global.__mongoConnected = true;
      })
      .catch((err) => {
         console.error("❌ MongoDB connection failed:", err);
      });
}
