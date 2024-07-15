// ./app/utils/jwt.js

import { SignJWT, jwtVerify } from 'jose';

// Function to sign JWT token
export async function signToken(payload) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d') // Token expires in 7 days
      .sign(secret);

    return token;
  } catch (error) {
    console.error('JWT Signing Error:', error);
    throw new Error('Failed to sign JWT token');
  }
}

// Function to verify JWT token
export async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Optionally verify the token's expiration (adjust as per your needs)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTimestamp) {
      throw new Error('Token expired');
    }

    return payload; // Return the decoded payload if verification is successful
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw new Error('Invalid token');
  }
}
