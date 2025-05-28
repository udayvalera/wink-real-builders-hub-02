
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import RightSidebar from '../components/RightSidebar';
import PublicUserProfile from '../components/PublicUserProfile';
import SignInModal from '../components/SignInModal';

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      
      if (!authStatus) {
        setIsSignInModalOpen(true);
      }
    };

    checkAuth();
  }, []);

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    setIsSignInModalOpen(false);
    localStorage.setItem('isAuthenticated', 'true');
  };

  if (!username) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600">The username is missing or invalid.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in to view profiles</h1>
            <p className="text-gray-600">You need to be signed in to view user profiles.</p>
          </div>
        </div>
        <SignInModal 
          isOpen={isSignInModalOpen} 
          onClose={() => setIsSignInModalOpen(false)}
          onSignInSuccess={handleSignInSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 ml-60 mr-80">
        <PublicUserProfile />
      </div>
      <RightSidebar />
    </div>
  );
};

export default PublicProfile;
