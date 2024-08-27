"use client";
import Navbar from '../components/Navbar'
import CountdownTimer from '../components/CountdownTimer'
import ChallengeDisplay from '../components/ChallengeDisplay'



export default function Home() {

  const challenge = "Build a basic to-do app using HTML, CSS and JavaScript.";
  const deadline = new Date(new Date().getTime() + 16 * 60 * 60 * 1000);
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to 24 Hours Or Else</h1>
        <ChallengeDisplay challenge={challenge} />
        <CountdownTimer deadline={deadline} />
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
