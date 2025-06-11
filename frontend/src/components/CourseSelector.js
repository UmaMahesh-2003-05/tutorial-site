'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CourseCard = ({ title, level, rating, students, image, color }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
      whileHover={{ y: -5 }}
    >
      <div className={`h-3 ${color}`}></div>
      <div className="relative h-40">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute top-2 right-2 ${color.replace('bg-', 'bg-opacity-90 text-white ')} text-xs font-semibold py-1 px-2 rounded-full`}>
          {level}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{students.toLocaleString()} students</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center transition-colors duration-200">
            View course <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function CourseSelector() {
  const courses = [
    {
      title: 'C Programming',
      level: 'Beginner',
      rating: 4.7,
      students: 10245,
      image: '/images/c-tutorial.jpg',
      color: 'bg-blue-500'
    },
    {
      title: 'C++ Mastery',
      level: 'Intermediate',
      rating: 4.8,
      students: 8765,
      image: '/images/cpp-tutorial.jpg',
      color: 'bg-purple-500'
    },
    {
      title: 'Python Fundamentals',
      level: 'Beginner',
      rating: 4.9,
      students: 15678,
      image: '/images/python-tutorial.jpg',
      color: 'bg-yellow-500'
    },
    {
      title: 'Java Development',
      level: 'Intermediate',
      rating: 4.6,
      students: 7654,
      image: '/images/java-tutorial.jpg',
      color: 'bg-red-500'
    },
    {
      title: 'Master TypeScript',
      level: 'Advanced',
      rating: 4.8,
      students: 9876,
      image: '/images/typescript-tutorial.jpg',
      color: 'bg-indigo-500'
    },
    {
      title: 'Master Javascript',
      level: 'All Levels',
      rating: 4.7,
      students: 13456,
      image: '/images/javascript-tutorial.jpg',
      color: 'bg-green-400'
    }
  ];

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Choose What to Learn</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive programming courses and start your coding journey today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
          href="/tutorials">
          <motion.button
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2e4a8d] hover:bg-[#1a274d] transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View all courses <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
