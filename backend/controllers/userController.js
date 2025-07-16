import User from "../models/User.js";

// Create user controller
export const createUserController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation name input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Create and save new user
    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get user by id controller
export const getUserByIdController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    // handle user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all users controller
export const getAllUsersController = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find({}, "_id name");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
