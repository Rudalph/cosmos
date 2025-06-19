import React from "react";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/23764/pexels-photo.jpg')"
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content container */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6 py-16">
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          Explore the Universe with
          <span className="block text-blue-400">COSMOS</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Dive into real-time space data, images, and discoveries powered by cutting-edge science.
        </p>
        
        {/* Call-to-action button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl">
          Get Started
        </button>
        
      </div>
    </section>
  );
};

export default HeroSection;