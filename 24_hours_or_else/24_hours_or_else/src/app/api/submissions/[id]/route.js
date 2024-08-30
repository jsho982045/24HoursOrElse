import dbConnect from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import Submission from '../../../../../models/Submission';

export async function DELETE(req) {
  await dbConnect();

  const { pathname } = new URL(req.url);
  const submissionId = pathname.split('/').pop();

  if (!submissionId) {
    return new Response(
      JSON.stringify({ error: 'Submission ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Find the submission and delete it
    const submission = await Submission.findByIdAndDelete(submissionId);
    if (!submission) {
      return new Response(
        JSON.stringify({ error: 'Submission not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the user who submitted this and remove the reference from their submissions array
    await User.updateOne(
      { submissions: submissionId },
      { $pull: { submissions: submissionId } }
    );

    return new Response(
      JSON.stringify({ message: 'Submission deleted successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting submission:', error);
    return new Response(
      JSON.stringify({ error: 'Error deleting submission' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
