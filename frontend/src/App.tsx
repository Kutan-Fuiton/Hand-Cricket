import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import CustomSettingsPage from './pages/CustomSettingsPage';
import AboutPage from './pages/AboutPage';
import TournamentsPage from './pages/TournamentsPage';
import UpdatesPage from './pages/UpdatesPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

// Wrapper component to use context hooks
const AppContent: React.FC = () => {
  const { isDarkMode } = useGame();
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isDarkMode={isDarkMode} toggleDarkMode={useGame().toggleDarkMode} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:mode" element={<GamePage />} />
          <Route path="/custom-settings" element={<CustomSettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <p>Hand Cricket Game &copy; {new Date().getFullYear()} - Made with React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

// Main App Component with Provider
const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <AppContent />
      </Router>
    </GameProvider>
  );
};

export default App;
