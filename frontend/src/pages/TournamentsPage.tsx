import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TournamentsPage: React.FC = () => {
  // Sample tournament data
  const tournaments = [
    {
      id: 1,
      name: 'Spring Championship 2024',
      startDate: 'April 15, 2024',
      endDate: 'April 30, 2024',
      status: 'Upcoming',
      participants: 32,
      prize: '$500'
    },
    {
      id: 2,
      name: 'Weekend Knockout Series',
      startDate: 'Every Saturday',
      endDate: 'Every Sunday',
      status: 'Ongoing',
      participants: 16,
      prize: '$100'
    },
    {
      id: 3,
      name: 'Summer Grand Slam',
      startDate: 'June 1, 2024',
      endDate: 'August 31, 2024',
      status: 'Upcoming',
      participants: 64,
      prize: '$1000'
    },
    {
      id: 4,
      name: 'Winter Cup 2023',
      startDate: 'December 1, 2023',
      endDate: 'December 15, 2023',
      status: 'Completed',
      participants: 24,
      prize: '$350',
      winner: 'Team Phoenix'
    }
  ];

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Tournaments
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Upcoming & Ongoing Tournaments</h2>
          <Link 
            to="/tournaments/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Register Team
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.filter(t => t.status !== 'Completed').map(tournament => (
            <motion.div 
              key={tournament.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{tournament.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  tournament.status === 'Upcoming' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
                    : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                }`}>
                  {tournament.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-medium">Dates:</span> {tournament.startDate} to {tournament.endDate}</p>
                <p><span className="font-medium">Participants:</span> {tournament.participants} teams</p>
                <p><span className="font-medium">Prize Pool:</span> {tournament.prize}</p>
              </div>
              <div className="mt-4">
                <Link 
                  to={`/tournaments/${tournament.id}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Past Tournaments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.filter(t => t.status === 'Completed').map(tournament => (
            <motion.div 
              key={tournament.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="flex justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{tournament.name}</h3>
                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  Completed
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-medium">Dates:</span> {tournament.startDate} to {tournament.endDate}</p>
                <p><span className="font-medium">Participants:</span> {tournament.participants} teams</p>
                <p><span className="font-medium">Prize Pool:</span> {tournament.prize}</p>
                <p><span className="font-medium">Winner:</span> {tournament.winner}</p>
              </div>
              <div className="mt-4">
                <Link 
                  to={`/tournaments/${tournament.id}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  View Results →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TournamentsPage; 