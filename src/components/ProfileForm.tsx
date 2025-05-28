
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  profilePictureUrl?: string;
  websiteUrl?: string;
  role: string;
}

interface ProfileFormProps {
  userData: User;
  onSave: (data: Partial<User>) => void;
  onCancel: () => void;
}

const ProfileForm = ({ userData, onSave, onCancel }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    username: userData.username,
    email: userData.email,
    bio: userData.bio,
    websiteUrl: userData.websiteUrl || '',
    profilePictureUrl: userData.profilePictureUrl
  });

  const [charCount, setCharCount] = useState(userData.bio.length);
  const maxBioLength = 500;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'bio') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePhotoChange = () => {
    // Simulate file picker - in real app, this would open a file input
    console.log('Photo change clicked - would open file picker');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const hasChanges = () => {
    return (
      formData.fullName !== userData.fullName ||
      formData.username !== userData.username ||
      formData.email !== userData.email ||
      formData.bio !== userData.bio ||
      formData.websiteUrl !== (userData.websiteUrl || '')
    );
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-900">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={formData.profilePictureUrl} alt={formData.fullName} />
                <AvatarFallback className="text-2xl font-bold bg-gray-300">
                  {getInitials(formData.fullName)}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={handlePhotoChange}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handlePhotoChange}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Change Photo
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                Username *
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Create a unique username"
                required
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Your public identifier on Wink.</p>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Your email address"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself and your skills..."
                rows={4}
                maxLength={maxBioLength}
                className="mt-1 resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Share your story, skills, and interests</p>
                <span className={`text-xs ${charCount > maxBioLength * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                  {charCount}/{maxBioLength}
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="website" className="text-sm font-semibold text-gray-700">
                Website (Optional)
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                placeholder="e.g., https://yourportfolio.com"
                className="mt-1"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!hasChanges()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
