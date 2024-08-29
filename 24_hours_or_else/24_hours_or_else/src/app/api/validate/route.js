import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  await dbConnect();

  const { field, value } = await req.json();

  if (!field || !value) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    let existingUser = null;

    if (field === 'email') {
      existingUser = await User.findOne({ email: value });
    } else if (field === 'username') {
      existingUser = await User.findOne({ username: value });
    }

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: `${field} already exists` }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: `${field} is available` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error checking field:', error);
    return new Response(
      JSON.stringify({ error: 'Error checking field' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
