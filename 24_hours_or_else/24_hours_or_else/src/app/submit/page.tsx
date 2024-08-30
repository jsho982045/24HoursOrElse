'use client';

import { useState } from 'react';
import BackButton from '../../components/BackButton';

export default function SubmitPage() {
  const [form, setForm] = useState({ projectName: '', description: '', projectLink: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple client-side validation
    if (!form.projectName || !form.projectLink) {
      setMessage('Project name and project link are required.');
      return;
    }

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.error || 'An error occurred while submitting the project.');
        return;
      }

      setMessage('Project submitted successfully!');
      setForm({ projectName: '', description: '', projectLink: '' });
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
        <input
          type="url"
          name="projectLink"
          placeholder="GitHub Repository or Project URL"
          value={form.projectLink}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
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
