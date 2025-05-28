
import React, { useState } from 'react';

interface FollowButtonProps {
  userId: string;
  initialIsFollowing?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

const FollowButton = ({ userId, initialIsFollowing = false, onFollowChange }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFollow = () => {
    if (isFollowing) {
      setShowConfirm(true);
    } else {
      setIsFollowing(true);
      onFollowChange?.(true);
    }
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    setShowConfirm(false);
    onFollowChange?.(false);
  };

  const handleCancelUnfollow = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="relative">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUnfollow}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Unfollow
          </button>
          <button
            onClick={handleCancelUnfollow}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleFollow}
      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
        isFollowing
          ? 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
