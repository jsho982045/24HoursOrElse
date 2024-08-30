// src/app/api/profile/route.js
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET(req) {
  await dbConnect();

  // Assuming the username is passed as a query parameter
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(
      JSON.stringify({ error: 'Username is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const user = await User.findOne({ username }).select('-password'); // Exclude password field

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(user),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response(
      JSON.stringify({ error: 'Error fetching user data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
