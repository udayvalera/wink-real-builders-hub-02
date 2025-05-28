
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PostCard from './PostCard';
import PostModal from './PostModal';

interface User {
  id: string;
  fullName: string;
  username: string;
  posts: number;
}

interface ProfileActivityProps {
  user: User;
}

// Mock posts data
const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: '/placeholder-avatar.jpg',
      timestamp: '2 days ago'
    },
    tags: ['Developer', 'React'],
    content: 'Just finished building a new feature for our platform! The component architecture is so much cleaner now. Love how React hooks make state management more intuitive.',
    image: '/lovable-uploads/739812b0-4170-4d68-a310-3f0e364d0040.png',
    engagement: {
      likes: 45,
      comments: 12,
      shares: 3
    }
  },
  {
    id: 2,
    user: {
      name: 'Sarah Johnson',
      avatar: '/placeholder-avatar.jpg',
      timestamp: '1 week ago'
    },
    tags: ['Developer', 'Open Source'],
    content: 'Contributing to open source projects has been one of the most rewarding experiences in my career. If you\'re thinking about getting started, just do it! The community is incredibly welcoming.',
    engagement: {
      likes: 78,
      comments: 23,
      shares: 8
    }
  }
];

const ProfileActivity = ({ user }: ProfileActivityProps) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
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

      {selectedPost && (
        <PostModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProfileActivity;
