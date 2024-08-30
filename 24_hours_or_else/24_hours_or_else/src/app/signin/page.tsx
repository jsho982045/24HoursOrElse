'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../../components/BackButton';

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log('API Response:', data);  // Debug: Log API response

      if (!res.ok) {
        setMessage(data.error || 'An error occurred');
        return;
      }

      // Store username in sessionStorage
      sessionStorage.setItem('username', data.username);
      setMessage('Signed in successfully!');

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setMessage('An error occurred while signing in.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <BackButton />
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
