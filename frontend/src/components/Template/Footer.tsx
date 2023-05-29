import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 py-4">
      <div className="container mx-auto text-center text-gray-600">
        <p className="text-sm">
          &copy; 2023 Your Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
