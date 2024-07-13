// ./app/utils/jwt.js

import jwt from 'jsonwebtoken';

// JWT Secret (replace with your actual secret)
// Function to sign JWT token
export function signToken(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }); // Token expires in 7 days
    return token;
  } catch (error) {
    console.error('JWT Signing Error:', error);
    throw new Error('Failed to sign JWT token');
  }
}

// Function to verify JWT token
export function verifyToken(token) {
  try {
    const decoded = jwt.decode(token, { complete: true }); // Decode the token to get header and payload

    if (!decoded) {
      throw new Error('Invalid token');
    }

    // Optionally verify the token's expiration (adjust as per your needs)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.payload.exp && decoded.payload.exp < currentTimestamp) {
      throw new Error('Token expired');
    }

    return decoded.payload; // Return the decoded payload if verification is successful
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw new Error('Invalid token');
  }
}
