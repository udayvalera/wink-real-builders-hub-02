import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess?: () => void;
}

const SignInModal = ({ isOpen, onClose, onSignInSuccess }: SignInModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    // Dummy sign-in - just redirect to dashboard or call success callback
    onClose();
    if (onSignInSuccess) {
      onSignInSuccess();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-[90%] max-w-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Colorful Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Left side abstract shapes */}
          <div className="absolute left-0 top-0 w-48 h-full">
            <div className="absolute top-8 left-4 w-16 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl transform rotate-12"></div>
            <div className="absolute top-24 left-8 w-12 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl transform -rotate-6"></div>
            <div className="absolute top-40 left-2 w-20 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full transform rotate-45"></div>
            <div className="absolute bottom-32 left-6 w-14 h-18 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl transform rotate-12"></div>
            <div className="absolute bottom-16 left-12 w-10 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform -rotate-12"></div>
          </div>
          
          {/* Right side abstract shapes */}
          <div className="absolute right-0 top-0 w-48 h-full">
            <div className="absolute top-12 right-4 w-18 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl transform -rotate-12"></div>
            <div className="absolute top-32 right-8 w-14 h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-3xl transform rotate-6"></div>
            <div className="absolute top-52 right-2 w-16 h-14 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full transform -rotate-45"></div>
            <div className="absolute bottom-28 right-6 w-12 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl transform rotate-24"></div>
            <div className="absolute bottom-12 right-10 w-16 h-12 bg-gradient-to-br from-green-400 to-yellow-500 rounded-3xl transform -rotate-6"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Your profile deserves{' '}
            <span className="text-blue-600">recognition</span> — not rejection.
          </h2>

          {/* Body Text */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            At our core, we believe talent should be recognized, not rejected. 
            We're India's most authentic hiring and career community — no bias, 
            no bots, no ignored resumes. Just fair opportunities, real projects, 
            and honest reviews. If you're tired of being overlooked, this is where 
            your true potential gets seen.
          </p>

          {/* Google Sign-in Button */}
          <button 
            onClick={handleGoogleSignIn}
            className="inline-flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-md mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC04"/>
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          {/* Terms & Privacy */}
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
            On registering on wink you are agreeing to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policies</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
