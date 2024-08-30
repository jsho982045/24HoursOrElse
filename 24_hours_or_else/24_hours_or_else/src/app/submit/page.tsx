'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import BackButton from '../../components/BackButton';

export default function SubmitPage() {
  const [form, setForm] = useState({ projectName: '', description: '', projectLink: '', file: null });
  const [uploadMethod, setUploadMethod] = useState('link'); // Default method is 'link'
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple client-side validation
    if (!form.projectName || (!form.projectLink && !form.file)) {
      setMessage('Project name and project link or file are required.');
      return;
    }

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form), // You may need to handle file uploads differently
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'An error occurred while submitting the project.');
        return;
      }

      setMessage('Project submitted successfully!');
      setForm({ projectName: '', description: '', projectLink: '', file: null });

      // Redirect to submissions page after successful submission
      router.push('/submissions');
    } catch (error) {
      console.error('Error submitting project:', error);
      setMessage('An error occurred while submitting the project.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Submit Your Project</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description (Optional)"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Radio buttons for choosing upload method */}
        <div>
          <label className="mr-4">
            <input
              type="radio"
              value="link"
              checked={uploadMethod === 'link'}
              onChange={() => setUploadMethod('link')}
            />
            GitHub/URL
          </label>
          <label className="mr-4">
            <input
              type="radio"
              value="file"
              checked={uploadMethod === 'file'}
              onChange={() => setUploadMethod('file')}
            />
            Upload File
          </label>
          <label>
            <input
              type="radio"
              value="googleDrive"
              checked={uploadMethod === 'googleDrive'}
              onChange={() => setUploadMethod('googleDrive')}
            />
            Google Drive
          </label>
        </div>

        {/* Conditionally render the input fields based on the selected method */}
        {uploadMethod === 'link' && (
          <input
            type="url"
            name="projectLink"
            placeholder="GitHub Repository or Project URL"
            value={form.projectLink}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required={uploadMethod === 'link'}
          />
        )}

        {uploadMethod === 'file' && (
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required={uploadMethod === 'file'}
          />
        )}

        {/* Google Drive integration will involve another component/button */}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
