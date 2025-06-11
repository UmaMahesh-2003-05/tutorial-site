'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function ContactPage() {
  const { user } = useAuth();
  const [contact, setContact] = useState({ username: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setContact(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });

      if (res.ok) {
        setSubmitted(true);
        setContact({ username: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#2e4a8d] px-4 bg-[url('/noise-texture.png')] bg-cover overflow-hidden">
      <div className="bg-white mt-15 h-[86%] w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row items-center group transition-transform duration-500 ease-in-out">

        {/* Image Section */}
        <div className="md:w-1/2 w-full h-full p-4 bg-[#f5f7fa] flex items-center justify-center">
          <img
            src="/loginpic.png"
            alt="Contact Illustration"
            className="max-h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 w-full h-full p-6 overflow-y-auto space-y-4 bg-white flex flex-col justify-center"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Contact Us 📬</h1>

          {submitted && (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center text-sm font-semibold">
              Message sent successfully!
            </div>
          )}

          <div>
            <label className="text-gray-600 text-sm font-medium">Name</label>
            <input
              name="username"
              value={contact.username}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={contact.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="4"
              required
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4a6fcb] to-[#2e4a8d]
            text-white font-medium hover:from-[#3b5caa] hover:to-[#1a274d] transition-all shadow hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
