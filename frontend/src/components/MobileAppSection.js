'use client';
import { motion } from 'framer-motion';
import { Smartphone, Check, ArrowRight, Apple, Store as PlayStore } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function MobileAppSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center lg:text-left">
              <motion.div 
                className="inline-block p-3 bg-blue-100 rounded-full mb-6"
                whileHover={{ rotate: 10 }}
              >
                <Smartphone className="h-8 w-8 text-[#243b6d]" />
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                initial={{ y: -20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Your Learning Journey,{' '}
                <span className="text-amber-400">Now Mobile</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Get ready for a seamless learning experience on the go. Our mobile app is being crafted to help you master programming from anywhere, anytime.
              </motion.p>

              {/* Features */}
              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[
                  'Offline access to courses',
                  'Interactive code playground',
                  'Progress tracking',
                  'Practice exercises'
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3"
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-[#243b6d]" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Notification Form */}
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="max-w-md mx-auto lg:mx-0">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2e4a8d] focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#243b6d] text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:bg-[#243b6d]"
                    >
                      <span>Notify Me</span>
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>
                </div>
                {isSubscribed && (
                  <motion.div 
                    className="text-green-600 flex items-center justify-center lg:justify-start space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Check className="h-5 w-5" />
                    <span>You'll be notified when the app launches!</span>
                  </motion.div>
                )}
              </motion.form>

              {/* App Store Badges */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm text-gray-500 mb-4 text-center lg:text-left">Coming soon to:</p>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 text-white opacity-75 cursor-not-allowed">
                    <Apple className="h-5 w-5" />
                    <span>App Store</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 text-white opacity-75 cursor-not-allowed">
                    <PlayStore className="h-5 w-5" />
                    <span>Play Store</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div 
            className="mt-12 lg:mt-0 lg:w-1/2"
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative max-w-xs mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transform rotate-12 rounded-3xl"></div>
              <motion.div 
                className="relative bg-white p-4 rounded-3xl shadow-xl border-8 border-gray-900 aspect-[9/19]"
                whileHover={{ y: -10 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl"></div>
                <div className="h-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center p-4">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse' 
                      }}
                    >
                      <Smartphone className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-700 font-medium">App Preview Coming Soon</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}