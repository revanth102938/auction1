import express from "express";
import {
  placebid,
  getallbidsofauction,
  getallbidsbyme,
  gethighestbidforauction
} from "../controllers/bid.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = express.Router();

// Place a bid - protected route
router.post("/place", verifyjwt, placebid);

// Get all bids of a specific auction
router.get("/:auctionid", getallbidsofauction);

// Get all bids placed by the logged-in user
router.get("/my", verifyjwt, getallbidsbyme);

// Get highest bid for a specific auction
router.get("/highest/:id", gethighestbidforauction);

export default router;
