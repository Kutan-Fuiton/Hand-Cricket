import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame, MatchSettings } from '../context/GameContext';

const CustomSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { initializeGame } = useGame();
  
  // Default settings
  const [settings, setSettings] = useState<MatchSettings>({
    overs: 3,
    playerCount: 2,
    targetScore: 0,
    timeLimit: 0
  });
  
  // Team names
  const [teamAName, setTeamAName] = useState('Team A');
  const [teamBName, setTeamBName] = useState('Team B');
  
  // Input validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle settings change
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate numeric input
    if (['overs', 'playerCount', 'targetScore', 'timeLimit'].includes(name)) {
      const numValue = parseInt(value);
      
      // Clear previous error for this field
      setErrors(prev => ({ ...prev, [name]: '' }));
      
      // Check for valid input
      if (isNaN(numValue) || numValue < 0) {
        setErrors(prev => ({ ...prev, [name]: 'Must be a positive number' }));
        return;
      }
      
      // Specific validations
      if (name === 'overs' && (numValue < 1 || numValue > 20)) {
        setErrors(prev => ({ ...prev, [name]: 'Overs must be between 1 and 20' }));
        return;
      }
      
      if (name === 'playerCount' && (numValue < 1 || numValue > 5)) {
        setErrors(prev => ({ ...prev, [name]: 'Players must be between 1 and 5' }));
        return;
      }
      
      // Update settings if valid
      setSettings(prev => ({ ...prev, [name]: numValue }));
    } else {
      // Non-numeric fields
      if (name === 'teamAName') {
        setTeamAName(value);
      } else if (name === 'teamBName') {
        setTeamBName(value);
      }
    }
  };
  
  // Start the game with custom settings
  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    
    // Initialize game with custom settings
    initializeGame('Custom', settings);
    navigate('/game/Custom');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            Custom Game Settings
          </motion.h1>
          
          <form onSubmit={handleStartGame}>
            {/* General settings */}
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
                Game Settings
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Overs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Overs
                  </label>
                  <input
                    type="number"
                    name="overs"
                    value={settings.overs}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                    max="20"
                  />
                  {errors.overs && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.overs}
                    </p>
                  )}
                </div>
                
                {/* Player count per team */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Players per Team
                  </label>
                  <input
                    type="number"
                    name="playerCount"
                    value={settings.playerCount}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                    max="5"
                  />
                  {errors.playerCount && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.playerCount}
                    </p>
                  )}
                </div>
                
                {/* Target score (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Score (Optional)
                  </label>
                  <input
                    type="number"
                    name="targetScore"
                    value={settings.targetScore || ''}
                    onChange={handleSettingChange}
                    placeholder="No limit"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    min="0"
                  />
                  {errors.targetScore && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.targetScore}
                    </p>
                  )}
                </div>
                
                {/* Time limit (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time Limit in mins (Optional)
                  </label>
                  <input
                    type="number"
                    name="timeLimit"
                    value={settings.timeLimit || ''}
                    onChange={handleSettingChange}
                    placeholder="No limit"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    min="0"
                  />
                  {errors.timeLimit && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.timeLimit}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Team settings */}
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
                Team Names
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Team A name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Team A Name
                  </label>
                  <input
                    type="text"
                    name="teamAName"
                    value={teamAName}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                {/* Team B name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Team B Name
                  </label>
                  <input
                    type="text"
                    name="teamBName"
                    value={teamBName}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Actions */}
            <motion.div 
              className="flex justify-between"
              variants={itemVariants}
            >
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Start Game
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomSettingsPage; 