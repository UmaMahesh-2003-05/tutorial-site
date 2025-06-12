'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FooterSection from '@/components/FooterSection';

const goals = [
  {
    title: 'Accessible Tech Education',
    description: 'Empowering beginners through interactive learning tools.',
    icon: '🚀',
  },
  {
    title: 'Learning Community',
    description: 'Building a vibrant and collaborative tech community.',
    icon: '👥',
  },
  {
    title: 'Hands-On Projects',
    description: 'Real-world coding projects for skill development.',
    icon: '🛠️',
  },
  {
    title: 'Thousands Enrolled',
    description: 'Trusted by thousands of learners worldwide.',
    icon: '🌍',
  },
];

const techReasons = [
  {
    icon: '🧠',
    title: 'Tech Drives Innovation',
    description: 'Technology powers every industry, transforming how we live and work.',
  },
  {
    icon: '🎨',
    title: 'Creativity & Freedom',
    description: 'Coding unlocks endless opportunities for creative problem-solving.',
  },
  {
    icon: '🌐',
    title: 'Global Connectivity',
    description: 'Tech connects people worldwide, fostering collaboration and growth.',
  },
  {
    icon: '⏳',
    title: 'Future-Proof Skills',
    description: 'Learning tech today prepares you for tomorrow’s job market and beyond.',
  },
];

export default function AboutPage() {
  const MotionLink = motion(Link);

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Hero Section with Animated Slider */}
      <AnimatePresence>
        <section className="min-h-screen bg-[url('/bgimg1.jpg')] bg-cover bg-center flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              <motion.h1
                className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-5xl"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: 'spring', stiffness: 100 }
                  }
                }}
              >
                <motion.span
                  className="block text-white drop-shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  Transform With LearningCurve
                </motion.span>
                <motion.span
                  className="block text-green-400 drop-shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  Become a Creator,
                </motion.span>{' '}
                <motion.span
                  className="block text-amber-400 drop-shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  Not Just a Coder
                </motion.span>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-white/90 sm:text-xl max-w-2xl mx-auto font-medium"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { ease: "easeOut", duration: 0.5 }
                  }
                }}
              >
                From your first "Hello World" to building full-stack projects — our interactive
                platform empowers you to learn by doing, at your pace, on your terms.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                <MotionLink
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#1a274d] bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(165, 180, 252, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Take Your First Step
                </MotionLink>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatePresence>

      {/* Goals Section */}
      <section className="bg-[#e0e7ff] py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
          >
            Our Goals & Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-4">{goal.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{goal.title}</h3>
                <p className="text-gray-600">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Tech Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
          >
            Why Only Tech?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-4">{reason.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{reason.title}</h3>
                <p className="text-lg font-medium text-gray-800">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section
        className="bg-[#2e4a8d] text-white py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl font-bold mb-4">
            Why Are You Still Waiting?
          </motion.h2>
          <p className="text-lg mb-8">
            Whether you're a student, a job-seeker,
            or a tech enthusiast — there's no better time than now to start your journey into technology.
          </p>
          <Link
            href="/signup"
            className="bg-red-500 text-black font-semibold py-3 px-8 rounded-full border-2 border-l-cyan-300 border-r-cyan-300 hover:scale-120 hover:bg-[#85ff8d] hover:text-black transition-all duration-300 relative overflow-hidden inline-block"
          >
            <span className="relative z-10">Start Your Journey</span>
            <motion.span
              className="absolute inset-0 bg-[#00ff84] opacity-0"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </motion.section>

      <FooterSection />
    </div>
  );
}
