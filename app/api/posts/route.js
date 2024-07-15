// app/api/posts/route.js
import connectMongo from '../../lib/mongodb';
import Post from '../../models/Posts';
import Category from '../../models/Categories';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  console.log(id);

  if (id) {
    // Fetch a single post by ID
    try {
      const post = await Post.findById(id).populate('category');//////////////////////////////////////////////////////////////////////////////
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Fetch all posts
    try {
      const posts = await Post.find({}).populate('category');
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(req) {
  await connectMongo();

  const body = await req.json();
  const { title, description, image, category, tags } = body;

  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Title, description, and category are required' }, { status: 400 });
  }

  const post = new Post({
    title,
    description,
    image,
    category,
    tags,
  });

  try {
    await post.save();
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectMongo();

  const body = await req.json();
  const { id, title, description, image, category, tags } = body;

  if (!id || !title || !description || !category) {
    return NextResponse.json({ error: 'ID, title, description, and category are required' }, { status: 400 });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, description, image, category, tags },
      { new: true }
    ).populate('category');
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectMongo();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  console.log('Deleting post with ID:', id);

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}