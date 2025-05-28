
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link as LinkIcon, Mail } from 'lucide-react';

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

interface ProfileAboutProps {
  user: User;
}

const ProfileAbout = ({ user }: ProfileAboutProps) => {
  return (
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
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAbout;
