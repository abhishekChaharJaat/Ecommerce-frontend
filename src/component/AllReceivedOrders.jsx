import React, { useState } from "react";
import { FaChevronDown, FaPlus, FaTimes, FaChevronUp } from "react-icons/fa";

const AllReceivedOrders = () => {

  const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle form visibility

  return (
    <div
      className={`${
        isFormOpen ? "" : ""
      } max-w-[1000px] md:mx-auto md:rounded-[8px] bg-white`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className={`w-full py-4 px-6 font-medium bg-slate-600 hover:bg-slate-700 text-white md:rounded-t-[4px] transition-colors duration-200 flex items-center justify-between gap-2 cursor-pointer ${
          isFormOpen ? "" : "md:rounded-b-[4px]"
        }`}
      >
        {isFormOpen ? "Close Form" : "All Received Orders"}
        {isFormOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {/* Form with Slide Animation */}
      <div
        className={`overflow-hidden box-border transition-all duration-500 ease-in-out bg-white border shadow-md px-6 md:px-20 rounded-b-[8px] ${
          isFormOpen ? "max-h-[2000px] opacity-100 py-6" : "max-h-0 opacity-0 "
        }`}
      >
        <p className="text-center font-medium text-xl">Orders </p>
      
      </div>
    </div>
  );
};

export default AllReceivedOrders;
