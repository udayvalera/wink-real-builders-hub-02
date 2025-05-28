
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, Mail, MessageSquare } from 'lucide-react';
import PostCard from './PostCard';
import PostModal from './PostModal';
import FollowButton from './FollowButton';

interface PublicUser {
  id: string;
  fullName: string;
  username: string;
  email?: string;
  bio: string;
  profilePictureUrl?: string;
  websiteUrl?: string;
  following: number;
  followers: number;
  posts: number;
  likes: number;
  comments: number;
}

const PublicUserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in a real app, this would fetch from API based on username
  useEffect(() => {
    // Simulate API call
    const mockUser: PublicUser = {
      id: '2',
      fullName: 'Alex Chen',
      username: username || 'alex.chen',
      email: 'alex.chen@example.com',
      bio: 'Frontend developer passionate about React and TypeScript. Love building beautiful, accessible user interfaces. Always learning something new!',
      profilePictureUrl: '/placeholder-avatar.jpg',
      websiteUrl: 'https://alexchen.dev',
      following: 67,
      followers: 234,
      posts: 42,
      likes: 567,
      comments: 123
    };
    setUser(mockUser);
  }, [username]);

  // Mock posts data - no tags displayed
  const mockPosts = [
    {
      id: 3,
      user: {
        name: user?.fullName || 'Alex Chen',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '1 day ago'
      },
      tags: [], // No tags displayed in public profile activity
      content: 'Working on a new React component library! The focus is on accessibility and performance. Really excited to share it with the community once it\'s ready. 🚀',
      image: '/lovable-uploads/739812b0-4170-4d68-a310-3f0e364d0040.png',
      engagement: {
        likes: 34,
        comments: 8,
        shares: 2
      }
    },
    {
      id: 4,
      user: {
        name: user?.fullName || 'Alex Chen',
        avatar: '/placeholder-avatar.jpg',
        timestamp: '3 days ago'
      },
      tags: [], // No tags displayed in public profile activity
      content: 'Just attended an amazing tech conference! The keynote on the future of web development was mind-blowing. So many new ideas to explore and implement.',
      engagement: {
        likes: 56,
        comments: 15,
        shares: 4
      }
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleFollowChange = (following: boolean) => {
    setIsFollowing(following);
    console.log(`User ${following ? 'followed' : 'unfollowed'} ${user?.fullName}`);
  };

  const handleMessage = () => {
    console.log(`Message ${user?.fullName}`);
    // In a real app, this would open a messaging interface
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-purple-400 to-blue-500 relative">
          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.profilePictureUrl} alt={user.fullName} />
              <AvatarFallback className="text-2xl font-bold bg-gray-300">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 pb-6 px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{user.fullName}</h1>
          <p className="text-lg text-gray-600 mb-6">@{user.username}</p>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <FollowButton
              userId={user.id}
              initialIsFollowing={isFollowing}
              onFollowChange={handleFollowChange}
            />
            <Button
              onClick={handleMessage}
              variant="outline"
              className="px-6 py-2"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="text-center">
              <span className="font-bold text-gray-900">{user.posts}</span>
              <p>Posts</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-gray-900">{user.likes}</span>
              <p>Likes</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-gray-900">{user.comments}</span>
              <p>Comments</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-gray-900">{user.following}</span>
              <p>Following</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-gray-900">{user.followers}</span>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          
          <div className="space-y-2">
            {user.websiteUrl && (
              <div className="flex items-center space-x-2 text-gray-600">
                <LinkIcon className="w-4 h-4" />
                <a 
                  href={user.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {user.websiteUrl.replace('https://', '').replace('http://', '')}
                </a>
              </div>
            )}
            
            {user.email && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Posts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

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

export default PublicUserProfile;
