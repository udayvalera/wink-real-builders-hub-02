
import { useState } from 'react';

export interface PostInteractionState {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isBuzzing: boolean;
}

export const usePostInteractions = (initialState: PostInteractionState) => {
  const [state, setState] = useState(initialState);

  const toggleLike = () => {
    setState(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1
    }));
  };

  const incrementComments = () => {
    setState(prev => ({
      ...prev,
      commentCount: prev.commentCount + 1
    }));
  };

  const incrementShares = () => {
    setState(prev => ({
      ...prev,
      shareCount: prev.shareCount + 1
    }));
  };

  return {
    state,
    toggleLike,
    incrementComments,
    incrementShares
  };
};
