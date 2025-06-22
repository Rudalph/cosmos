import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Herosection';
import ApiCarousel from '../components/ApiCarousle';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ApiCarousel />
      <Footer />
    </>
  );
};

export default Home;
