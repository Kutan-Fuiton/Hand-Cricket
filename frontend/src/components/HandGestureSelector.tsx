import React from 'react';
import { motion } from 'framer-motion';
import { HandGesture } from '../context/GameContext';

interface HandGestureSelectorProps {
  onSelect: (gesture: HandGesture) => void;
  disabled?: boolean;
  selectedGesture: HandGesture | null;
}

const HandGestureSelector: React.FC<HandGestureSelectorProps> = ({
  onSelect,
  disabled = false,
  selectedGesture
}) => {
  const gestures: { value: HandGesture; emoji: string }[] = [
    { value: 1, emoji: '✊' },
    { value: 2, emoji: '✌️' },
    { value: 3, emoji: '🤟' },
    { value: 4, emoji: '🖖' },
    { value: 5, emoji: '🖐️' },
    { value: 6, emoji: '🤙' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {gestures.map(({ value, emoji }) => (
        <motion.button
          key={value}
          onClick={() => onSelect(value)}
          disabled={disabled}
          className={`
            relative aspect-square rounded-lg flex items-center justify-center
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${selectedGesture === value 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
            transition-colors duration-200
          `}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          <motion.div
            className="text-4xl"
            animate={selectedGesture === value ? {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            } : {}}
            transition={{ duration: 0.3 }}
          >
            {emoji}
          </motion.div>
          <div className="absolute bottom-2 right-2 text-sm font-medium">
            {value}
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default HandGestureSelector; 