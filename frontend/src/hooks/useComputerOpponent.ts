import { useState, useCallback, useEffect } from 'react';
import { HandGesture } from '../context/GameContext';

interface ComputerOpponentHook {
  computerGesture: HandGesture | null;
  generateComputerMove: () => HandGesture;
  resetComputerMove: () => void;
}

/**
 * Custom hook for managing computer opponent moves in hand cricket
 * 
 * Provides functionality to generate and manage computer gestures
 */
export const useComputerOpponent = (): ComputerOpponentHook => {
  const [computerGesture, setComputerGesture] = useState<HandGesture | null>(null);

  // Generate a random move for the computer (1-6)
  const generateComputerMove = useCallback((): HandGesture => {
    // Random number between 1 and 6
    const randomGesture = (Math.floor(Math.random() * 6) + 1) as HandGesture;
    setComputerGesture(randomGesture);
    return randomGesture;
  }, []);

  // Reset computer move
  const resetComputerMove = useCallback(() => {
    setComputerGesture(null);
  }, []);

  return {
    computerGesture,
    generateComputerMove,
    resetComputerMove
  };
};

/**
 * Advanced computer opponent with strategic decision making
 */
export const useAdvancedComputerOpponent = (
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  targetScore?: number,
  currentScore?: number,
  playerHistory?: HandGesture[]
): ComputerOpponentHook => {
  const [computerGesture, setComputerGesture] = useState<HandGesture | null>(null);
  
  // Generate a move for the computer based on difficulty and game state
  const generateComputerMove = useCallback((): HandGesture => {
    let gesture: HandGesture;
    
    // Strategy based on difficulty
    switch (difficulty) {
      case 'easy':
        // Easy: Random moves with slight bias toward middle values
        gesture = generateEasyMove();
        break;
        
      case 'medium':
        // Medium: Consider player history and game state with some randomness
        gesture = generateMediumMove(playerHistory);
        break;
        
      case 'hard':
        // Hard: Strategic moves based on game state and player patterns
        gesture = generateHardMove(playerHistory, targetScore, currentScore);
        break;
        
      default:
        // Default to medium if invalid difficulty
        gesture = generateMediumMove(playerHistory);
    }
    
    setComputerGesture(gesture);
    return gesture;
  }, [difficulty, playerHistory, targetScore, currentScore]);

  // Easy difficulty - mostly random with slight bias toward middle values
  const generateEasyMove = (): HandGesture => {
    const random = Math.random();
    if (random < 0.6) {
      // 60% chance for middle values (2-5)
      return (Math.floor(Math.random() * 4) + 2) as HandGesture;
    } else {
      // 40% chance for 1 or 6
      return (Math.random() < 0.5 ? 1 : 6) as HandGesture;
    }
  };

  // Medium difficulty - considers player history with some randomness
  const generateMediumMove = (history?: HandGesture[]): HandGesture => {
    // If no history or less than 3 moves, use random
    if (!history || history.length < 3) {
      return (Math.floor(Math.random() * 6) + 1) as HandGesture;
    }
    
    // Try to predict player's next move based on recent history
    const lastMove = history[history.length - 1];
    const secondLastMove = history[history.length - 2];
    
    // If player repeats moves, try to match 
    if (lastMove === secondLastMove && Math.random() < 0.6) {
      return lastMove;
    }
    
    // Otherwise, 50% random, 50% counter last move with adjacent number
    if (Math.random() < 0.5) {
      return (Math.floor(Math.random() * 6) + 1) as HandGesture;
    } else {
      // Try adjacent number to last move
      const adjustment = Math.random() < 0.5 ? 1 : -1;
      let predictedMove = lastMove + adjustment;
      
      // Ensure it's in range 1-6
      if (predictedMove < 1) predictedMove = 6;
      if (predictedMove > 6) predictedMove = 1;
      
      return predictedMove as HandGesture;
    }
  };

  // Hard difficulty - strategic moves based on game state and player patterns
  const generateHardMove = (
    history?: HandGesture[], 
    target?: number, 
    score?: number
  ): HandGesture => {
    // No history or specific game state, use random
    if (!history || history.length < 3) {
      return (Math.floor(Math.random() * 6) + 1) as HandGesture;
    }
    
    // If we're close to target, try to match player's frequent moves
    if (target && score && target - score < 12) {
      // Count frequency of each move
      const frequency: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
      history.forEach(move => {
        frequency[move]++;
      });
      
      // Find most frequent move
      const mostFrequent = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .map(entry => parseInt(entry[0]))[0] as HandGesture;
      
      // 70% chance to play the most frequent move
      if (Math.random() < 0.7) {
        return mostFrequent;
      }
    }
    
    // Analyze patterns for consecutive moves
    const recentMoves = history.slice(-5);
    
    // Check for alternating patterns (like 2,4,2,4)
    if (recentMoves.length >= 4) {
      if (
        recentMoves[recentMoves.length - 1] === recentMoves[recentMoves.length - 3] &&
        recentMoves[recentMoves.length - 2] === recentMoves[recentMoves.length - 4]
      ) {
        // Predict continuation of pattern
        return recentMoves[recentMoves.length - 3] as HandGesture;
      }
    }
    
    // Last resort - slightly weighted random choice with emphasis on 
    // numbers not recently used by the player
    const lastThreeMoves = new Set(recentMoves.slice(-3));
    const availableMoves: HandGesture[] = [1, 2, 3, 4, 5, 6].filter(
      m => !lastThreeMoves.has(m as HandGesture)
    ) as HandGesture[];
    
    if (availableMoves.length > 0) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    // Truly random if all else fails
    return (Math.floor(Math.random() * 6) + 1) as HandGesture;
  };

  // Reset computer move
  const resetComputerMove = useCallback(() => {
    setComputerGesture(null);
  }, []);

  return {
    computerGesture,
    generateComputerMove,
    resetComputerMove
  };
};

export default useComputerOpponent; 