import dbConnect from '../../../../lib/mongodb';
import mongoose from 'mongoose';

// Define the submission schema if not already defined
const submissionSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, default: '' },
  projectLink: { type: String, required: true },
  submittedBy: { type: String, required: true }, // To store the username of the submitter
  submittedAt: { type: Date, default: Date.now },
});

// Create the submission model if it doesn't exist
const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

export async function POST(req) {
  try {
    await dbConnect();

    const { projectName, description, projectLink } = await req.json();
    const username = 'test'; // Replace this with the actual user data from the session

    // Basic validation
    if (!projectName || !projectLink) {
      return new Response(
        JSON.stringify({ error: 'Project name and project link are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new submission
    const newSubmission = new Submission({
      projectName,
      description,
      projectLink,
      submittedBy: username,
    });

    // Save the submission to the database
    await newSubmission.save();

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

export async function GET(req) {
  try {
    await dbConnect();

    const submissions = await Submission.find({}).sort({ submittedAt: -1 }); // Sort submissions by date
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
