
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import PostDetail from '../components/PostDetail';
import SignInModal from '../components/SignInModal';

const Post = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  
  // Mock authentication state - in a real app this would come from your auth system
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    // For demo purposes, we'll simulate this check
    const checkAuth = () => {
      // In a real app, you'd check localStorage, cookies, or your auth state
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

  if (!postId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600">The post ID is missing or invalid.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in to view this content</h1>
            <p className="text-gray-600">You need to be signed in to view posts and comments.</p>
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
      <div className="flex-1 ml-60">
        <PostDetail postId={postId} />
      </div>
    </div>
  );
};

export default Post;
