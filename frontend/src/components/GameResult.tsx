import React from 'react';
import { motion } from 'framer-motion';
import { Team } from '../context/GameContext';

interface GameResultProps {
  winner: Team | null;
  battingTeam: Team;
  bowlingTeam: Team;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const GameResult: React.FC<GameResultProps> = ({
  winner,
  battingTeam,
  bowlingTeam,
  onPlayAgain,
  onNewGame
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white"
        variants={itemVariants}
      >
        Game Over!
      </motion.h2>
      
      {winner && (
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
        >
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Winner: 
            <span className="font-bold text-green-600 dark:text-green-400 ml-2">
              {winner.name}
            </span>
          </h3>
        </motion.div>
      )}
      
      <motion.div 
        className="mb-8 grid grid-cols-2 gap-4"
        variants={itemVariants}
      >
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-center mb-2 text-gray-700 dark:text-gray-300">
            {battingTeam.name}
          </h4>
          <p className="text-center text-xl font-bold text-gray-800 dark:text-white">
            {battingTeam.totalScore}/{battingTeam.wicketsLost}
          </p>
        </div>
        
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-center mb-2 text-gray-700 dark:text-gray-300">
            {bowlingTeam.name}
          </h4>
          <p className="text-center text-xl font-bold text-gray-800 dark:text-white">
            {bowlingTeam.totalScore}/{bowlingTeam.wicketsLost}
          </p>
        </div>
      </motion.div>
      
      {/* Individual player scores */}
      <motion.div 
        className="mb-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
        variants={itemVariants}
      >
        <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Player Scores:</h4>
        
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {[...battingTeam.players, ...bowlingTeam.players].map(player => (
            <div 
              key={player.id}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-1"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {player.name}
              </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {player.score} {player.isOut && '(out)'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Actions */}
      <motion.div 
        className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center"
        variants={itemVariants}
      >
        <button
          onClick={onPlayAgain}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Play Again
        </button>
        
        <button
          onClick={onNewGame}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
        >
          New Game
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GameResult; 