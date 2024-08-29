import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'User not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(
      JSON.stringify({ error: 'Invalid credentials' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // If successful, return the username
  return new Response(
    JSON.stringify({ username: user.username }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

// This ensures that any non-POST request will return a 405 error
export async function GET(req) {
  return new Response('Method Not Allowed', { status: 405 });
}
