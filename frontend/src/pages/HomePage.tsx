import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GameMode, useGame } from '../context/GameContext';

// Banner carousel component
const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);
  
  // Banner statements with CTAs
  const bannerStatements = [
    {
      title: "Experience the Thrill",
      description: "Relive the classic hand cricket game with modern digital experience",
      bgColor: "from-blue-600 via-blue-500 to-indigo-700",
      bgPattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      icon: "🏏",
      cta: {
        text: "Play Now",
        action: () => navigate('/game/1vComputer')
      }
    },
    {
      title: "Join Tournaments",
      description: "Compete with players worldwide and climb the leaderboards",
      bgColor: "from-purple-500 to-pink-600",
      bgPattern: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
      icon: "🏆",
      cta: {
        text: "View Tournaments",
        action: () => navigate('/tournaments')
      }
    },
    {
      title: "Multiple Game Modes",
      description: "Play 1v1, against AI, or create custom team matches",
      bgColor: "from-green-500 to-teal-600",
      bgPattern: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      icon: "🎮",
      cta: {
        text: "Explore Modes",
        action: () => document.getElementById('game-modes')?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      title: "Create Your Legacy",
      description: "Build your profile, earn achievements, and become a Hand Cricket legend",
      bgColor: "from-red-500 to-orange-600",
      bgPattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23ffffff' fill-opacity='0.1' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      icon: "👑",
      cta: {
        text: "Sign Up",
        action: () => navigate('/signup')
      }
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % bannerStatements.length);
      }, 5000); // Change slide every 5 seconds
    };

    startInterval();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [bannerStatements.length]);

  // Pause auto-scroll on hover
  const pauseAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Resume auto-scroll when mouse leaves
  const resumeAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerStatements.length);
    }, 5000);
  };

  // Manual navigation
  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentSlide(index);
    resumeAutoScroll();
  };

  // Navigation arrows
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + bannerStatements.length) % bannerStatements.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    resumeAutoScroll();
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % bannerStatements.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    resumeAutoScroll();
  };

  return (
    <div 
      className="relative w-full h-80 sm:h-96 mb-8 overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          className={`absolute inset-0 bg-gradient-to-r ${bannerStatements[currentSlide].bgColor} flex items-center justify-center text-white p-6 overflow-hidden`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background pattern */}
          <motion.div 
            className="absolute inset-0 z-0" 
            style={{ 
              backgroundImage: bannerStatements[currentSlide].bgPattern,
              backgroundSize: 'auto',
              opacity: 0.7
            }}
            animate={{ 
              scale: [1, 1.05, 1],
              backgroundPosition: ['0% 0%', '2% 2%', '0% 0%']
            }}
            transition={{ 
              duration: 10, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Cricket field overlay for the first slide */}
          {currentSlide === 0 && (
            <motion.div 
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='%23ffffff' d='M10,10 L90,10 L90,90 L10,90 L10,10 Z M50,10 L50,90 M10,50 L90,50 M30,10 L30,90 M70,10 L70,90 M10,30 L90,30 M10,70 L90,70'/%3E%3C/svg%3E\")",
                backgroundSize: '150px 150px',
                backgroundPosition: 'center'
              }}
              animate={{
                backgroundPosition: ['center', 'center bottom', 'center'],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}

          {/* Animated gradient circles for the first slide */}
          {currentSlide === 0 && (
            <>
              <motion.div
                className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400 rounded-full filter blur-3xl z-0 opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, 20, 0]
                }}
                transition={{
                  duration: 15,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute -bottom-40 -right-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl z-0 opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                  x: [0, -20, 0],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </>
          )}
          
          {/* Content */}
          <div className="text-center max-w-2xl relative z-10">
            <motion.div
              className="text-5xl sm:text-6xl mb-3"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            >
              {bannerStatements[currentSlide].icon}
            </motion.div>
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {bannerStatements[currentSlide].title}
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl opacity-90 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {bannerStatements[currentSlide].description}
            </motion.p>
            <motion.button
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={bannerStatements[currentSlide].cta.action}
            >
              {bannerStatements[currentSlide].cta.text}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation arrows */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {bannerStatements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-12 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { initializeGame, isDarkMode, toggleDarkMode } = useGame();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Game mode details
  const gameModes: { 
    id: GameMode; 
    title: string; 
    description: string;
    players: string;
    icon: string;
  }[] = [
    {
      id: '1v1',
      title: '1 vs 1',
      description: 'Classic hand cricket between two players taking turns.',
      players: '2 Players',
      icon: '👥'
    },
    {
      id: '1vComputer',
      title: 'VS Computer',
      description: 'Play against the computer with varying difficulty levels.',
      players: '1 Player',
      icon: '🤖'
    },
    {
      id: 'TeamVTeam',
      title: 'Team vs Team',
      description: 'Multiple players per team with batting and bowling turns.',
      players: '2+ Players',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 'Custom',
      title: 'Custom Match',
      description: 'Set your own rules, overs, and team composition.',
      players: 'Flexible',
      icon: '⚙️'
    }
  ];
  
  // Start a new game with the selected mode
  const startGame = (mode: GameMode) => {
    initializeGame(mode);
    navigate(`/game/${mode}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath stroke='%230066cc' fill='none' d='M10,10 L90,10 L90,90 L10,90 L10,10 Z M50,10 L50,90 M10,50 L90,50'/%3E%3C/svg%3E\")",
            backgroundSize: '300px 300px'
          }}
        />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Hero section */}
        <motion.div 
          className="text-center mb-6 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-40 dark:opacity-20"
            style={{ transform: 'translateX(-50%)' }}
          ></div>
          <div className="absolute bottom-0 right-1/4 w-8 h-8 bg-indigo-500 rounded-full opacity-30 dark:opacity-20"
            style={{ transform: 'translateX(50%)' }}
          ></div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2 relative inline-block">
            <span className="relative z-10">Hand Cricket Game</span>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-200 dark:bg-blue-800 opacity-50 rounded"></div>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Choose your game mode and enjoy the classic hand cricket experience. 
            Play with friends or against the computer!
          </p>
        </motion.div>
        
        {/* Banner Carousel */}
        <Banner />
        
        {/* Game modes */}
        <motion.div 
          id="game-modes"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {gameModes.map((mode) => (
            <motion.div 
              key={mode.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame(mode.id)}
            >
              {/* Decorative corner */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full opacity-20"></div>
              
              {/* Card content */}
              <div className="p-6 cursor-pointer">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3 bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center">{mode.icon}</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {mode.title}
                  </h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {mode.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {mode.players}
                  </span>
                  
                  <button className="text-blue-600 dark:text-blue-400 font-medium group flex items-center">
                    Start Game
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Blue accent border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Instructions */}
        <motion.div 
          className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-lg shadow-lg p-6 relative overflow-hidden text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Cricket-themed pattern overlay */}
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='1' d='M10,50 L90,50 M10,30 L90,30 M10,70 L90,70 M50,10 L50,90'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23ffffff' opacity='0.5'/%3E%3C/svg%3E\")",
              backgroundSize: '60px 60px'
            }}
          ></div>
          
          {/* Blue decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-white rounded-full opacity-10"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white rounded-full opacity-10"></div>
          
          {/* Cricket bat and ball decorative elements */}
          <div className="absolute top-4 right-4 text-3xl opacity-10 transform rotate-12">🏏</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-10">🏏</div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-lg p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">
                How to Play
              </h2>
            </div>
            
            <div className="space-y-3 text-white/90 ml-2 border-l-2 border-white/30 pl-4">
              <p className="flex items-start">
                <span className="inline-flex items-center justify-center bg-white/20 text-white rounded-full w-6 h-6 text-sm mr-2 flex-shrink-0">1</span>
                Each player shows a hand gesture representing a number from 1 to 6.
              </p>
              <p className="flex items-start">
                <span className="inline-flex items-center justify-center bg-white/20 text-white rounded-full w-6 h-6 text-sm mr-2 flex-shrink-0">2</span>
                If the gestures match, the batter is out.
              </p>
              <p className="flex items-start">
                <span className="inline-flex items-center justify-center bg-white/20 text-white rounded-full w-6 h-6 text-sm mr-2 flex-shrink-0">3</span>
                If they don't match, the batter scores the number they showed.
              </p>
              <p className="flex items-start">
                <span className="inline-flex items-center justify-center bg-white/20 text-white rounded-full w-6 h-6 text-sm mr-2 flex-shrink-0">4</span>
                After the batter is out or overs are completed, teams switch roles.
              </p>
              <p className="flex items-start">
                <span className="inline-flex items-center justify-center bg-white/20 text-white rounded-full w-6 h-6 text-sm mr-2 flex-shrink-0">5</span>
                The team with more runs wins the match!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage; 