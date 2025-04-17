"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://mosiurislamwebdesign:ySwl9GuFWsYJJWaX@assignment-3.vq490.mongodb.net/assignment-3?retryWrites=true&w=majority&appName=assignment-3");
            // Create HTTP Server
            const httpServer = (0, http_1.createServer)(app_1.default);
            // Initialize Socket.IO
            const io = new socket_io_1.Server(httpServer, {
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
        }
        catch (error) {
            console.error("Database connection error:", error);
        }
    });
}
server();
