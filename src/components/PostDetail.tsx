
import React, { useState } from 'react';
import { Heart, MessageSquare, Share } from 'lucide-react';
import BuzzStatus from './BuzzStatus';
import SharePostModal from './SharePostModal';
import { usePostInteractions } from '../hooks/usePostInteractions';

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

interface PostDetailProps {
  postId: string;
}

const PostDetail = ({ postId }: PostDetailProps) => {
  const [commentText, setCommentText] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Mock post data - in a real app this would be fetched based on postId
  const post = {
    id: parseInt(postId),
    user: {
      name: 'Apex Legends',
      avatar: '/placeholder-avatar.jpg',
      timestamp: '4 hours ago'
    },
    tags: ['buzzing'],
    content: 'We\'re revolutionizing how developers showcase their skills! 🚀 Traditional hiring processes often overlook real talent. Our platform focuses on practical challenges that demonstrate actual coding abilities, not just resume keywords. Join thousands of developers who are already proving their worth through hands-on projects. #TechHiring #DeveloperCommunity #Innovation',
    image: '/lovable-uploads/739812b0-4170-4d68-a310-3f0e364d0040.png',
    engagement: {
      likes: 156,
      comments: 23,
      shares: 12
    }
  };

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

  const handleFollowChange = (isFollowing: boolean) => {
    console.log(`User ${isFollowing ? 'followed' : 'unfollowed'} ${post.user.name}`);
    // In a real app, this would make an API call to update the follow status
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Navigation */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <a href="/dashboard" className="hover:text-blue-600">Home</a>
              <span>/</span>
              <span className="text-gray-900">Post</span>
            </nav>
          </div>

          {/* Main Post Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Post Content Section */}
            <div className="p-8">
              {/* User Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{post.user.name}</h2>
                    <BuzzStatus 
                      userId={post.user.name} 
                      initialIsFollowing={false}
                      onFollowChange={handleFollowChange}
                    />
                    {post.tags.filter(tag => tag !== 'buzzing').map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500">{post.user.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">{post.content}</p>
                {post.image && (
                  <div className="mb-6">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full max-w-3xl h-auto object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Engagement */}
              <div className="flex items-center space-x-8 text-gray-500 pb-8 border-b border-gray-200">
                <button 
                  onClick={toggleLike}
                  className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                    state.isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                  aria-label={state.isLiked ? "Unlike this post" : "Like this post"}
                >
                  <Heart 
                    size={24} 
                    className={state.isLiked ? 'fill-current' : ''} 
                  />
                  <span className="font-medium">{state.likeCount}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-blue-500">
                  <MessageSquare size={24} />
                  <span className="font-medium">{state.commentCount}</span>
                </div>
                
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center space-x-2 hover:text-green-500 transition-all duration-200 hover:scale-105"
                  aria-label="Share this post"
                >
                  <Share size={24} />
                  <span className="font-medium">{state.shareCount}</span>
                </button>
              </div>
            </div>

            {/* Comment Input Area */}
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write and Wink your thoughts here..."
                    className="w-full resize-none border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim()}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="px-8 py-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>
              <div className="space-y-8">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-bold text-gray-900">{comment.user.name}</h5>
                        <span className="text-sm text-gray-500">{comment.user.timestamp}</span>
                      </div>
                      
                      {/* Comment content with media side by side */}
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>
                          <div>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                              <Heart size={16} />
                              <span className="text-sm font-medium">Like</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Comment media on the right */}
                        {comment.image && (
                          <div className="flex-shrink-0">
                            <img
                              src={comment.image}
                              alt="Comment media"
                              className="w-40 h-28 object-cover rounded-lg"
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
      </div>

      <SharePostModal
        postId={postId}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShare}
      />
    </>
  );
};

export default PostDetail;
