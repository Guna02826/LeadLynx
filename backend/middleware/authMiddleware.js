import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { errorResponse } from "../utils/apiResponse.js";

/**
 * @desc    Middleware to protect routes - verifies JWT token
 * @access  Private
 */
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return errorResponse(res, "No token provided, authorization denied", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return errorResponse(res, "User associated with this token no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", 401, error);
  }
};

export default protect;
