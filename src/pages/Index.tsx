
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import BuildersSection from '../components/BuildersSection';
import ValueSection from '../components/ValueSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <BuildersSection />
      <ValueSection />
      <Footer />
    </div>
  );
};

export default Index;
