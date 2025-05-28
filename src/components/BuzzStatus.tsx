
import React, { useState } from 'react';

interface BuzzStatusProps {
  userId: string;
  initialIsFollowing?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

const BuzzStatus = ({ userId, initialIsFollowing = false, onFollowChange }: BuzzStatusProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    onFollowChange?.(newFollowingState);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 border ${
        isFollowing 
          ? 'bg-blue-600 text-white border-blue-600' 
          : 'bg-white text-blue-600 border-blue-600'
      }`}
      aria-label={isFollowing ? "Unfollow this user" : "Follow this user"}
    >
      {isFollowing ? 'Buzzing' : 'Buzz'}
    </button>
  );
};

export default BuzzStatus;
