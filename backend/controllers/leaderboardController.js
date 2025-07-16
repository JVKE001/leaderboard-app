import User from "../models/User.js";

// Leaderboard controller
export const getLeaderboardController = async (req, res) => {
  try {
    // Pagination Setup
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count all users and get top users for this page
    const total = await User.countDocuments();
    const users = await User.find()
      .sort({ totalPoints: -1 })
      .skip(skip)
      .limit(limit);

    // Add name, points, and correct rank number for each user
    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: skip + index + 1,
    }));

    res.status(200).json({
      success: true,
      data: leaderboard,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
