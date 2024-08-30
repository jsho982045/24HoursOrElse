'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../components/BackButton';

interface UserProfile {
  username: string;
  email: string;
  avatarUrl?: string;
  submissions?: string[];  // Mark submissions as optional
  ranking?: number;        // Placeholder for ranking data
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = localStorage.getItem('username');
      if (!storedUsername) {
        router.push('/signin');
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
          throw new Error('Failed to fetch user data');
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
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
          src={user.avatarUrl || '/default-avatar.PNG'} // Default avatar if none is provided
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
            user.submissions.map((submission, index) => (
              <li key={index}>{submission}</li>
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
    </div>
  );
}
