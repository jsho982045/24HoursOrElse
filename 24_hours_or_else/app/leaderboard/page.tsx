"use client";

import Navbar from '../../components/Navbar';
import Leaderboard from '../../components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Leaderboard</h1>
        <Leaderboard />
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
