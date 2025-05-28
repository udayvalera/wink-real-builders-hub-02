
import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              To-Do apps? Cut the <span className="text-red-500">crap</span>!
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Recruiters want <span className="font-bold text-gray-900">f***king production level</span> work.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Challenge Yourself
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                      i % 5 === 0 ? 'bg-blue-500' :
                      i % 5 === 1 ? 'bg-green-500' :
                      i % 5 === 2 ? 'bg-purple-500' :
                      i % 5 === 3 ? 'bg-pink-500' : 'bg-orange-500'
                    }`}
                  >
                    {i % 2 === 0 ? '🚀' : '💡'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
