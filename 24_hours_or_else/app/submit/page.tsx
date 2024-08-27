"use client";

import Navbar from '../../components/Navbar';
import SubmissionForm from '../../components/SubmissionForm';

export default function Submit() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Submit Your Solution</h1>
        <SubmissionForm />
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
