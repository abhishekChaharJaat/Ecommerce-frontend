import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children, title, isHeader, className }) => {
  // If modal is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300" />

      {/* Modal Content */}
      <div
        className={`w-full md:w-auto md:h-auto relative overflow-y-auto mx-1 overflow-hidden rounded-[8px] bg-white shadow-xl transform transition-all duration-300 scale-100 ${className}`}
      >
        {isHeader ? (
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {title || "Modal Title"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="absolute right-[15px] top-[15px] text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
