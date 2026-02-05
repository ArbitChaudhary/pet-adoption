import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
});

httpServer.listen(8080);
