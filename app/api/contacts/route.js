// app/api/contacts/route.js
import connectMongo from '../../lib/mongodb';
import Contact from '../../models/Contacts';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectMongo();

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    // Fetch a single contact by ID
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
      }
      return NextResponse.json(contact, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Fetch all contacts
    try {
      const contacts = await Contact.find({});
      return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(req) {
  await connectMongo();

  const body = await req.json();
  const { fullname, email, phone, subject, message } = body;

  if (!fullname || !email || !phone || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const newContact = new Contact({
    fullname,
    email,
    phone,
    subject,
    message
  });

  try {
    await newContact.save();
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectMongo();

  const body = await req.json();
  const { id, fullname, email, phone, subject, message } = body;

  if (!id || !fullname || !email || !phone || !subject || !message) {
    return NextResponse.json({ error: 'ID and all fields are required' }, { status: 400 });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { fullname, email, phone, subject, message },
      { new: true }
    );
    if (!updatedContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectMongo();

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
