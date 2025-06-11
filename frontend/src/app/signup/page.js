'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[url('/bg-signup.jpg')] bg-cover">

      {/* Left Side - Illustration (2/3 width, full height) */}
      <div className="w-2/3 h-screen text-white flex flex-col items-end justify-start p-10">
  <p className="text-3xl font-semibold  max-w-2xl text-white bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-none p-6 rounded-2xl shadow-xl">
    You're exactly where you need to be. Keep going.
  </p>
</div>
      {/* Right Side - Signup Form (1/3 width, full height) */}
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-screen bg-white/90 flex flex-col justify-center px-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Create Account 😁</h1>

        <div>
          <label className="text-gray-600 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#4a6fcb] to-[#2e4a8d] text-white font-semibold shadow hover:shadow-lg hover:from-[#3b5caa] hover:to-[#1a274d] transition-all"
        >
          Register
        </button>

        <p className="text-center text-md text-gray-600">
          Already have an account?
          <a href="/login" className="ml-2 text-blue-600 font-semibold underline hover:text-blue-800">Login</a>
        </p>
      </form>
    </div>
  );
}
