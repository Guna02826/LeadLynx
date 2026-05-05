import generateToken from "./generateToken.js";
import { successResponse } from "./apiResponse.js";

/**
 * @desc    Generate token, set cookie and send response
 * @param   {Object} user - User object
 * @param   {Number} statusCode - HTTP status code
 * @param   {Object} res - Response object
 * @param   {String} message - Success message
 */
const sendToken = (user, statusCode, res, message) => {
  const token = generateToken(user.id, user.email);

  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    httpOnly: true,
    secure: isProduction, // Must be true for sameSite: 'none'
    sameSite: isProduction ? "none" : "lax",
    path: "/", // Ensure cookie is accessible across all paths
  };

  res.cookie("token", token, cookieOptions);

  // We still send the user object but exclude the token from the body
  // to emphasize that the cookie is the primary auth mechanism.
  return successResponse(res, { user: user.name }, message, statusCode);
};

export default sendToken;
