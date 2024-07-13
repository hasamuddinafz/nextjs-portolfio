// app/api/categories/route.js
import connectMongo from '../../lib/mongodb';
import Category from '../../models/Categories';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    // Fetch a single category by ID
    try {
      const category = await Category.findById(id).populate('parentCategory');
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json(category, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Fetch all categories
    try {
      const categories = await Category.find({}).populate('parentCategory');
      return NextResponse.json(categories, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(req) {
  await connectMongo();

  const body = await req.json();
  const { parentCategory, category } = body;

  if (!category) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
  }

  const newCategory = new Category({
    parentCategory,
    category
  });

  try {
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectMongo();

  const body = await req.json();
  const { id, parentCategory, category } = body;

  if (!id || !category) {
    return NextResponse.json({ error: 'ID and category name are required' }, { status: 400 });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { parentCategory, category },
      { new: true }
    ).populate('parentCategory');
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectMongo();

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
