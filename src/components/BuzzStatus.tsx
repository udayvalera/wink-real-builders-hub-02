
import React, { useState } from 'react';

interface BuzzStatusProps {
  isBuzzing: boolean;
}

const BuzzStatus = ({ isBuzzing }: BuzzStatusProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${
          isBuzzing 
            ? 'bg-orange-100 text-orange-700 border border-orange-200' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}
        aria-label={isBuzzing ? "This post is buzzing" : "Post buzz status"}
      >
        {isBuzzing ? 'buzzing' : 'buzz'}
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 animate-fade-in">
          <div className="bg-gray-900 text-white text-xs rounded-md px-3 py-2 whitespace-nowrap">
            {isBuzzing 
              ? "This post is currently trending due to high engagement!" 
              : "This post is not currently buzzing"
            }
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuzzStatus;
