'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem('username');
    setUsername(null);
    setDropdownOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-lg font-bold text-gray-800 hover:text-blue-500">Home</Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/submit" className="text-lg text-gray-600 hover:text-blue-500">Submit</Link>
              <Link href="/submissions" className="text-lg text-gray-600 hover:text-blue-500">Submissions</Link>
              <Link href="/leaderboard" className="text-lg text-gray-600 hover:text-blue-500">Leaderboard</Link>
              {username && (
                <Link href="/profile" className="text-lg text-gray-600 hover:text-blue-500">Profile</Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Show Sign In/Register or Sign Out based on user state */}
            {username ? (
              <button
                onClick={handleSignOut}
                className="text-lg text-gray-800 hover:text-blue-500"
              >
                Sign Out
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/signin" className="text-lg text-gray-600 hover:text-blue-500">Sign In</Link>
                <Link href="/register" className="text-lg text-gray-600 hover:text-blue-500">Register</Link>
              </div>
            )}

            {/* Hamburger Icon for Mobile Menu */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-800 hover:text-blue-500 transition-colors duration-200 ease-in-out">
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
            <Link href="/submit" className="block text-lg text-gray-600 hover:text-blue-500 px-6 py-4">Submit</Link>
            <Link href="/submissions" className="block text-lg text-gray-600 hover:text-blue-500 px-6 py-4">Submissions</Link>
            <Link href="/leaderboard" className="block text-lg text-gray-600 hover:text-blue-500 px-6 py-4">Leaderboard</Link>
            {username && (
              <Link href="/profile" className="block text-lg text-gray-600 hover:text-blue-500 px-6 py-4">Profile</Link>
            )}
            {username ? (
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-6 py-4 text-lg text-gray-800 hover:text-blue-500"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/signin" className="block text-lg text-gray-600 hover:text-blue-500 px-6 py-4">Sign In</Link>
                <Link href="/register" className="block text-lg text-gray-600 hover:text-blue-500 px-6 py-4">Register</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="mt-24 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to 24HoursOrElse</h1>
        <p className="text-lg text-gray-600">Complete a new programming challenge every day!</p>
      </div>
    </main>
  );
}
