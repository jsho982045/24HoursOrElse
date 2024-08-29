import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  const { username, email, password, confirmPassword } = await req.json();

  // Check if all fields are provided
  if (!username || !email || !password || !confirmPassword) {
    return new Response(
      JSON.stringify({ error: 'Please provide all fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({ error: 'Passwords do not match' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return new Response(
        JSON.stringify({ error: 'User already exists with this email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return new Response(
        JSON.stringify({ error: 'User already exists with this username' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return new Response(
      JSON.stringify({ message: 'User created successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(
      JSON.stringify({ error: 'Error creating user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
