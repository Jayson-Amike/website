import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import UserTypeSection from './UserTypeSection';
import FeaturesSection from './FeatureSection';
import Footer from './Footer';


// --- MAIN INDEX PAGE ---
function IndexPage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <UserTypeSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

export default IndexPage;