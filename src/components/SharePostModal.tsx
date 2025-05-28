
import React, { useState } from 'react';
import { X, Copy, ExternalLink } from 'lucide-react';

interface SharePostModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onShare?: () => void;
}

const SharePostModal = ({ postId, isOpen, onClose, onShare }: SharePostModalProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/post?id=${postId}&shared=true`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      onShare?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    let url = '';
    const text = 'Check out this post on Wink!';
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      onShare?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Share this Post</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm font-mono"
              />
              <button
                onClick={handleCopyLink}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Copy size={16} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500">
            Share this link directly or use the options below.
          </p>

          {/* Social Share Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Share on Social Media
            </label>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => handleSocialShare('twitter')}
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-500 transition-colors">
                  <ExternalLink size={16} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">Twitter</span>
              </button>

              <button
                onClick={() => handleSocialShare('linkedin')}
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-700 transition-colors">
                  <ExternalLink size={16} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">LinkedIn</span>
              </button>

              <button
                onClick={() => handleSocialShare('facebook')}
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-900 transition-colors">
                  <ExternalLink size={16} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">Facebook</span>
              </button>

              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-600 transition-colors">
                  <ExternalLink size={16} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePostModal;
