'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    username: '',
    email: '',
    password: '',
  });

  // Debounce function to limit the number of API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const validateField = async (field: keyof FormState, value: string) => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, [field]: '' }));
      return;
    }

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, value }),
      });

      const data = await res.json();

      if (data.error) {
        setValidationErrors((prev) => ({ ...prev, [field]: data.error }));
      } else {
        setValidationErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } catch (error) {
      console.error('Error validating field:', error);
    }
  };

  const debouncedValidateField = useCallback(debounce(validateField, 300), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'username' || name === 'email') {
      debouncedValidateField(name as keyof FormState, value);
    }

    if (name === 'password' || name === 'confirmPassword') {
      validatePasswordMatch(value, name);
    }
  };

  const validatePasswordMatch = (value: string, field: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (
      (field === 'password' && value !== form.confirmPassword) ||
      (field === 'confirmPassword' && value !== form.password)
    ) {
      setValidationErrors((prev) => ({ ...prev, password: 'Passwords do not match' }));
    } else {
      setValidationErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validationErrors.username || validationErrors.email || validationErrors.password) {
      setMessage('Please resolve validation errors before submitting.');
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'An error occurred');
        return;
      }

      setMessage('User registered successfully!');
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {validationErrors.username && (
          <p className="text-red-500">{validationErrors.username}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {validationErrors.password && (
          <p className="text-red-500">{validationErrors.password}</p>
        )}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
