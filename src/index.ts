import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.ts";
import cors from "cors";
import bodyParser from "body-parser";

// import routes
import userRoute from "./routes/user.route.ts";
import teamRoute from "./routes/team.route.ts";
import blogRoute from "./routes/blog.route.ts";
import petRoute from "./routes/pet.route.ts";
import orderRoute from "./routes/orders.route.ts";
import wishlistRoute from "./routes/wishlist.route.ts";
import webhookRoute from "./routes/webhook.route.ts";
import notificationRoute from "./routes/notification.route.ts";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);

app.use("/api/v1/webhook", webhookRoute);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

// connect to the database
connectDB();

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("socketio", io);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/teams", teamRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/pets", petRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/notifications", notificationRoute);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
