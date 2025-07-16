import express from "express";

// User controller imports
import {
  createUserController,
  getUserByIdController,
  getAllUsersController,
} from "../controllers/userController.js";

// Claims controller imports
import {
  claimPointsController,
  getClaimHistoryController,
} from "../controllers/claimController.js";

// Leaderboard controller imports
import { getLeaderboardController } from "../controllers/leaderboardController.js";

const router = express.Router();

// User routes
router.post("/users", createUserController);
router.get("/users/:userId", getUserByIdController);
router.get("/all-users", getAllUsersController);

// Claim routes
router.post("/claim/:userId", claimPointsController);
router.get("/claim-history/:userId", getClaimHistoryController);

// Leaderboard routes
router.get("/leaderboard", getLeaderboardController);

export default router;
