import React, { createContext, useContext, useState, useCallback } from 'react';

// Define types
export type HandGesture = 1 | 2 | 3 | 4 | 5 | 6;
export type GameMode = '1v1' | '1vComputer' | 'TeamVTeam' | 'Custom';

export interface Player {
  id: string;
  name: string;
  score: number;
  isOut: boolean;
}

export interface Team {
  name: string;
  players: Player[];
  totalScore: number;
  wicketsLost: number;
  maxWickets: number;
}

export interface MatchSettings {
  overs: number;
  playerCount: number;
  targetScore: number;
  timeLimit: number;
  wickets?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface GameState {
  gameMode: GameMode | null;
  settings: MatchSettings;
  battingTeam: Team;
  bowlingTeam: Team;
  currentBatter: Player | null;
  currentBowler: Player | null;
  currentInning: 1 | 2;
  ballsPlayed: number;
  oversCompleted: number;
  lastBatterGesture: HandGesture | null;
  lastBowlerGesture: HandGesture | null;
  isGameOver: boolean;
  winner: Team | null;
}

interface GameContextType {
  gameState: GameState;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  initializeGame: (mode: GameMode, customSettings?: MatchSettings) => void;
  playBall: (batterGesture: HandGesture, bowlerGesture: HandGesture) => void;
  switchInnings: () => void;
  resetGame: () => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Default game settings
const defaultSettings: MatchSettings = {
  overs: 1,
  playerCount: 1,
  targetScore: 0,
  timeLimit: 0,
  wickets: 1,
  difficulty: 'medium'
};

// Game provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    gameMode: null,
    settings: defaultSettings,
    battingTeam: {
      name: 'Team A',
      players: [],
      totalScore: 0,
      wicketsLost: 0,
      maxWickets: 3
    },
    bowlingTeam: {
      name: 'Team B',
      players: [],
      totalScore: 0,
      wicketsLost: 0,
      maxWickets: 3
    },
    currentBatter: null,
    currentBowler: null,
    currentInning: 1,
    ballsPlayed: 0,
    oversCompleted: 0,
    lastBatterGesture: null,
    lastBowlerGesture: null,
    isGameOver: false,
    winner: null
  });

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  }, []);

  // Initialize a new game
  const initializeGame = useCallback((mode: GameMode, customSettings?: MatchSettings) => {
    // Apply custom settings or use defaults
    const settings = customSettings || {
      ...defaultSettings,
      playerCount: mode === 'TeamVTeam' ? 3 : 1
    };

    // Create player lists based on settings
    const createPlayers = (teamPrefix: string, count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: `${teamPrefix}-${i}`,
        name: `${teamPrefix} Player ${i + 1}`,
        score: 0,
        isOut: false
      }));
    };

    // Create teams based on mode
    let teamAName = 'Team A';
    let teamBName = 'Team B';

    if (mode === '1v1') {
      teamAName = 'Player 1';
      teamBName = 'Player 2';
    } else if (mode === '1vComputer') {
      teamAName = 'Player';
      teamBName = 'Computer';
    }

    // Initialize teams
    const battingTeam: Team = {
      name: teamAName,
      players: createPlayers(teamAName, settings.playerCount),
      totalScore: 0,
      wicketsLost: 0,
      maxWickets: settings.wickets || 3
    };

    const bowlingTeam: Team = {
      name: teamBName,
      players: createPlayers(teamBName, settings.playerCount),
      totalScore: 0,
      wicketsLost: 0,
      maxWickets: settings.wickets || 3
    };

    // Set current players
    const currentBatter = battingTeam.players[0];
    const currentBowler = bowlingTeam.players[0];

    // Update game state
    setGameState({
      gameMode: mode,
      settings,
      battingTeam,
      bowlingTeam,
      currentBatter,
      currentBowler,
      currentInning: 1,
      ballsPlayed: 0,
      oversCompleted: 0,
      lastBatterGesture: null,
      lastBowlerGesture: null,
      isGameOver: false,
      winner: null
    });
  }, []);

  // Play a ball
  const playBall = useCallback((batterGesture: HandGesture, bowlerGesture: HandGesture) => {
    setGameState(prevState => {
      // Copy current state
      const newState = { ...prevState };
      
      // Update last gestures
      newState.lastBatterGesture = batterGesture;
      newState.lastBowlerGesture = bowlerGesture;
      
      // Check if batter is out
      const isOut = batterGesture === bowlerGesture;
      
      // Update balls played and overs
      newState.ballsPlayed += 1;
      if (newState.ballsPlayed % 6 === 0) {
        newState.oversCompleted += 1;
      }
      
      // Process runs or wicket
      if (isOut) {
        // Batter is out
        if (newState.currentBatter) {
          // Mark current batter as out
          const batterIndex = newState.battingTeam.players.findIndex(
            p => p.id === newState.currentBatter?.id
          );
          if (batterIndex >= 0) {
            newState.battingTeam.players[batterIndex].isOut = true;
          }
          
          // Increment wickets
          newState.battingTeam.wicketsLost += 1;
          
          // Check if all batters are out or max wickets reached
          if (newState.battingTeam.wicketsLost >= newState.battingTeam.maxWickets) {
            newState.currentBatter = null;
          } else {
            // Next batter
            const nextBatterIndex = newState.battingTeam.players.findIndex(p => !p.isOut);
            newState.currentBatter = nextBatterIndex >= 0 
              ? newState.battingTeam.players[nextBatterIndex] 
              : null;
          }
        }
      } else {
        // Batter scores runs
        if (newState.currentBatter) {
          // Update batter score
          const batterIndex = newState.battingTeam.players.findIndex(
            p => p.id === newState.currentBatter?.id
          );
          if (batterIndex >= 0) {
            newState.battingTeam.players[batterIndex].score += batterGesture;
          }
          
          // Update team score - only add the selected run once
          newState.battingTeam.totalScore += batterGesture;
        }
      }
      
      // Check if innings is over (all out, max wickets reached, or overs completed)
      const isInningsOver = 
        newState.currentBatter === null || 
        newState.battingTeam.wicketsLost >= newState.battingTeam.maxWickets ||
        newState.oversCompleted >= newState.settings.overs;
      
      // Check if game is over
      if (isInningsOver && newState.currentInning === 2) {
        newState.isGameOver = true;
        
        // Determine winner
        if (newState.battingTeam.totalScore > newState.bowlingTeam.totalScore) {
          newState.winner = newState.battingTeam;
        } else if (newState.bowlingTeam.totalScore > newState.battingTeam.totalScore) {
          newState.winner = newState.bowlingTeam;
        } else {
          // It's a tie, no winner
          newState.winner = null;
        }
      } else if (isInningsOver && newState.currentInning === 1) {
        // First innings is over, switch innings
        newState.currentInning = 2;
        newState.ballsPlayed = 0;
        newState.oversCompleted = 0;
        newState.lastBatterGesture = null;
        newState.lastBowlerGesture = null;
        
        // Swap teams
        const tempTeam = newState.battingTeam;
        newState.battingTeam = newState.bowlingTeam;
        newState.bowlingTeam = tempTeam;
        
        // Reset batting team state
        newState.battingTeam.totalScore = 0;
        newState.battingTeam.wicketsLost = 0;
        newState.battingTeam.players.forEach(p => {
          p.score = 0;
          p.isOut = false;
        });
        
        // Set current players
        newState.currentBatter = newState.battingTeam.players[0];
        newState.currentBowler = newState.bowlingTeam.players[0];
      } else if (newState.currentInning === 2 && 
                 newState.battingTeam.totalScore > newState.bowlingTeam.totalScore) {
        // Second batting team scored more than first, so game over
        newState.isGameOver = true;
        newState.winner = newState.battingTeam;
      }
      
      return newState;
    });
  }, []);

  // Switch innings
  const switchInnings = useCallback(() => {
    setGameState(prevState => {
      // Copy current state
      const newState = { ...prevState };
      
      // Swap teams
      const tempTeam = newState.battingTeam;
      newState.battingTeam = newState.bowlingTeam;
      newState.bowlingTeam = tempTeam;
      
      // Reset innings-specific state
      newState.currentInning = 2;
      newState.ballsPlayed = 0;
      newState.oversCompleted = 0;
      newState.lastBatterGesture = null;
      newState.lastBowlerGesture = null;
      
      // Set current players
      const nextBatterIndex = newState.battingTeam.players.findIndex(p => !p.isOut);
      newState.currentBatter = nextBatterIndex >= 0 
        ? newState.battingTeam.players[nextBatterIndex] 
        : null;
      
      const nextBowlerIndex = newState.bowlingTeam.players.findIndex(p => !p.isOut);
      newState.currentBowler = nextBowlerIndex >= 0 
        ? newState.bowlingTeam.players[nextBowlerIndex] 
        : newState.bowlingTeam.players[0];
      
      return newState;
    });
  }, []);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState({
      gameMode: null,
      settings: defaultSettings,
      battingTeam: {
        name: '',
        players: [],
        totalScore: 0,
        wicketsLost: 0,
        maxWickets: 3
      },
      bowlingTeam: {
        name: '',
        players: [],
        totalScore: 0,
        wicketsLost: 0,
        maxWickets: 3
      },
      currentBatter: null,
      currentBowler: null,
      currentInning: 1,
      ballsPlayed: 0,
      oversCompleted: 0,
      lastBatterGesture: null,
      lastBowlerGesture: null,
      isGameOver: false,
      winner: null
    });
  }, []);

  // Context value
  const value: GameContextType = {
    gameState,
    isDarkMode,
    toggleDarkMode,
    initializeGame,
    playBall,
    switchInnings,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Hook to use the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 