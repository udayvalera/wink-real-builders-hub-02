
import React, { useState } from 'react';
import SignInModal from './SignInModal';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Get Some Real <span className="text-blue-600">Sh*t</span> Done!
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                Screw <span className="line-through text-gray-500">LinkedIn</span> & Shitty <span className="line-through text-gray-500">Resumes</span>.
              </span>
            </h1>
            
            <div className="mb-12">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Break the Mold
              </button>
            </div>

            <div className="mt-16 relative">
              <div className="bg-gradient-to-r from-yellow-400 via-pink-400 via-purple-400 via-blue-400 via-green-400 to-orange-400 rounded-xl p-8 shadow-2xl">
                <div className="grid grid-cols-8 gap-4 opacity-80">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full ${
                        i % 4 === 0 ? 'bg-blue-600' : 
                        i % 4 === 1 ? 'bg-green-500' : 
                        i % 4 === 2 ? 'bg-pink-500' : 'bg-yellow-500'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignInModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default HeroSection;
