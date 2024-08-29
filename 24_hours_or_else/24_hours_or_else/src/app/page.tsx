'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if the user is logged in by looking for the username in localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('username'); // Clear username from localStorage
    setUsername(null); // Update state
    setDropdownOpen(false); // Close dropdown
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center py-4 border-b">
        <div>
          <Link href="/" className="text-lg font-bold">Home</Link>
          <Link href="/submit" className="ml-4 text-lg">Submit</Link>
          <Link href="/leaderboard" className="ml-4 text-lg">Leaderboard</Link>
          <Link href="/profile" className="ml-4 text-lg">Profile</Link>
        </div>
        <div>
          {username ? (
            <div className="relative">
              <button
                className="text-lg"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Hi, {username}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="mr-4 text-lg">Sign In</Link>
              <Link href="/register" className="text-lg">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to 24HoursOrElse</h1>
        <p className="text-lg">Complete a new programming challenge every day!</p>
      </div>
    </main>
  );
}
