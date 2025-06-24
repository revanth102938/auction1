import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


import userRouter from './routes/user.routes.js';
app.use("/api/v1/users", userRouter);

import auctionRequestRoutes from "./routes/auctionrequest.routes.js";
app.use("/api/v1/auctionrequests", auctionRequestRoutes);

import auctionRoutes from "./routes/auction.routes.js";
app.use("/api/v1/auctions", auctionRoutes);

import adminRoutes from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRoutes);

import bidRoutes from "./routes/bid.routes.js";
app.use("/api/v1/bid", bidRoutes);

export default app;
