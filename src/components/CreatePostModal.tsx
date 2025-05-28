
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Paperclip, Pin, Image, X } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string, attachments?: File[]) => void;
}

const CreatePostModal = ({ isOpen, onClose, onPost }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const maxLength = 400;

  const handlePost = () => {
    if (postContent.trim()) {
      onPost(postContent, attachments);
      setPostContent('');
      setAttachments([]);
      onClose();
    }
  };

  const handleAttachment = () => {
    // Simulate file picker - in real app, this would open a file input
    console.log('Attachment clicked - would open file picker');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold text-gray-900">Current User</h4>
              <p className="text-sm text-gray-500">@currentuser</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-3">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write and Wink your thoughts here..."
              className="w-full min-h-32 resize-none border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
              maxLength={maxLength}
            />
            
            {/* Character Counter */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-gray-500">
                <button 
                  onClick={handleAttachment}
                  className="hover:text-blue-600 transition-colors"
                  type="button"
                >
                  <Paperclip size={20} />
                </button>
                <button 
                  onClick={handleAttachment}
                  className="hover:text-blue-600 transition-colors"
                  type="button"
                >
                  <Pin size={20} />
                </button>
                <button 
                  onClick={handleAttachment}
                  className="hover:text-blue-600 transition-colors"
                  type="button"
                >
                  <Image size={20} />
                </button>
              </div>
              <span className={`text-sm ${postContent.length > maxLength * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                {postContent.length}/{maxLength}
              </span>
            </div>
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-700">Attachments</h5>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePost}
              disabled={!postContent.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
