import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import codeBlockRoutes from './routes/codeBlocksRouter';
import dotenv from 'dotenv'
import { connectToDB } from './connections';
dotenv.config()

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: 'https://move-codeblock-front.onrender.com/',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
};

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

// Connect to MongoDB
connectToDB()
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/codeblocks', codeBlockRoutes);


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
