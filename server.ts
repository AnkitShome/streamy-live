import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import next from "next";
import dotenv from "dotenv";

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
