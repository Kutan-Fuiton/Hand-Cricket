import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, HandGesture as HandGestureType, GameMode } from '../context/GameContext';
import { useComputerOpponent } from '../hooks/useComputerOpponent';
import HandGestureSelector from '../components/HandGestureSelector';
import HandGesture from '../components/HandGesture';
import Scoreboard from '../components/Scoreboard';
import GameResult from '../components/GameResult';
import TossComponent from '../components/TossComponent';
import ComputerGameSettings from '../components/ComputerGameSettings';
import AnimatedHandGestures from '../components/AnimatedHandGestures';
import TossDecision from '../components/TossDecision';

const GamePage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { 
    gameState, 
    initializeGame, 
    playBall, 
    switchInnings, 
    resetGame 
  } = useGame();
  
  const [playerName, setPlayerName] = useState('Player 1');
  const [opponentName, setOpponentName] = useState(mode === '1vComputer' ? 'Computer' : 'Player 2');
  const [playerGesture, setPlayerGesture] = useState<HandGestureType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [gamePhase, setGamePhase] = useState<'settings' | 'toss' | 'playing' | 'result'>('settings');
  const [gameSettings, setGameSettings] = useState<{
    overs: number;
    wickets: number;
    difficulty: 'easy' | 'medium' | 'hard';
  } | null>(null);
  
  // For computer opponent
  const { computerGesture, generateComputerMove } = useComputerOpponent();
  
  // Calculate target score for second innings
  const targetScore = gameState.currentInning === 2 
    ? gameState.bowlingTeam.totalScore + 1 
    : null;

  // Calculate required runs
  const requiredRuns = targetScore 
    ? targetScore - gameState.battingTeam.totalScore 
    : null;
  
  // Ensure valid game mode
  useEffect(() => {
    if (!mode || !['1v1', '1vComputer', 'TeamVTeam', 'Custom'].includes(mode)) {
      navigate('/');
      return;
    }
  }, [mode, navigate]);
  
  // Handle settings submission
  const handleSettingsSubmit = (settings: {
    overs: number;
    wickets: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }) => {
    setGameSettings(settings);
    setGamePhase('toss');
  };
  
  // Handle toss completion
  const handleTossComplete = (winner: 'player' | 'computer') => {
    setTossWinner(winner);
    if (winner === 'computer') {
      // Computer makes a random decision after a delay
      setTimeout(() => {
        const decision = Math.random() < 0.5 ? 'bat' : 'bowl';
        handleTossDecision(decision);
      }, 2000);
    }
  };
  
  // Handle toss decision
  const handleTossDecision = (decision: 'bat' | 'bowl') => {
    if (gameSettings) {
      initializeGame(mode as GameMode, {
        ...gameSettings,
        playerCount: 1,
        targetScore: 0,
        timeLimit: 0
      });
      setGamePhase('playing');
    }
  };
  
  // Handle player selection
  const handlePlayerSelect = (gesture: HandGestureType) => {
    setPlayerGesture(gesture);
    
    if (mode === '1vComputer') {
      setWaitingForOpponent(true);
      
      // If computer is batting, generate computer's batting gesture
      if (gameState.currentBatter?.name === 'Computer') {
        setTimeout(() => {
          const computerMove = generateComputerMove();
          handlePlayBall(computerMove, gesture);
        }, 1000);
      } else {
        // If computer is bowling, generate computer's bowling gesture
        setTimeout(() => {
          const computerMove = generateComputerMove();
          handlePlayBall(gesture, computerMove);
        }, 1000);
      }
    } else {
      setWaitingForOpponent(true);
    }
  };
  
  // Handle opponent selection (for 1v1 mode)
  const handleOpponentSelect = (gesture: HandGestureType) => {
    if (playerGesture) {
      handlePlayBall(playerGesture, gesture);
    }
  };
  
  // Process the round with both gestures
  const handlePlayBall = (batterGesture: HandGestureType, bowlerGesture: HandGestureType) => {
    playBall(batterGesture, bowlerGesture);
    setShowResult(true);
    
    // Reset for next round after delay
    setTimeout(() => {
      setShowResult(false);
      setPlayerGesture(null);
      setWaitingForOpponent(false);
      
      // Check if game is over or innings switch needed
      if (gameState.isGameOver) {
        setGamePhase('result');
      } else if (gameState.currentBatter === null && gameState.currentInning === 1) {
        // First innings over, switch innings
        switchInnings();
      }
    }, 3000);
  };
  
  // Reset and start a new game
  const handlePlayAgain = () => {
    resetGame();
    setGamePhase('settings');
    setGameSettings(null);
    setShowResult(false);
    setPlayerGesture(null);
    setWaitingForOpponent(false);
  };
  
  // Return to home page
  const handleNewGame = () => {
    navigate('/');
  };
  
  const [tossWinner, setTossWinner] = useState<'player' | 'computer' | null>(null);
  const [showWinnerCelebration, setShowWinnerCelebration] = useState(false);

  // Handle game over
  useEffect(() => {
    if (gameState.isGameOver && gameState.winner) {
      setShowWinnerCelebration(true);
      // Play celebration sound
      const audio = new Audio('/celebration.mp3');
      audio.play().catch(() => {}); // Ignore errors if audio can't play
    }
  }, [gameState.isGameOver, gameState.winner]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Game mode title */}
        <motion.h1 
          className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {mode === '1v1' && 'One vs One'}
          {mode === '1vComputer' && 'Play vs Computer'}
          {mode === 'TeamVTeam' && 'Team vs Team'}
          {mode === 'Custom' && 'Custom Match'}
        </motion.h1>
        
        <AnimatePresence mode="wait">
          {gamePhase === 'settings' && mode === '1vComputer' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ComputerGameSettings onStart={handleSettingsSubmit} />
            </motion.div>
          )}
          
          {gamePhase === 'toss' && mode === '1vComputer' && (
            <motion.div
              key="toss"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TossComponent onTossComplete={handleTossComplete} />
            </motion.div>
          )}

          {tossWinner && gamePhase === 'toss' && (
            <motion.div
              key="tossDecision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TossDecision 
                winner={tossWinner} 
                onDecision={handleTossDecision}
              />
            </motion.div>
          )}
          
          {gamePhase === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Scoreboard */}
              <div className="mb-8">
                <Scoreboard 
                  battingTeam={gameState.battingTeam}
                  bowlingTeam={gameState.bowlingTeam}
                  currentBatter={gameState.currentBatter}
                  currentBowler={gameState.currentBowler}
                  ballsPlayed={gameState.ballsPlayed}
                  oversCompleted={gameState.oversCompleted}
                  totalOvers={gameState.settings.overs || 0}
                  currentInning={gameState.currentInning}
                />
              </div>
              
              {showResult && gameState.isGameOver ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GameResult 
                    winner={gameState.winner}
                    battingTeam={gameState.battingTeam}
                    bowlingTeam={gameState.bowlingTeam}
                    onPlayAgain={handlePlayAgain}
                    onNewGame={handleNewGame}
                  />
                </motion.div>
              ) : showResult ? (
                <motion.div 
                  key="roundResult"
                  className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <AnimatedHandGestures
                    batterGesture={gameState.lastBatterGesture!}
                    bowlerGesture={gameState.lastBowlerGesture!}
                    isOut={gameState.lastBatterGesture === gameState.lastBowlerGesture}
                    runs={gameState.lastBatterGesture!}
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="gamePlay"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Target Score Display */}
                  {targetScore && (
                    <motion.div
                      className="col-span-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center mb-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">
                        Target: {targetScore} runs
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Need {requiredRuns} more runs
                      </p>
                    </motion.div>
                  )}

                  {/* Current player selection */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-white">
                      {gameState.currentBatter?.name === 'Computer' ? 'Computer' : (gameState.currentBatter?.name || playerName)}
                      {" "}
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        (Batting)
                      </span>
                    </h2>
                    
                    {gameState.currentBatter?.name === 'Computer' ? (
                      <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="text-6xl mb-4"
                        >
                          🤖
                        </motion.div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Computer is batting...
                        </p>
                      </div>
                    ) : (
                      <HandGestureSelector 
                        onSelect={handlePlayerSelect}
                        disabled={waitingForOpponent}
                        selectedGesture={playerGesture}
                      />
                    )}
                  </div>
                  
                  {/* Opponent selection */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-white">
                      {gameState.currentBowler?.name === 'Computer' ? 'Computer' : (gameState.currentBowler?.name || opponentName)}
                      {" "}
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        (Bowling)
                      </span>
                    </h2>
                    
                    {gameState.currentBowler?.name === 'Computer' ? (
                      <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="text-6xl mb-4"
                        >
                          🤖
                        </motion.div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Computer is thinking...
                        </p>
                      </div>
                    ) : (
                      <HandGestureSelector 
                        onSelect={handlePlayerSelect}
                        disabled={!waitingForOpponent || gameState.currentBatter?.name === 'Computer'}
                        selectedGesture={null}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Winner Celebration */}
        {showWinnerCelebration && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {gameState.winner?.name} Wins! 🎉
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Congratulations on a great game!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePlayAgain}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Play Again
                </button>
                <button
                  onClick={handleNewGame}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
                >
                  New Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage; 