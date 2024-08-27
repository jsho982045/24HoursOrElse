"use client";

const Leaderboard = () => {
  // Mock data for demonstration purposes
  const mockData = [
    { username: 'coder1', time: '2 hours' },
    { username: 'coder2', time: '3 hours' },
    { username: 'coder3', time: '5 hours' },
  ];

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {mockData.map((user, index) => (
          <li key={index}>
            {index + 1}. {user.username} - {user.time}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .leaderboard {
          margin-top: 2rem;
          padding: 1rem;
          border: 1px solid #ddd;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
