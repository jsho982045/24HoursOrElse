// models/Submission.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, default: '' },
  projectLink: { type: String, required: true },
  submittedBy: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
export default Submission;
