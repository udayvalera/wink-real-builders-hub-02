
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import SearchDropdown from './SearchDropdown';

const RightSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for search results
  const mockSearchData = [
    { type: 'user', id: '1', title: 'Sarah Johnson', subtitle: '@sarah.johnson', avatar: '/placeholder-avatar.jpg' },
    { type: 'user', id: '2', title: 'Mike Chen', subtitle: '@mike.chen', avatar: '/placeholder-avatar.jpg' },
    { type: 'post', id: '1', title: 'Mix up how you make money—think analytics...', subtitle: 'by @apex.legends' },
    { type: 'post', id: '2', title: 'Just finished building a new feature...', subtitle: 'by @sarah.johnson' },
    { type: 'challenge', id: '1', title: 'Frontend Challenge', subtitle: 'Ends in 2 days' },
    { type: 'challenge', id: '2', title: 'Marketing Runners - Interviews', subtitle: 'Ends May 23rd' },
    { type: 'trending', id: '1', title: '#TechHiring', subtitle: '1.2k posts' },
    { type: 'trending', id: '2', title: '#DeveloperCommunity', subtitle: '856 posts' },
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return mockSearchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, mockSearchData]);

  const handleSearchSelect = (result: any) => {
    console.log('Selected:', result);
    
    // Enhanced navigation handling
    if (result.type === 'user') {
      // Navigate to user profile - using query param for compatibility
      window.location.href = `/profile?user=${result.id}`;
    } else if (result.type === 'post') {
      // Navigate to single post view
      window.location.href = `/post?id=${result.id}`;
    } else if (result.type === 'challenge') {
      // Navigate to challenge page (would need to be implemented)
      console.log('Navigate to challenge:', result.id);
    } else if (result.type === 'trending') {
      // Navigate to trending topic (would filter main feed)
      console.log('Navigate to trending topic:', result.title);
    }
    
    // Clear search after selection
    setSearchQuery('');
  };

  const handleViewAll = () => {
    console.log('View all results for:', searchQuery);
    // Navigate to full search results page (would need to be implemented)
  };

  const pendingContests = [
    {
      name: 'Marketing Runners - Interviews',
      endDate: '23rd May, 2025',
      tags: ['Gigs', 'Internship Opportunity']
    },
    {
      name: 'Frontend Challenge',
      endDate: '25th May, 2025',
      tags: ['Challenge']
    }
  ];

  const upcomingChallenges = [
    {
      title: 'Content Core National Challenge',
      duration: '2 weeks long',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Design Sprint Challenge',
      duration: '1 week long',
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <div className="w-80 bg-gray-50 h-screen fixed right-0 top-0 p-6 overflow-y-auto">
      {/* Enhanced Search with better dropdown positioning */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search things to buzz ur mind"
          className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <SearchDropdown
          query={searchQuery}
          results={searchResults}
          onSelect={handleSearchSelect}
          onViewAll={handleViewAll}
        />
      </div>

      {/* ROBOT CON 7.0 Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-8">
        <h3 className="text-xl font-bold mb-2">ROBOT CON 7.0</h3>
        <p className="text-blue-100">Join the biggest robotics conference</p>
      </div>

      {/* Pending Contests */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">3 Pending Contests</h3>
        <div className="space-y-4">
          {pendingContests.map((contest, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-gray-900 mb-1">{contest.name}</h4>
              <p className="text-sm text-gray-500 mb-2">Ends at {contest.endDate}</p>
              <div className="flex flex-wrap gap-2">
                {contest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-2 mb-6">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Challenges</span>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Jobs/Internship</span>
      </div>

      {/* Upcoming Challenges */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
        <div className="space-y-4">
          {upcomingChallenges.map((challenge, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${challenge.color} rounded-lg p-4 text-white`}
            >
              <h4 className="font-semibold mb-1">Content Core</h4>
              <p className="text-sm opacity-90">{challenge.title}</p>
              <p className="text-xs opacity-75 mt-1">{challenge.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
