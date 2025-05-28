import React, { useState } from 'react';
import { X, Heart, MessageSquare, Share } from 'lucide-react';
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

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
    timestamp: string;
  };
  content: string;
  image?: string | null;
}

interface PostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal = ({ post, isOpen, onClose }: PostModalProps) => {
  const [commentText, setCommentText] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const { state, toggleLike, incrementComments, incrementShares } = usePostInteractions({
    isLiked: false,
    likeCount: post.engagement.likes,
    commentCount: post.engagement.comments,
    shareCount: post.engagement.shares,
    isBuzzing: post.tags.includes('buzzing')
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '1 hour ago'
      },
      content: 'This is exactly what the industry needs! Finally someone addressing the real issues with traditional hiring.',
      image: '/lovable-uploads/739812b0-4170-4d68-a310-3f0e364d0040.png'
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '2 hours ago'
      },
      content: 'Love the approach! When can we expect to see more challenges on the platform?'
    },
    {
      id: 3,
      user: {
        name: 'Alex Rivera',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '3 hours ago'
      },
      content: 'This could revolutionize how we hire developers. Looking forward to participating!'
    }
  ]);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        user: {
          name: 'Current User',
          avatar: '/placeholder-avatar.jpg',
          timestamp: 'Just now'
        },
        content: commentText
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      incrementComments();
    }
  };

  const handleShare = () => {
    incrementShares();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-60"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl h-[90vh] max-h-[900px] mx-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <span className="text-sm text-gray-500">Comment Viewer</span>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Original Post Content */}
            <div className="p-6 border-b border-gray-200">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{post.user.name}</h4>
                    <BuzzStatus isBuzzing={state.isBuzzing} />
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
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">{post.content}</p>
                {post.image && (
                  <div className="mt-4">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full max-w-2xl h-auto object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Engagement */}
              <div className="flex items-center space-x-6 text-gray-500">
                <button 
                  onClick={toggleLike}
                  className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                    state.isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                  aria-label={state.isLiked ? "Unlike this post" : "Like this post"}
                >
                  <Heart 
                    size={20} 
                    className={state.isLiked ? 'fill-current' : ''} 
                  />
                  <span className="text-sm">{state.likeCount}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-blue-500">
                  <MessageSquare size={20} />
                  <span className="text-sm">{state.commentCount}</span>
                </div>
                
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center space-x-2 hover:text-green-500 transition-all duration-200 hover:scale-105"
                  aria-label="Share this post"
                >
                  <Share size={20} />
                  <span className="text-sm">{state.shareCount}</span>
                </button>
              </div>
            </div>

            {/* Comment Input Area */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write and Wink your thoughts here..."
                    className="w-full resize-none border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="p-6 space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-semibold text-gray-900">{comment.user.name}</h5>
                      <span className="text-sm text-gray-500">{comment.user.timestamp}</span>
                    </div>
                    
                    {/* Comment content with media side by side */}
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        <div className="mt-2">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart size={16} />
                            <span className="text-sm">Like</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Comment media on the right */}
                      {comment.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={comment.image}
                            alt="Comment media"
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default PostModal;
