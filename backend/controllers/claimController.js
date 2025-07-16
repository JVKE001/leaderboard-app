import User from "../models/User.js";
import ClaimHistory from "../models/Claim.js";

// Claim points controller
export const claimPointsController = async (req, res) => {
  try {
    const { userId } = req.params;

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate random points from (1 to 10)
    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    // Log this claim in history
    const history = new ClaimHistory({
      userId,
      points,
    });
    await history.save();

    res.status(200).json({
      success: true,
      message: `${points} points claimed`,
      data: {
        user,
        claimedPoints: points,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Claim history controller
export const getClaimHistoryController = async (req, res) => {
  try {
    const { userId } = req.params;

    // find and sort claim history by most recent
    const history = await ClaimHistory.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
