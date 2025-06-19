import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-gray-800 px-6 py-10 mt-12 border-2 border-solid border-gray-100">
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 text-center md:text-left">

        {/* Name & Thanks */}
        <div>
          <h2 className="text-xl font-bold mb-2">Rudalph Gonsalves</h2>
          <p className="text-gray-600">
            Thank you <span className="font-semibold text-gray-800">Bounce Insights</span> for the opportunity.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-6">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
            <FaTwitter size={24} />
          </a>
        </div>

        {/* NASA Credit */}
        <div>
          <p className="text-gray-600">
            Powered by <span className="font-semibold text-gray-800">NASA's Open API</span><br />
            <a href="https://api.nasa.gov" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              api.nasa.gov
            </a>
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rudalph Gonsalves. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
