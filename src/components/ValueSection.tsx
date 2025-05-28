
import React, { useState } from 'react';
import SignInModal from './SignInModal';

const ValueSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Get hires who builds
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-8">
                <span className="text-green-600">Real Solutions</span> only.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Find Talent
              </button>
            </div>

            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-10 h-10 rounded-full ${
                        i % 6 === 0 ? 'bg-blue-400' :
                        i % 6 === 1 ? 'bg-green-400' :
                        i % 6 === 2 ? 'bg-purple-400' :
                        i % 6 === 3 ? 'bg-pink-400' :
                        i % 6 === 4 ? 'bg-yellow-400' : 'bg-orange-400'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right lg:text-right">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                We validate skills through <span className="text-purple-600">Real Tasks</span>.
              </h3>
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

export default ValueSection;
