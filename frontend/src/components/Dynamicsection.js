'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DynamicSection({ tab, onChangeTab }) {
  const content = {
    videos: {
      title1: 'Master Concepts',
      title2: 'Through Engaging Videos',
      description:
        'Visual learners rejoice! Our carefully crafted videos help you grasp coding concepts with ease and clarity.',
      image: '/bg-video.jpg',
    },
    games: {
      title1: 'Level Up Your Skills',
      title2: 'With Interactive Games',
      description:
        'Learning doesn’t have to be boring. Play coding games to reinforce your knowledge while having fun!',
      image: '/bg-video.jpg',
    },
  };

  const section = content[tab];
  if (!section) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Back to Text Button at Top Left */}
      {(tab === 'videos' || tab === 'games') && (
        <button
          onClick={() => onChangeTab('text')}
          className="absolute top-4 left-4 z-20 px-4 py-2 border-2 border-amber-400 bg-transparent hover:bg-white/20 text-white rounded-md font-semibold transition"
        >
          -Back to Text
        </button>
      )}

      {/* Blurred Background Image */}
      <Image
        src={section.image}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0 brightness-75"
      />

      {/* Content in Center */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          <span className="block">{section.title1}</span>
          <span className="block text-amber-400">{section.title2}</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          {section.description}
        </p>
      </motion.div>
    </div>
  );
}
