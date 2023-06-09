"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const codeBlocksRouter_1 = __importDefault(require("./routes/codeBlocksRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const connections_1 = require("./connections");
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'https://move-codeblock-front.onrender.com/'
    },
});
// Connect to MongoDB
(0, connections_1.connectToDB)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/codeblocks', codeBlocksRouter_1.default);
io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);
    socket.on("join", (codeBlockTitle) => {
        socket.join(codeBlockTitle);
        console.log(`User joined room: ${codeBlockTitle}`);
        const clients = Array.from(io.sockets.adapter.rooms.get(codeBlockTitle) || []);
        if (clients.length > 1) {
            io.to(socket.id).emit("setEditor");
        }
    });
    socket.on("codeUpdate", (codeBlockTitle, newCode) => {
        socket.to(codeBlockTitle).emit("codeUpdate", newCode);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected with ID: ${socket.id}`);
    });
});
// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map