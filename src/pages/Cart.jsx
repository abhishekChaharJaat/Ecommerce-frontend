import React from "react";
import { FaTrash, FaRegCreditCard, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Cart = () => {

    const navigate = useNavigate()
  // Dummy data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/100", // Placeholder image
      price: 25.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/100", // Placeholder image
      price: 15.49,
      quantity: 1,
    },
  ];

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
   
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Cart Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="p-2 text-xl text-gray-700 hover:text-gray-900" onClick={() => navigate("/")}>
          <FaChevronLeft />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="text-gray-700">Price: Rs. {item.price}</p>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
            </div>
            <button className="text-red-600 hover:text-red-800 text-xl">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <span className="text-lg font-medium text-gray-900">Total:</span>
          <span className="text-lg font-semibold text-gray-900">Rs. {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-slate-600 text-white font-medium text-lg rounded-lg hover:bg-slate-700 flex items-center space-x-2">
            <FaRegCreditCard />
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

