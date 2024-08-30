import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import Submission from '../../../../models/Submission'; // Import the Submission model

export async function GET(req) {
  try {
    await dbConnect();

    const submissions = await Submission.find({}).sort({ submittedAt: -1 });
    return new Response(
      JSON.stringify(submissions),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch submissions' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const { projectName, description, projectLink } = await req.json();
    const username = 'test'; // Replace with actual session-based username retrieval

    if (!projectName || !projectLink) {
      return new Response(
        JSON.stringify({ error: 'Project name and project link are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newSubmission = new Submission({
      projectName,
      description,
      projectLink,
      submittedBy: username,
    });

    const savedSubmission = await newSubmission.save();

    user.submissions.push(savedSubmission._id);
    await user.save();

    return new Response(
      JSON.stringify({ message: 'Project submitted successfully!' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving submission:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while submitting the project.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
