import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import next from "next";
import dotenv from "dotenv";
import { prisma } from "@/lib/prisma";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// ✅ Fix: Provide handler directly here
const httpServer = createServer((req, res) => {
   handle(req, res);
});

const io = new SocketIOServer(httpServer, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   },
});

// 🌍 Global export for webhook access
(global as any).io = io;

io.on("connection", (socket) => {
   console.log("🔌 New socket connection:", socket.id);

   socket.on("joinNotificationRoom", (userId: string) => {
      socket.join(userId);
      console.log(`🚪 [Server] User ${userId} joined room`);
   });

   // User joins a chat room (usually, the streamer's userId or streamId)
   socket.on("joinChatRoom", ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`👤 User ${userId} joined chat room ${roomId}`);
   })

   // Handle incoming chat message
   socket.on("chatMessage", async ({ roomId, userId, content }) => {

      const now = new Date()

      const ban = await prisma.ban.findFirst({
         where: {
            userId,
            roomId,
            OR: [
               { expiresAt: null },
               { expiresAt: { gt: now } }
            ]
         }
      })

      if (ban) {
         // Optionally, notify the user they are banned (only to them)
         socket.emit("banned", { reason: ban.reason, expiresAt: ban.expiresAt })
         console.log(`⛔️ Blocked banned user ${userId} from sending chat in ${roomId}`);
         return;
      }

      const message = await prisma.chatMessage.create({
         data: {
            roomId,
            userId,
            content
         },
      })

      //my addition for username
      const user = await prisma.user.findFirst({
         where: { id: userId }
      })

      //Broadcast to room
      io.to(roomId).emit("chatMessage", {
         id: message.id,
         userId: message.userId,
         content: message.content,
         username: user.username,
         createdAt: message.createdAt
      })


      // (Moderation events: ban, delete, timeout, etc. will be added soon!)
   })


   socket.on("banUser", async ({ roomId, userId, bannedBy, reason, durationMins }) => {
      //null mins means permanent ban
      const expiresAt = durationMins ? new Date(Date.now() + durationMins * 60000) : null

      await prisma.ban.create({
         data: {
            userId,
            roomId,
            bannedBy,
            reason,
            expiresAt,
         }
      })

      io.to(roomId).emit("userBanned", { userId, reason, expiresAt })
      console.log(`🚨 User ${userId} banned from room ${roomId} by ${bannedBy}`);
   })

   socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
   });
});

app.prepare().then(() => {
   const PORT = parseInt(process.env.PORT || "3000", 10);
   httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
   });
});
