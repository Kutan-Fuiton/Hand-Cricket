import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HandGesture as HandGestureType } from '../context/GameContext';

interface HandGestureProps {
  value: HandGestureType;
  isSelected?: boolean;
  isOpponent?: boolean;
  onClick?: (value: HandGestureType) => void;
  revealed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const handEmojis: Record<HandGestureType, string> = {
  1: '👆',
  2: '✌️',
  3: '🤟',
  4: '🖖',
  5: '🖐️',
  6: '👍'
};

const HandGesture: React.FC<HandGestureProps> = ({
  value,
  isSelected = false,
  isOpponent = false,
  onClick,
  revealed = true,
  size = 'md',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes based on size prop
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };
  
  // Background color based on selection and theme
  const bgColor = isSelected 
    ? 'bg-blue-100 dark:bg-blue-900' 
    : 'bg-gray-100 dark:bg-gray-800';
  
  // Border color based on selection and theme
  const borderColor = isSelected 
    ? 'border-blue-500 dark:border-blue-400' 
    : isHovered && !disabled 
      ? 'border-gray-400 dark:border-gray-500' 
      : 'border-gray-300 dark:border-gray-700';
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(value);
    }
  };
  
  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${bgColor} 
        ${borderColor}
        ${isOpponent ? 'rotate-180' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
        flex items-center justify-center
        border-2 rounded-full p-3 m-2
        transition-colors duration-200
      `}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      animate={{ rotateY: revealed ? 0 : 180 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {revealed ? (
        handEmojis[value]
      ) : (
        <span className="text-gray-500 dark:text-gray-400">?</span>
      )}
      
      {/* Value indicator below */}
      {revealed && (
        <span className={`
          absolute bottom-0 transform translate-y-3
          text-xs font-bold
          ${isSelected ? 'text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}
        `}>
          {value}
        </span>
      )}
    </motion.div>
  );
};

export default HandGesture; 