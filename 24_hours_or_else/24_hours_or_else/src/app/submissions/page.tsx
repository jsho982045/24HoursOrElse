'use client';

import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';

interface Submission {
  _id: string;
  projectName: string;
  description: string;
  projectLink: string;
  submittedBy: string;
  submittedAt: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch('/api/submissions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch submissions');
        }

        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError('Failed to load submissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <BackButton />
      <h2 className="text-2xl font-bold mb-4">Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((submission) => (
            <li key={submission._id} className="p-4 border rounded shadow-sm">
              <h3 className="text-xl font-semibold">{submission.projectName}</h3>
              {submission.description && <p className="text-gray-600">{submission.description}</p>}
              <p>
                Submitted by: <strong>{submission.submittedBy}</strong> on{' '}
                {new Date(submission.submittedAt).toLocaleDateString()}
              </p>
              <a
                href={submission.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Project
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
