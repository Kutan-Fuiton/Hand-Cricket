import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ComputerGameSettingsProps {
  onStart: (settings: {
    overs: number;
    wickets: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }) => void;
}

const ComputerGameSettings: React.FC<ComputerGameSettingsProps> = ({ onStart }) => {
  const [settings, setSettings] = useState({
    overs: 1,
    wickets: 1,
    difficulty: 'medium' as const
  });

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === 'overs' || name === 'wickets' ? parseInt(value) : value
    }));
  };

  return (
    <motion.div 
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Game Settings
      </h2>

      <div className="space-y-6">
        {/* Overs Setting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Overs
          </label>
          <input
            type="number"
            name="overs"
            min="1"
            max="20"
            value={settings.overs}
            onChange={handleSettingChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Wickets Setting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Wickets
          </label>
          <input
            type="number"
            name="wickets"
            min="1"
            max="10"
            value={settings.wickets}
            onChange={handleSettingChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Difficulty Setting */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Computer Difficulty
          </label>
          <select
            name="difficulty"
            value={settings.difficulty}
            onChange={handleSettingChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Start Button */}
        <button
          onClick={() => onStart(settings)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Start Game
        </button>
      </div>
    </motion.div>
  );
};

export default ComputerGameSettings; 