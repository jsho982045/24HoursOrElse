"use client";

import Navbar from '../../components/Navbar';
import Profile from '../../components/Profile';

export default function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Your Profile</h1>
        <Profile />
      </div>
      <style jsx>{`
        .container {
          padding: 2rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
