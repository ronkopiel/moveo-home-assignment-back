import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import codeBlockRoutes from './routes/codeBlocksRouter';
import dotenv from 'dotenv'
import { connectToDB } from './connections';

// Load environment variables from .env file
dotenv.config()

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

// Configure CORS options
const corsOptions = {
  origin: '*', // Allow all origins - couldnt get socket.io to work with the frontend url as the origin.
};

// Create an HTTP server and a Socket.IO server with the configured CORS options
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

// Connect to MongoDB
connectToDB()

// Middleware
app.use(cors()); // Enable CORS for Express app
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/codeblocks', codeBlockRoutes); // Use codeBlockRoutes for /api/codeblocks endpoint

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  // Event when a user joins a room
  socket.on("join", (codeBlockTitle) => {
    socket.join(codeBlockTitle);
    console.log(`User joined room: ${codeBlockTitle}`);

    //Make the first user to enter only have readonly access
    const clients = Array.from(io.sockets.adapter.rooms.get(codeBlockTitle) || []);
    if (clients.length > 1) {
      io.to(socket.id).emit("setEditor");
    }
  });

  // Event when a user updates the code
  socket.on("codeUpdate", (codeBlockTitle, newCode) => {
    socket.to(codeBlockTitle).emit("codeUpdate", newCode);
  });

  // Event when a user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected with ID: ${socket.id}`);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
