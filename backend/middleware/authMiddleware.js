// Import the required modules
import jwt from 'jsonwebtoken'; // Used for decoding JWTs
import asyncHandler from 'express-async-handler'; // Middleware for handling exceptions in async routes
import User from '../models/userModel.js'; // User model for accessing the user database

// Define the protect middleware function
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Attempt to retrieve the JWT from cookies
  token = req.cookies.jwt;

  // Proceed if a token exists
  if (token) {
    try {
      // Verify the token using the secret and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the ID in the decoded token, excluding their password from the result
      req.user = await User.findById(decoded.userId).select('-password');

      // Call next() to pass control to the next middleware/route handler
      next();
    } catch (error) {
      // If token verification fails, log the error and respond with a 401 Unauthorized status
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    // If no token is found, respond with a 401 Unauthorized status
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Export the protect middleware for use in other parts of the application
export { protect };
