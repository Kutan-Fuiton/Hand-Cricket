import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        About Hand Cricket
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Story</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Hand Cricket is a digital adaptation of the popular hand game that has been enjoyed by cricket enthusiasts for generations. 
          Our team of developers and cricket fans came together to create an authentic digital experience that captures 
          the fun and competitive spirit of the traditional game.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Founded in 2024, our mission is to bring the joy of hand cricket to players around the world, 
          allowing friends to compete regardless of distance and introducing new players to this beloved pastime.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Team</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We're a small, passionate team of developers, designers, and cricket enthusiasts dedicated to creating 
          the best hand cricket experience possible. With backgrounds spanning from professional cricket to 
          game development, we bring diverse perspectives to make our game engaging and authentic.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We envision a global community of hand cricket players enjoying friendly matches, participating in tournaments, 
          and connecting through their shared love of the game. We are committed to continuously improving the game 
          with new features, game modes, and opportunities for community engagement.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Thank you for being part of our journey. Whether you're a seasoned hand cricket veteran or discovering the game for the first time, 
          we're excited to have you play with us!
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPage; 