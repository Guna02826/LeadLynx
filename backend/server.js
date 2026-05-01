import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import leadRoute from "./routes/LeadRoute.js";
import campaignRoute from "./routes/campaignRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config({ quiet: true, override: true });

const app = express();
connectDB();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userRoute);
app.use("/api/leads", leadRoute);
app.use("/api/campaigns", campaignRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("The app is running");
});
