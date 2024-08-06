import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Fast Eats. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-3">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
