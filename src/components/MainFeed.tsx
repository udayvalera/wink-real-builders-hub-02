
import React, { useState } from 'react';
import { Paperclip, Pin, Image, Heart, Search } from 'lucide-react';
import PostCard from './PostCard';
import PostModal from './PostModal';

const MainFeed = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [postContent, setPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['All', 'Gossip', 'Frontend', 'Backend', 'Frontend', 'Marketing', 'Design'];

  const posts = [
    {
      id: 1,
      user: {
        name: 'Apex Legends',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '2 hours ago'
      },
      tags: ['buzzing'],
      content: 'Mix up how you make money—think analytics 🤖, teaming up with schools 🏫, and premium services for candidates 💼—so you\'re not just relying on contest fees 💰. Also, offer a "pay-as-you-go" contest option for smaller companies to make it easier for them to join 🚀 This attracts a wider range of clients and ensures a steady income stream. Plus, it makes your services more accessible and appealing to everyone! ✨',
      image: null,
      engagement: {
        likes: 24,
        comments: 5,
        shares: 2
      }
    },
    {
      id: 2,
      user: {
        name: 'Apex Legends',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '4 hours ago'
      },
      tags: ['buzzing'],
      content: 'Mix up how you make money—think analytics 🤖, teaming up with schools 🏫, and premium services for candidates 💼—so you\'re not just relying on contest fees 💰. Also, offer a "pay-as-you-go" contest option for smaller...',
      image: '/lovable-uploads/157f2c42-efc2-46b1-9dbb-c8c22e221b36.png',
      engagement: {
        likes: 15,
        comments: 3,
        shares: 1
      }
    }
  ];

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="flex-1 ml-60 mr-80 px-8 py-8">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-6 mb-8 border-b border-gray-200">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeFilter === filter
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {filter}
          </button>
        ))}
        <button className="text-gray-400 hover:text-gray-600">
          →
        </button>
      </div>

      {/* Post Creation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write and Wink to your thoughts here..."
              className="w-full resize-none border-0 focus:ring-0 text-gray-700 placeholder-gray-500"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4 text-gray-500">
                <button className="hover:text-blue-600">
                  <Paperclip size={20} />
                </button>
                <button className="hover:text-blue-600">
                  <Pin size={20} />
                </button>
                <button className="hover:text-blue-600">
                  <Image size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400">{postContent.length}/400</span>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onClick={() => handlePostClick(post)}
          />
        ))}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MainFeed;
