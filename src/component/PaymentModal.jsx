import React from "react";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { changeCartItemStatus } from "../store/productSlice";
import { useDispatch } from "react-redux";
import { setIsOrderPlaced } from "../store/productSlice";

const PaymentModal = ({ isOpen, onClose, cartItemIds }) => {
   const dispatch = useDispatch();

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handlePayment = (status) => {
    dispatch(
      changeCartItemStatus({
        cartItemIds,   // Correctly passing IDs
        status,        // Status of the order
      })
    );
    dispatch(setIsOrderPlaced(true)) // Dispatching order placed action
    onClose();         // Close the modal after dispatching
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Choose Payment Method
        </h2>
        <div className="flex flex-col gap-4">
          {/* Credit Card Button */}
          <button
            onClick={() => alert("Credit Card payment selected")}
            className="flex items-center justify-start px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaCreditCard className="mr-3 text-xl" />
            <span className="text-lg font-medium">Credit Card</span>
          </button>

          {/* PayPal Button */}
          <button
            onClick={() => alert("PayPal payment selected")}
            className="flex items-center justify-start px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <FaPaypal className="mr-3 text-xl" />
            <span className="text-lg font-medium">PayPal</span>
          </button>

          {/* Cash on Delivery Button */}
          <button
            className="flex items-center justify-start px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
             onClick={() => handlePayment("Processing")}
          >
            <FaMoneyBillWave className="mr-3 text-xl" />
            <span className="text-lg font-medium">Cash on Delivery</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 w-full px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
           >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
