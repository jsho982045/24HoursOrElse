'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem('username');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('username');
    setUsername(null);
    setDropdownOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <nav className="w-full fixed top-0 left-0 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-lg font-bold text-gray-800 hover:text-blue-500">Home</Link>
            <Link href="/submit" className="text-lg text-gray-600 hover:text-blue-500">Submit</Link>
            <Link href="/leaderboard" className="text-lg text-gray-600 hover:text-blue-500">Leaderboard</Link>
            <Link href="/profile" className="text-lg text-gray-600 hover:text-blue-500">Profile</Link>
          </div>
          <div>
            {username ? (
              <div className="relative">
                <button
                  className="text-lg text-gray-800"
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
                <Link href="/signin" className="mr-4 text-lg text-gray-600 hover:text-blue-500">Sign In</Link>
                <Link href="/register" className="text-lg text-gray-600 hover:text-blue-500">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="mt-24 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to 24HoursOrElse</h1>
        <p className="text-lg text-gray-600">Complete a new programming challenge every day!</p>
      </div>
    </main>
  );
}
