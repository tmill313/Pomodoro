import jwt from 'jsonwebtoken';

// Generates a JWT for a user and sets it as an HTTP-only cookie.
const generateToken = (res, userId) => {
  // Sign a new token with the user's ID, valid for 30 days.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  // Set the JWT as a secure, HTTP-only cookie in the response.
  res.cookie('jwt', token, {
    httpOnly: true, // Makes the cookie inaccessible to client-side scripts, enhancing security.
    secure: process.env.NODE_ENV !== 'development', // Enforces HTTPS in production.
    sameSite: 'strict', // Helps mitigate CSRF attacks.
    maxAge: 30 * 24 * 60 * 60 * 1000, // Sets cookie expiration to 30 days.
  });
};

export default generateToken;
