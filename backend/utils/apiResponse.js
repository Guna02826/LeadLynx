/**
 * Standard Success Response
 * @param {Object} res - Express response object
 * @param {any} data - Data to send back
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
export const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard Error Response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default 500)
 * @param {any} error - Original error object for logging/debugging
 */
export const errorResponse = (res, message = "Something went wrong", statusCode = 500, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error,
  });
};
