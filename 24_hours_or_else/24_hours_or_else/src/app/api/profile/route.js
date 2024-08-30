import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import Submission from '../../../../models/Submission'; // Ensure correct path

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(
      JSON.stringify({ error: 'Username is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username }).select('-password');

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find submissions by the user's username
    const submissions = await Submission.find({ submittedBy: username });

    // Combine user data and submissions
    const userDataWithSubmissions = {
      ...user.toObject(),
      submissions, // Add fetched submissions to user data
    };

    return new Response(
      JSON.stringify(userDataWithSubmissions),
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
