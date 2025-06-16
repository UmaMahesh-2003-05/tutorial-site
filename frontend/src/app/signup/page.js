'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6"
      style={{ backgroundImage: `url('/bg-signup.jpg')` }}
    >
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Left: Quote */}
        <div className="hidden md:flex col-span-8 items-start justify-start px-18 text-white">
          <p className="text-3xl text-transparent bg-clip-text font-bold leading-snug max-w-2xl bg-gradient-to-br from-white to-amber-100 p-6 rounded-2xl shadow-xl">
            You&rsquo;re exactly where you need to be. Keep going.
          </p>
        </div>

        {/* Right: Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="col-span-12 md:col-span-4 backdrop-blur-md border border-white/70 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg flex flex-col justify-center space-y-8"
        >
          {/* Glowing Heading */}
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-pulse text-center">
            Create your account 
          </h1>

          {/* Name Field */}
          <div>
            <label className="text-white text-sm font-medium mb-1 block">Name :</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3.5 w-5 h-5 text-amber-600" />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-white text-sm font-medium mb-1 block">Email Address :</label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-3.5 w-5 h-5 text-amber-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-white text-sm font-medium mb-1 block">Password :</label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-3.5 w-5 h-5 text-amber-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 text-white font-semibold hover:brightness-110 hover:shadow-lg hover:shadow-purple-400/40 transition-all"
          >
            Register
          </button>

          {/* Footer */}
          <p className="text-sm text-white text-center">
            Already have an account?
            <a href="/login" className="ml-1 text-blue-600 font-semibold underline hover:text-blue-800">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
