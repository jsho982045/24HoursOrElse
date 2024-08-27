"use client";

import { useState } from 'react';

const SubmissionForm = () => {
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation check
    if (!code && !file) {
      setMessage('Please submit either code or a file.');
      return;
    }

    // Here you would typically send data to your backend
    // Example: Upload code to an API endpoint

    setMessage('Submission received!');
  };

  return (
    <div className="submission-form">
      <h2>Submit Your Solution</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
        ></textarea>
        <br />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .submission-form {
          margin-top: 2rem;
          padding: 1rem;
          border: 1px solid #ddd;
        }
        textarea {
          width: 100%;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default SubmissionForm;
