'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '../../components/BackButton';
import ConfirmModal from '../../components/ConfirmModal'; // Import the modal

interface UserProfile {
  username: string;
  email: string;
  avatarUrl?: string;
  submissions?: {
    _id: string;
    projectName: string;
    description: string;
    projectLink: string;
    submittedAt: string;
  }[];
  ranking?: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null); // State for selected submission ID
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = sessionStorage.getItem('username');
      if (!storedUsername) {
        setError('User not signed in.');
        return;
      }

      try {
        const res = await fetch(`/api/profile?username=${storedUsername}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          setError('Failed to fetch user data.');
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleDelete = async () => {
    if (!selectedSubmissionId) return;

    try {
      const res = await fetch(`/api/submissions/${selectedSubmissionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete submission');
      }

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          submissions: prevUser.submissions?.filter((submission) => submission._id !== selectedSubmissionId),
        };
      });
      setIsModalOpen(false); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting submission:', error);
      setError('Failed to delete submission.');
    }
  };

  const openModal = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmissionId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <Image
          src={user.avatarUrl || '/default-avatar.PNG'}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-xl font-bold">{user.username}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Previous Submissions */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Previous Submissions</h3>
        <ul className="list-disc ml-5">
          {user.submissions && user.submissions.length > 0 ? (
            user.submissions.map((submission) => (
              <li key={submission._id} className="flex justify-between items-center">
                <div>
                  <a
                    href={submission.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {submission.projectName}
                  </a> - {new Date(submission.submittedAt).toLocaleDateString()}
                </div>
                <div
                  onClick={() => openModal(submission._id)}
                  className="ml-4 cursor-pointer"
                >
                  {/* New SVG Delete Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600 hover:text-red-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </li>
            ))
          ) : (
            <li>No submissions found</li>
          )}
        </ul>
      </div>

      {/* Ranking */}
      {user.ranking !== undefined && (
        <div>
          <h3 className="text-lg font-semibold">Leaderboard Ranking</h3>
          <p>Ranked #{user.ranking}</p>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this submission?"
        onConfirm={handleDelete}
        onCancel={closeModal}
      />
    </div>
  );
}
