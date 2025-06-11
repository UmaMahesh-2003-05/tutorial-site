// components/HeroSection.js
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef(null);

  const sliderItems = [
    {
      name: 'Interactive Tutorials',
      description: 'Step-by-step guides to master programming concepts.',
      icon: '📘',
    },
    {
      name: 'Coding Games',
      description: 'Solve puzzles and challenges while learning to code.',
      icon: '🎮',
    },
    {
      name: 'Integrated Compiler',
      description: 'Write and run code instantly in the browser.',
      icon: '💻',
    },
    {
      name: 'Video Lessons',
      description: 'Watch high-quality video tutorials from experts.',
      icon: '🎥',
    },
  ];

  useEffect(() => {
    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 3000);

    return () => clearInterval(sliderInterval.current);
  }, [sliderItems.length]);

  return (
    <section className="min-h-screen flex flex-col bg-[url('/bgimg3.jpg')] justify-center items-center px-6">
      
      <div className="w-full flex flex-col md:flex-row max-w-6xl mx-auto relative z-10">
        {/* Left column (2/3 width) for text content */}
        <div className="w-full md:w-2/3 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-6xl text-white font-extrabold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ textShadow: '2px 2px 0px #000' }}>Create Your Career with</span>
            <span 
              className="text-amber-500"
              style={{ textShadow: '2px 2px 0px #000' }}
            >
            LearningCurve
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-white max-w-3xl mb-8 font-medium"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your journey to mastering tech starts here — with interactive learning, games, and hands-on practice.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
             <Link href="/tutorials">
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium mr-3 rounded-md text-white bg-[#243b6d] hover:bg-[#1a274d] md:py-4 md:text-lg md:px-10">
                Get Started
              </button>
            </Link>

            <Link href="/about">
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#1a274d] bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right column (1/3 width) for slider box */}
        <div className="w-full md:w-1/3 flex items-center justify-center mt-8 md:mt-0 md:pl-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-indigo-100 backdrop-blur-sm h-3/4 p-6 flex items-center rounded-xl shadow-lg border-2 border-[#4a6fcb] w-full max-w-xs"
            >
              <div className="flex items-start gap-4">
                <span className="text-6xl">{sliderItems[currentSlide].icon}</span>
                <div>
                  <span className="font-semibold text-gray-800 block">{sliderItems[currentSlide].name}</span>
                  <span className="text-gray-600 text-sm">{sliderItems[currentSlide].description}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}