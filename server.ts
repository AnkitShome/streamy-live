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

   socket.on("join", (userId: string) => {
      socket.join(userId);
      console.log(`🚪 [Server] User ${userId} joined room`);
   });

   // User joins a chat room (usually, the streamer's userId or streamId)
   socket.on("join", ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`👤 User ${userId} joined chat room ${roomId}`);
   })

   // Handle incoming chat message
   socket.on("chatMessage", async ({ roomId, userId, content }) => {
      // TODO: Check if user is banned here!

      const message = await prisma.chatMessage.create({
         data: {
            roomId,
            userId,
            content
         },
      })

      //Broadcast to room
      io.to(roomId).emit("chatMessage", {
         id: message.id,
         userId: message.userId,
         content: message.content,
         createdAt: message.createdAt
      })


      // (Moderation events: ban, delete, timeout, etc. will be added soon!)
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
