import React, { useEffect } from "react";
import { getCartItems } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.productSlice.cartItems);
  const loading = useSelector((state) => state.productSlice.loading);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <>
                 {order.status !== "cart" ? <div
                    key={order._id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300"
                  >
                    {/* Order Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Order ID:</p>
                        <p className="text-base font-medium">{order._id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date:</p>
                        <p className="text-base font-medium">
                          {new Date(order.updatedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
                      <img
                        src={order?.productInfo.thumbnail}
                        alt={order?.productInfo.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-lg font-medium">
                          {order?.productInfo.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {order?.productInfo.description}
                        </p>
                        <p className="text-gray-800 text-sm">
                          <span className="font-medium">Quantity:</span> {order.qty}
                        </p>

                        {/* Display Size */}
                        <p className="text-gray-800 text-sm">
                          <span className="font-medium">Size:</span>{" "}
                          {order?.size || "N/A"}
                        </p>

                        <p className="text-green-600 font-semibold">
                          ₹{order?.productInfo.price}
                        </p>
                      </div>
                    </div>

                    {/* Order Status */}
                    <div className="mt-4 flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Shipped"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {order.status}
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
                        View Details
                      </button>
                    </div>
                  </div>  : <p className="text-gray-500 text-center">No orders found.</p>}
                  </>
                ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
