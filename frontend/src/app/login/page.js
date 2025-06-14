'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

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
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left: Login Form */}
        <div className="col-span-12 md:col-span-4 bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg shadow-lg flex flex-col justify-center">
          <form onSubmit={handleLogin} className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Log in to your account 😊</h1>

            <div>
              <label className="text-gray-600 text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#4a6fcb] to-[#2e4a8d] text-white font-medium hover:from-[#3b5caa] hover:to-[#1a274d] transition shadow hover:shadow-md"
            >
              Login
            </button>

            <p className="text-sm text-gray-600 text-center">
              Don’t have an account?
              <a href="/signup" className="ml-1 text-blue-600 font-semibold underline hover:text-blue-800">Sign up</a>
            </p>
          </form>
        </div>

        {/* Right: Quote Text */}
        <div className="hidden md:flex col-span-8 items-start justify-start px-10  text-white">
          <p className="text-3xl font-semibold leading-snug max-w-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl shadow-xl">
            If you regret your past, this is the perfect moment to rewrite your future.
          </p>
        </div>
      </div>
    </div>
  );
}
