
import React, { useState } from 'react';
import { Paperclip, Pin, Image, Heart, Search } from 'lucide-react';
import PostCard from './PostCard';
import PostModal from './PostModal';
import CreatePostModal from './CreatePostModal';

const MainFeed = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const filters = ['All', 'Gossip', 'Frontend', 'Backend', 'Frontend', 'Marketing', 'Design'];

  const [posts, setPosts] = useState([
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
  ]);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleCreatePost = (content: string, attachments?: File[]) => {
    console.log('Creating post:', content, attachments);
    
    // Create new post object
    const newPost = {
      id: Math.max(...posts.map(p => p.id)) + 1, // Generate new ID
      user: {
        name: 'Current User', // In a real app, this would come from auth context
        avatar: '/placeholder-avatar.jpg',
        timestamp: 'Just now'
      },
      tags: ['buzzing'],
      content: content,
      image: attachments && attachments.length > 0 ? URL.createObjectURL(attachments[0]) : null,
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    };

    // Add new post to the top of the feed
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Handle clicking on the post creation trigger
  const handlePostTriggerClick = () => {
    setIsCreatePostOpen(true);
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

      {/* Post Creation Trigger - Updated for better interaction */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div
          onClick={handlePostTriggerClick}
          className="w-full flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg p-2 -m-2"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <span className="text-gray-500">Write and Wink your thoughts here...</span>
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

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPost={handleCreatePost}
      />
    </div>
  );
};

export default MainFeed;
