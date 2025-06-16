'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
        method: 'GET',
        credentials: 'include',
      });

      const userData = await userRes.json();
      if (userRes.ok) {
        setUser(userData);
        router.push('/');
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6"
      style={{ backgroundImage: `url('/bg-login1.jpg')` }}
    >
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        
        {/* Login Form */}
        <div className="col-span-12 md:col-span-4 backdrop-blur-lg border border-white/70 p-6 md:p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-8">
            {/* Heading */}
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 animate-pulse text-center">
              Log in to your account 
            </h1>

            {/* Email Field */}
            <div>
              <label className="text-white text-sm font-medium mb-1 block">Email Address :</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-3.5 w-5 h-5 text-amber-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all placeholder-gray-500"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 text-white font-semibold hover:brightness-110 hover:shadow-lg hover:shadow-purple-400/40 transition-all"
            >
              Login
            </button>

            <p className="text-sm text-white text-center">
              Don’t have an account?
              <a href="/signup" className="ml-1 text-blue-600 font-semibold underline hover:text-blue-800">Sign up</a>
            </p>
          </form>
        </div>

        {/* Quote */}
        <div className="hidden md:flex col-span-8 items-start justify-start px-10  text-white">
          <p className="text-3xl text-transparent bg-clip-text font-bold leading-snug max-w-2xl bg-gradient-to-br from-white to-blue-300 p-6 rounded-2xl shadow-xl">
            If you regret your past, this is the perfect moment to rewrite your future.
          </p>
        </div>
      </div>
    </div>
  );
}
