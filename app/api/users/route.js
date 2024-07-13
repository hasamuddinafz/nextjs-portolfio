// pages/api/users.js
import connectMongo from '../../lib/mongodb';
import User from '../../models/Users';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectMongo();

  try {
    const users = await User.find({});
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  await connectMongo();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  await connectMongo();

  const { id, name, email, password } = await req.json();

  if (!id || !name || !email || !password) {
    return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  await connectMongo();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new NextResponse(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
