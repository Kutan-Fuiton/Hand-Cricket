import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UpdatesPage: React.FC = () => {
  // Sample news and updates data
  const updates = [
    {
      id: 1,
      title: 'New Tournament System Launched',
      date: 'April 5, 2024',
      summary: 'We\'re excited to announce our new tournament system, allowing players to compete in organized competitions with prizes!',
      category: 'Feature Update',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Spring Championship 2024 Announced',
      date: 'March 28, 2024',
      summary: 'Registration is now open for our Spring Championship 2024! Join teams from around the world in this exciting competition.',
      category: 'Tournament',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Mobile App Coming Soon',
      date: 'March 15, 2024',
      summary: 'We\'re developing a mobile app for Hand Cricket! Play on the go and receive push notifications for your matches.',
      category: 'Announcement',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Game Balance Update',
      date: 'March 10, 2024',
      summary: 'We\'ve adjusted some game mechanics to make matches more balanced and exciting. Check out the details!',
      category: 'Game Update',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Category filter buttons
  const categories = ['All', 'Feature Update', 'Tournament', 'Announcement', 'Game Update'];

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        News & Updates
      </h1>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Updates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {updates.map(update => (
          <motion.div 
            key={update.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={update.image} 
                alt={update.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {update.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {update.date}
                </span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                {update.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {update.summary}
              </p>
              <Link 
                to={`/updates/${update.id}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Newsletter signup */}
      <div className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 max-w-xl mx-auto">Subscribe to our newsletter to receive the latest news, tournament announcements, and game updates directly in your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-3 rounded-md text-gray-800 w-full"
          />
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdatesPage; 