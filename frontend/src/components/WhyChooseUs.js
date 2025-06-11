'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Code, Terminal, PlayCircle, BookOpen } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: <Code className="h-14 w-14 text-indigo-600" />,
    title: "Easy Learning",
    description: "Interactive, beginner-friendly content",
  },
  {
    icon: <Terminal className="h-14 w-14 text-indigo-600" />,
    title: "Test Your Code",
    description: "Built-in compiler to run your code",
  },
  {
    icon: <PlayCircle className="h-14 w-14 text-indigo-600" />,
    title: "Practice Mode",
    description: "Hands-on programming practice",
  },
  {
    icon: <BookOpen className="h-14 w-14 text-indigo-600" />,
    title: "Comprehensive Content",
    description: "Detailed tutorials and examples",
  }
];

export default function WhyChooseUs() {
  return (
    <motion.section
      className="relative py-20 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Decorative background dots pattern */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 opacity-10 pointer-events-none">
        <svg width="400" height="400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#4f46e5" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4 tracking-tight">
            Why <span className="text-indigo-900">LearningCurve?</span>
          </h2>
          <motion.p 
            className="text-lg text-indigo-600 leading-relaxed"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Discover what makes our platform the perfect choice for your coding journey.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-14"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center cursor-pointer select-none
                             hover:shadow-indigo-400/40 hover:scale-105 transition-transform duration-400 ease-in-out"
                  whileHover={{ scale: 1.07, boxShadow: "0 15px 30px rgba(99, 102, 241, 0.35)" }}
                >
                  <div className="flex justify-center mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-700 max-w-xs">
                    {feature.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
}
