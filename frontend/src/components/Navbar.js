'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  const baseNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminNavItem = { name: 'Add Tutorial', path: '/add-tutorial' };

  const navItems = user?.role === 'admin' 
    ? [...baseNavItems, adminNavItem]
    : baseNavItems;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a1128] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-[#0a1128]">
        <div className="flex justify-between items-center">
          {/* Left side - Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-amber-400 hover:border-amber-300 transition-all duration-300"
            >
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
            >
              <Link href="/">LearningCurve</Link>
            </motion.div>
          </div>

          {/* Right side - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.path}
                  className="text-amber-100 hover:text-amber-300 font-medium relative group transition-colors"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 h-0.5 bg-amber-400 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}

            {user ? (
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-amber-200 text-sm">
                  Welcome, {user.email.split('@')[0]}
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md border border-amber-500 text-amber-100 hover:bg-amber-500 hover:text-navy-900 font-medium transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-md border border-amber-500 text-amber-100 hover:bg-amber-500 hover:text-navy-900 font-medium transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-md bg-amber-500 text-navy-900 hover:bg-amber-400 font-medium transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_15px_rgba(245,158,11,0.7)]"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-amber-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#0f1a3a] shadow-xl px-4 py-4 mt-3 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.path}
                    className="block py-2 text-amber-100 hover:text-amber-300 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <div className="pt-4 border-t border-amber-500/20 space-y-4">
                  <div className="text-amber-200 text-sm">
                    Welcome, {user.email.split('@')[0]}
                  </div>
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 rounded-md border border-amber-500 text-amber-100 hover:bg-amber-500 hover:text-navy-900 font-medium transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="pt-4 border-t border-amber-500/20 space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/login"
                      className="block w-full py-2 text-center rounded-md border border-amber-500 text-amber-100 hover:bg-amber-500 hover:text-navy-900 font-medium transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/signup"
                      className="block w-full py-2 text-center rounded-md bg-amber-500 text-navy-900 hover:bg-amber-400 font-medium transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
