// Middleware for handling 404 Not Found errors.
// It creates a new Error object with a custom message and sets the response status to 404.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // Create a new error indicating the requested URL was not found
  res.status(404); // Set the HTTP status code to 404
  next(error); // Pass the error to the next error handler in the middleware chain
};

// Global error handling middleware.
// This function customizes the error response and handles specific Mongoose errors.
const errorHandler = (err, req, res, next) => {
  // Determine the status code: if the current status is 200 (OK), default to 500 (Internal Server Error).
  // Otherwise, use the current status code.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message; // The error message

  // Check if the error is a Mongoose "CastError" for an invalid ObjectId, common when a resource is not found.
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404; // Set status code to 404 Not Found
    message = 'Resource not found'; // Update the error message
  }

  // Send the error response, including the message and, if not in production, the error stack for debugging.
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide error stack in production for security
  });
};

// Export the middleware functions for use elsewhere in the application
export { notFound, errorHandler };
