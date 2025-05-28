
import React, { useState } from 'react';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BuzzStatus from './BuzzStatus';
import SharePostModal from './SharePostModal';
import { usePostInteractions } from '../hooks/usePostInteractions';

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const { state, toggleLike, incrementShares } = usePostInteractions({
    isLiked: false, // In a real app, this would come from user data
    likeCount: post.engagement.likes,
    commentCount: post.engagement.comments,
    shareCount: post.engagement.shares,
    isBuzzing: post.tags.includes('buzzing')
  });

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Convert user name to username format (remove spaces, lowercase)
    const username = post.user.name.toLowerCase().replace(/\s+/g, '.');
    navigate(`/${username}`);
  };

  const handleShare = () => {
    incrementShares();
  };

  const handleFollowChange = (isFollowing: boolean) => {
    console.log(`User ${isFollowing ? 'followed' : 'unfollowed'} ${post.user.name}`);
    // In a real app, this would make an API call to update the follow status
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div 
            className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleUserClick}
          ></div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 
                className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handleUserClick}
              >
                {post.user.name}
              </h4>
              <BuzzStatus 
                userId={post.user.name} 
                initialIsFollowing={false}
                onFollowChange={handleFollowChange}
              />
              {post.tags.filter(tag => tag !== 'buzzing').map((tag) => (
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
          <button 
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
              state.isLiked ? 'text-red-500' : 'hover:text-red-500'
            }`}
            aria-label={state.isLiked ? "Unlike this post" : "Like this post"}
          >
            <Heart 
              size={18} 
              className={state.isLiked ? 'fill-current' : ''} 
            />
            <span className="text-sm">{state.likeCount}</span>
          </button>
          
          <button 
            onClick={handleCommentClick}
            className="flex items-center space-x-2 hover:text-blue-500 transition-all duration-200 hover:scale-105"
            aria-label="View and add comments"
          >
            <MessageSquare size={18} />
            <span className="text-sm">{state.commentCount}</span>
          </button>
          
          <button 
            onClick={handleShareClick}
            className="flex items-center space-x-2 hover:text-green-500 transition-all duration-200 hover:scale-105"
            aria-label="Share this post"
          >
            <Share size={18} />
            <span className="text-sm">{state.shareCount}</span>
          </button>
        </div>
      </div>

      <SharePostModal
        postId={post.id.toString()}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShare}
      />
    </>
  );
};

export default PostCard;
