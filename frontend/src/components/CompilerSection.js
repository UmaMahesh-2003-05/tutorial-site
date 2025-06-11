'use client';
import React, { useState } from 'react';
import { Play, Save, Clipboard, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompilerSection() {
  const [code, setCode] = useState(`
# Python example: A simple calculator
def add(a, b):
    """Return the sum of two numbers"""
    return a + b

# Test the function
result = add(5, 3)
print(f"5 + 3 = {result}")
  `.trim());

  const [output, setOutput] = useState("5 + 3 = 8");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput("5 + 3 = 8");
      setIsRunning(false);
    }, 1000);
  };

  return (
    <motion.section
      className="py-16 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Online Python Compiler
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Try Python directly in your browser without installation. Get instant feedback as you learn.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code editor panel */}
          <motion.div 
            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-700">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm">Python</span>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Save className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Clipboard className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                className="w-full h-80 bg-gray-800 text-gray-200 font-mono text-sm resize-none focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
            <div className="bg-gray-900 px-4 py-3 flex justify-end">
              <motion.button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`flex items-center px-4 py-2 rounded-md text-white ${
                  isRunning ? 'bg-gray-700' : 'bg-green-600 hover:bg-green-700'
                } transition-colors duration-200`}
                whileHover={{ scale: isRunning ? 1 : 1.05 }}
                whileTap={{ scale: isRunning ? 1 : 0.95 }}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" /> Run Code
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Output panel */}
          <motion.div 
            className="flex flex-col bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-900 px-4 py-2 border-b border-gray-700">
              <h3 className="text-sm font-medium text-gray-200">Output</h3>
            </div>
            <div className="flex-grow p-4">
              <div className="h-full bg-black bg-opacity-30 rounded p-3 font-mono text-sm text-green-400">
                <p>{output}</p>
              </div>
            </div>
            <div className="bg-gray-900 px-4 py-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Program executed successfully</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a 
            href="/tutorials/:slug/compiler" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try more examples
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}