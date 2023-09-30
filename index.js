import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const isDev = app.settings.env === "development";
const URL = isDev
  ? "http://localhost:5173"
  : "https://sketch-book-r1ln6d9gk-shankar7042.vercel.app";

app.use(cors({ origin: URL }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: URL,
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(3000);
