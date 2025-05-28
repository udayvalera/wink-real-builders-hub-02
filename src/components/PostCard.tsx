
import React from 'react';
import { Heart, Search } from 'lucide-react';

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    timestamp: string;
  };
  tags: string[];
  content: string;
  image?: string | null;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">{post.user.timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
        {post.image && (
          <div className="mt-4">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Engagement */}
      <div className="flex items-center space-x-6 text-gray-500">
        <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
          <Heart size={18} />
          <span className="text-sm">{post.engagement.likes}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
          <Search size={18} />
          <span className="text-sm">{post.engagement.comments}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
          <span className="text-sm">{post.engagement.shares} shares</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
