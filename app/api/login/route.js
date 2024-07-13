import connectMongo from '../../lib/mongodb';
import User from '../../models/Users';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongo();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 });
    }

    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const token = signToken({ id: user._id });

    // Set the token as a cookie in the response
    const response = NextResponse.json({ token });
    response.cookies.set('token', token, { maxAge: 60 * 60 * 24 * 7 }); // 7 days

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
