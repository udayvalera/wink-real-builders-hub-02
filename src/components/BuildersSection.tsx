
import React, { useState } from 'react';
import SignInModal from './SignInModal';

const BuildersSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Post your job to Find <span className="text-blue-600">Builders</span>. Not <span className="line-through text-gray-500">Braggers</span>.
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Post Job
          </button>
        </div>
      </section>

      <SignInModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default BuildersSection;
