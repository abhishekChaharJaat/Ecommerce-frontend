import React from "react";
import Modal from "./Modal";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { setIsOrderPlaced } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const OrderPlacedPopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.productSlice.isOrderPlaced);

  const onclose = () => {
    dispatch(setIsOrderPlaced(false));
    window.location.reload();
  };
  return (
    <Modal isOpen={isOpen} onClose={onclose}>
      <div className="flex flex-col items-center justify-center p-6 md:p-8 lg:p-10 bg-white rounded-lg shadow-lg w-full md:w-[500px] transition-all duration-300">
        {/* Animation and Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="flex items-center justify-center mb-4"
        >
          <FaCheckCircle className="text-green-500 text-6xl md:text-7xl lg:text-8xl animate-pulse" />
        </motion.div>

        {/* Congratulation Message */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
        >
          🎉 Congratulations!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-center mt-2 text-[15px] md:text-[17px]"
        >
          Your order has been placed successfully.
        </motion.p>

        {/* Button to Close */}
        <motion.button
          onClick={onclose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-300"
        >
          Close
        </motion.button>
      </div>
    </Modal>
  );
};

export default OrderPlacedPopup;
