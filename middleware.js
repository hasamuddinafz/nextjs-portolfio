// app/middleware.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from './app/utils/jwt'; // Adjust the path if needed

export async function middleware(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  console.log('Token:', token);

  if (!token || !token.value) {
    console.log('No token found or token value is missing, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = await verifyToken(token.value);
    console.log('Token verified:', decodedToken);

    // Proceed with the next middleware or handler
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Redirect to login page on token verification failure
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Apply this middleware to admin routes
};
