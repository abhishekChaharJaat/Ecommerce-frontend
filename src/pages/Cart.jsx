import React, { useState, useEffect } from "react";
import { FaTrash, FaRegCreditCard, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteCartItem, getCartItems } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "../component/PaymentModal";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 
  const [cartItemIds, setCartItemIds] = useState([]); 
  const cartItems = useSelector((state) => state.productSlice.cartItems);
  const loading = useSelector((state) => state.productSlice.loading);

  // ✅ Filter only cart items for total price calculation
  const cartOnlyItems = cartItems.filter((item) => item.status === "cart");

  // Calculate total price only for cart items
  const totalPrice = cartOnlyItems.reduce(
    (acc, item) => acc + (item?.productInfo?.price || 0) * item.qty,
    0
  );

  // Format the price with commas
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  // Open Payment Modal
  const handlePlaceOrder = () => {
    setIsPaymentModalOpen(true);
  };

  // Close Payment Modal
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  useEffect(() => {
    // Extract only cart item IDs
    const ids = cartOnlyItems.map((item) => item._id);  
    setCartItemIds(ids);
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Cart Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          className="p-2 text-xl text-gray-700 hover:text-gray-900"
          onClick={() => navigate("/")}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">Shopping Cart</h1>
      </div>

      {/* Cart Items */}
      {loading ? (
        <div className="w-full h-[200px] bg-gray-50 flex justify-center items-center flex-col gap-[8px]">
          <div className="w-8 h-8 border border-t-[2px] border-gray-800 border-solid rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading Products....</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartOnlyItems.length > 0 ? (
            cartOnlyItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={item?.productInfo?.thumbnail}
                  alt={item?.productInfo?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item?.productInfo?.name}
                  </h3>
                  <p className="text-green-800 text-xs md:text-sm">
                    {item?.productInfo?.description}
                  </p>
                  <p className="text-gray-700 font-medium text-sm">
                    Price: {formatPrice(item?.productInfo?.price || 0)}
                  </p>
                  <p className="text-gray-700 text-xs">Quantity: {item.qty}</p>
                </div>
                <button
                  onClick={() => dispatch(deleteCartItem(item.productInfo._id))}
                  className="text-red-600 hover:text-red-800 text-xl cursor-pointer transition-colors duration-300 ease-in-out"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items in the cart</p>
          )}
        </div>
      )}

      {/* Cart Summary */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <span className="text-xl font-medium text-gray-900">Total:</span>
          <span className="text-xl font-semibold text-gray-900">
            {formatPrice(totalPrice || 0)}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePlaceOrder}
            disabled={cartOnlyItems.length === 0} 
            className={`px-6 py-3 ${
              cartOnlyItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-600 hover:bg-slate-700"
            } text-white font-medium text-lg rounded-lg flex items-center space-x-2 transition-all duration-300 ease-in-out`}
          >
            <FaRegCreditCard />
            <span>Place Order</span>
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        cartItemIds={cartItemIds}
      />
    </div>
  );
};

export default Cart;
