import React from 'react';
import { motion } from 'framer-motion';

interface TossDecisionProps {
  winner: 'player' | 'computer';
  onDecision: (decision: 'bat' | 'bowl') => void;
}

const TossDecision: React.FC<TossDecisionProps> = ({ winner, onDecision }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <motion.h2 
          className="text-3xl font-bold mb-4 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {winner === 'player' ? '🎉 You won the toss! 🎉' : 'Computer won the toss!'}
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {winner === 'player' ? 'Choose to bat or bowl first' : 'Computer is deciding...'}
        </motion.p>
      </motion.div>

      {winner === 'player' ? (
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <button
            onClick={() => onDecision('bat')}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-lg"
          >
            Bat First 🏏
          </button>
          <button
            onClick={() => onDecision('bowl')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-lg"
          >
            Bowl First 🎯
          </button>
        </motion.div>
      ) : (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4"
        >
          🤖
        </motion.div>
      )}
    </div>
  );
};

export default TossDecision; 