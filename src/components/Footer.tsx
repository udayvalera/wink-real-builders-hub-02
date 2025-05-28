
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">wink</h2>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-yellow-400 via-pink-400 via-purple-400 via-blue-400 to-green-400 rounded-lg p-4 opacity-80">
              <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      i % 5 === 0 ? 'bg-blue-300' :
                      i % 5 === 1 ? 'bg-green-300' :
                      i % 5 === 2 ? 'bg-purple-300' :
                      i % 5 === 3 ? 'bg-pink-300' : 'bg-yellow-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mb-8 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-gray-400 text-sm">
            Copyright © 2023 by joinwink.co | Made by Rebel Minds
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
