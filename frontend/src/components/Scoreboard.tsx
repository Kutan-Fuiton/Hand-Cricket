import React from 'react';
import { motion } from 'framer-motion';
import { Team, Player } from '../context/GameContext';

interface ScoreboardProps {
  battingTeam: Team;
  bowlingTeam: Team;
  currentBatter: Player | null;
  currentBowler: Player | null;
  ballsPlayed: number;
  oversCompleted: number;
  totalOvers: number;
  currentInning: 1 | 2;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  battingTeam,
  bowlingTeam,
  currentBatter,
  currentBowler,
  ballsPlayed,
  oversCompleted,
  totalOvers,
  currentInning
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Batting Team */}
        <motion.div 
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-center mb-2 text-gray-800 dark:text-white">
            {battingTeam.name}
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {battingTeam.totalScore}/{battingTeam.wicketsLost}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wickets: {battingTeam.wicketsLost}/{battingTeam.maxWickets}
            </p>
          </div>
          {currentBatter && (
            <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
              Current Batter: {currentBatter.name}
            </p>
          )}
        </motion.div>
        
        {/* Bowling Team */}
        <motion.div 
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-center mb-2 text-gray-800 dark:text-white">
            {bowlingTeam.name}
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {bowlingTeam.totalScore}/{bowlingTeam.wicketsLost}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wickets: {bowlingTeam.wicketsLost}/{bowlingTeam.maxWickets}
            </p>
          </div>
          {currentBowler && (
            <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
              Current Bowler: {currentBowler.name}
            </p>
          )}
        </motion.div>
      </div>
      
      {/* Match Progress */}
      <motion.div 
        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Innings: {currentInning}/2
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Overs: {oversCompleted}.{ballsPlayed % 6}/{totalOvers}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Scoreboard; 