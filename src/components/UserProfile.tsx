
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileActivity from './ProfileActivity';
import ProfileForm from './ProfileForm';
import { useToast } from '@/hooks/use-toast';

// Mock user data - removed role field
const mockUser = {
  id: '1',
  fullName: 'Sarah Johnson',
  username: 'sarah.johnson',
  email: 'sarah.johnson@example.com',
  bio: 'Passionate Full-stack developer with 5+ years experience building scalable web applications. Love working with React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.',
  profilePictureUrl: '/placeholder-avatar.jpg',
  websiteUrl: 'https://sarahjohnson.dev',
  isOnboarded: true,
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2024-01-15'),
  following: 45,
  followers: 128,
  posts: 23,
  likes: 340,
  comments: 89
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const { toast } = useToast();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedData: any) => {
    setUserData({ ...userData, ...updatedData });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ProfileForm
          userData={userData}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProfileHeader user={userData} onEditClick={handleEditClick} />
      <ProfileAbout user={userData} />
      <ProfileActivity user={userData} />
    </div>
  );
};

export default UserProfile;
