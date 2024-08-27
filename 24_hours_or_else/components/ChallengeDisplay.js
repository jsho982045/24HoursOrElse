const ChallengeDisplay = ({ challenge }) => {
    return (
      <div className="challenge-display">
        <h2>Today's Challenge</h2>
        <p>{challenge}</p>
        <style jsx>{`
          .challenge-display {
            padding: 1rem;
            border: 1px solid #ddd;
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    );
  };
  
  export default ChallengeDisplay;
  