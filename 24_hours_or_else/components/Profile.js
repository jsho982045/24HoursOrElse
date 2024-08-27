"use client";

const Profile = () => {
  // Mock data for user profile
  const mockUserProfile = {
    username: 'coder1',
    challengesCompleted: 5,
    fastestTime: '1.5 hours'
  };

  return (
    <div className="profile">
      <h2>{mockUserProfile.username}'s Profile</h2>
      <p>Challenges Completed: {mockUserProfile.challengesCompleted}</p>
      <p>Fastest Time: {mockUserProfile.fastestTime}</p>
      <style jsx>{`
        .profile {
          margin-top: 2rem;
          padding: 1rem;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default Profile;
