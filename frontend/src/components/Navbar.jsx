import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-[#0A64F6]">THE COSMOS</div>

        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-[#0A64F6]"><b>Home</b></a>
          <a href="#features" className="hover:text-[#0A64F6]"><b>Features</b></a>
          <a href="#about" className="hover:text-[#0A64F6]"><b>About</b></a>
          <a href="#contact" className="hover:text-[#0A64F6]"><b>Contact</b></a>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 px-4 pb-4 space-y-3">
          <a href="#home" className="block text-gray-700 hover:text-blue-500">Home</a>
          <a href="#features" className="block text-gray-700 hover:text-blue-500">Features</a>
          <a href="#about" className="block text-gray-700 hover:text-blue-500">About</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
