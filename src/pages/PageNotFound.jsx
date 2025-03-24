import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center  bg-gray-50 text-gray-800 font-sans">
      <FaExclamationTriangle className="text-8xl text-red-500 mb-8" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg max-w-md text-center leading-relaxed mb-8">
        Oops! It seems we've wandered off the path. The page you're looking for
        doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Return Home
      </a>
    </div>
  );
};

export default PageNotFound;
