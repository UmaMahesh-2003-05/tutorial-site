"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FooterSection from '@/components/FooterSection';

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const tutorialImageMap = {
  'Python-Programming': '/images/python-tutorial.jpg',
  'Java-Programming': '/images/java-tutorial.jpg',
  'JavaScript': '/images/javascript-tutorial.jpg',
  'C-programming': '/images/c-tutorial.jpg',
  'C++-programming': '/images/cpp-tutorial.jpg',
  'TypeScript': '/images/typescript-tutorial.jpg',
  'Ruby-Programming': '/images/ruby-tutorial.jpg',
  'PHP': '/images/php-tutorial.jpg',
  'Go': '/images/go-tutorial.jpg',
  'Swift-Programming': '/images/swift-tutorial.jpg',
  'R -Programming': '/images/r-tutorial.jpg',
  'Kotlin': '/images/kotlin-tutorial.jpg',
  'C#-programming': '/images/csharp-tutorial.jpg',
  'Bash-programming': '/images/bash-tutorial.jpg',
  'Rust-Programming': '/images/rust-tutorial.jpg'
};


  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tutorials');
        const data = await response.json();
        setTutorials(data);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchTutorials();
  }, []);

  const uniqueCategories = ['All', ...new Set(tutorials.map((tut) => tut.category).filter(Boolean) || [])];

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tutorial.tags && tutorial.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-[url('/bgimg1.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#3b5caa] via-[#243b6d] to-[#0f1a3a] bg-clip-text text-transparent mb-6">
              <span style={{ textShadow: '4px 2px 0px #ffff' }} >
                Explore Our Tutorials
              </span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto font-medium">
              Master new skills with our comprehensive collection of tutorials — learn by doing with real-world projects.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="#tutorials"
                className="px-8 py-3 bg-gradient-to-bl from-white to-[#2e4a8d] text-[#243b6d] font-semibold rounded-lg shadow-md hover:scale-105 transition-all"
              >
                Browse Tutorials
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 hover:scale-105 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <section id="tutorials" className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Find Your Perfect Tutorial</h2>
            
            {/* Search Input */}
            <div className="max-w-xl mx-auto mb-10">
              <input
                type="text"
                placeholder="Search tutorials by title or tags..."
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-center"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
           <div className="flex flex-wrap justify-center gap-3">
  {uniqueCategories.map((cat) => {
    const isSelected = selectedCategory === cat;
    return isSelected ? (
      <div
        key={cat}
        className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
      >
        <button
          onClick={() => setSelectedCategory(cat)}
          className="px-5 py-2 rounded-full text-sm font-medium bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300"
        >
          {cat}
        </button>
      </div>
    ) : (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className="px-5 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-300"
      >
        {cat}
      </button>
    );
  })}
</div>

          </motion.div>
        </section>

        {/* Tutorials Grid Section */}
        <section className="mb-4 text-center">
          {filteredTutorials.length > 0 ? (
            <>
              <h3 className="text-2xl font-semibold text-gray-700 mb-8">
                {filteredTutorials.length} {filteredTutorials.length === 1 ? 'Tutorial' : 'Tutorials'} Found
              </h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredTutorials.map((tutorial, index) => {
                  const imageUrl = tutorial.image || tutorialImageMap[tutorial.slug] || '/images/default-tutorial.jpg';


                  return (
                    <motion.div
                      key={tutorial._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                        {/* Image */}
                        <div className="relative h-48 w-full">
                          <Image
                            src={imageUrl}
                            alt={tutorial.title}
                            fill
                            className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl" />
                          <span className="absolute top-3 left-3 px-3 py-1 bg-blue-100 text-[#1a274d] rounded-full text-xs font-semibold">
                            {tutorial.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <Link href={`/tutorials/${tutorial.slug}`}>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#3b5caa] transition-colors mb-3">
                              {tutorial.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-4 flex-grow">
                            {tutorial.description || 'Start learning now for a better future!'}
                          </p>
                          <div className="mt-auto">
                            <Link
                              href={`/tutorials/${tutorial.slug}`}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4a6fcb] to-[#2e4a8d] text-white
                               font-medium hover:from-[#3b5caa] hover:to-[#1a274d] transition-all shadow hover:shadow-lg"
                            >
                              Start Learning <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="py-16"
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No tutorials found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </section>
      </div>
      <FooterSection />
    </div>
  );
}