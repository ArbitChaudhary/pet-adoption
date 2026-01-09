import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.ts";
import cors from "cors";

// import routes
import userRoute from "./routes/user.route.ts";
import teamRoute from "./routes/team.route.ts";
import blogRoute from "./routes/blog.route.ts";
import petRoute from "./routes/pet.route.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

// connect to the database
connectDB();

app.use("/api/v1/users", userRoute);
app.use("/api/v1/teams", teamRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/pets", petRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
