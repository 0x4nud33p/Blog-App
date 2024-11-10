import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import userroutes from './routes/user.routes.js';
import blogroutes from  './routes/blog.routes.js';

const app = express();
dotenv.config();
connectDB();

app.use(
  cors({
    origin: "https://blog-app-coral-one.vercel.app",
  })
);

const port = process.env.PORT || 5050;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Started...");
});

app.use("/api", userroutes);
app.use("/user/blog", blogroutes);

app.listen(port, () => {
  console.log(`App is listening on port: http://localhost:${port}`);
});
