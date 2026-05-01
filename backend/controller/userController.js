import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, "All fields are required", 400);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return errorResponse(res, "User already exists", 400);
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user.id, user.email);
  return successResponse(res, { token, user: user.name }, "User registered successfully", 201);
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.isMatch(password))) {
    return errorResponse(res, "Invalid email or password", 401);
  }

  const token = generateToken(user.id, user.email);
  return successResponse(res, { token, user: user.name }, "Logged in successfully");
});

/**
 * @desc    Login as a demo recruiter
 * @route   POST /api/users/demo-login
 * @access  Public
 */
export const demoLogin = asyncHandler(async (req, res) => {
  const demoEmail = "demo@leadlynx.com";
  let user = await User.findOne({ email: demoEmail });

  if (!user) {
    user = new User({
      name: "Demo Recruiter",
      email: demoEmail,
      password: "demo_password_123",
    });
    await user.save();
  }

  const token = generateToken(user.id, user.email);
  return successResponse(res, { token, user: user.name }, "Logged in as Demo User");
});
