import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div>
      {/* Search Bar */}
      <div className="w-[350px] mx-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
