import React from 'react';
import HeroSection from './HeroSection';
import UserTypeSection from './UserTypeSection';
import FeaturesSection from './FeatureSection';
import Footer from './Footer';


// --- MAIN INDEX PAGE ---
function HomePage() {
  return (
    <div>
      <main>
        <HeroSection />
        <UserTypeSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;