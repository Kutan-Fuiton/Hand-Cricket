import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandGesture } from '../context/GameContext';

interface AnimatedHandGesturesProps {
  batterGesture: HandGesture;
  bowlerGesture: HandGesture;
  isOut: boolean;
  runs: number;
}

const AnimatedHandGestures: React.FC<AnimatedHandGesturesProps> = ({
  batterGesture,
  bowlerGesture,
  isOut,
  runs
}) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Gestures Display */}
      <div className="flex justify-center space-x-12 mb-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Batter
          </p>
          <div className="text-6xl">
            {batterGesture === 1 && '✊'}
            {batterGesture === 2 && '✌️'}
            {batterGesture === 3 && '🤟'}
            {batterGesture === 4 && '🖖'}
            {batterGesture === 5 && '🖐️'}
            {batterGesture === 6 && '🤙'}
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Bowler
          </p>
          <div className="text-6xl">
            {bowlerGesture === 1 && '✊'}
            {bowlerGesture === 2 && '✌️'}
            {bowlerGesture === 3 && '🤟'}
            {bowlerGesture === 4 && '🖖'}
            {bowlerGesture === 5 && '🖐️'}
            {bowlerGesture === 6 && '🤙'}
          </div>
        </motion.div>
      </div>
      
      {/* Result Display */}
      <AnimatePresence>
        <motion.div
          key={isOut ? 'out' : 'runs'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          {isOut ? (
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              OUT! 🎯
            </div>
          ) : (
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              +{runs} Runs! 🏃
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHandGestures; 