import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TossComponentProps {
  onTossComplete: (winner: 'player' | 'computer') => void;
}

const TossComponent: React.FC<TossComponentProps> = ({ onTossComplete }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showChoice, setShowChoice] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<'heads' | 'tails' | null>(null);

  const handleChoice = (choice: 'heads' | 'tails') => {
    setPlayerChoice(choice);
    setShowChoice(true);
    setIsFlipping(true);

    // Simulate coin flip
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      const winner = result === playerChoice ? 'player' : 'computer';
      onTossComplete(winner);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Let's Toss!
      </motion.h2>

      {!showChoice ? (
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => handleChoice('heads')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Heads
          </button>
          <button
            onClick={() => handleChoice('tails')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Tails
          </button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="relative w-32 h-32"
            animate={{ 
              rotateY: isFlipping ? 720 : 0,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
              <span className="text-4xl">🪙</span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TossComponent; 