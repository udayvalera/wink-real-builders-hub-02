
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Link as LinkIcon, Mail } from 'lucide-react';

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  profilePictureUrl?: string;
  websiteUrl?: string;
  following: number;
  followers: number;
  posts: number;
  likes: number;
  comments: number;
}

interface ProfileHeaderProps {
  user: User;
  onEditClick: () => void;
}

const ProfileHeader = ({ user, onEditClick }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
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
        <p className="text-lg text-gray-600 mb-4">@{user.username}</p>
        
        {/* Edit Profile Button */}
        <Button
          onClick={onEditClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 mb-6"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

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
  );
};

export default ProfileHeader;
