import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";

async function server() {
  try {
    await mongoose.connect(
      "mongodb+srv://mosiurislamwebdesign:ySwl9GuFWsYJJWaX@assignment-3.vq490.mongodb.net/assignment-3?retryWrites=true&w=majority&appName=assignment-3"
    );

    // Create HTTP Server
    const httpServer = createServer(app);

    // Initialize Socket.IO
    const io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "https://epiccoder.hac.soukhin.shop"],
      },
    });

    // Handle Socket.IO connections
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle receiving notifications
      socket.on("send_notification", (data) => {
        console.log("Notification received:", data);

        // Broadcast to all connected clients
        io.emit("receive_notification", data);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    // Start server
    httpServer.listen(3000, () => {
      console.log(`boitoi Server is running on port 3000 - Alhamdulillah 🚀`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

server();
