import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { changeCartItemStatus, deleteCartItem } from "../store/productSlice";
import OrderSkeleton from "./OrderSkeleton";

const AllReceivedOrders = () => {
  const dispatch = useDispatch();
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const orderedItemsForAdmin = useSelector(
    (state) => state.productSlice.orderedItemsForAdmin
  );
  const loading = useSelector((state) => state.productSlice.loading);
  const [isFormOpen, setIsFormOpen] = useState(true);

  // Store the latest status for each order
  const [statusMap, setStatusMap] = useState(
    orderedItemsForAdmin.reduce((acc, order) => {
      acc[order._id] = order.status;
      return acc;
    }, {})
  );
  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: newStatus,
    }));

    setUpdatingOrderId(id); // Mark this order as updating

    const cartItemIds = [id];
    dispatch(changeCartItemStatus({ cartItemIds, status: newStatus })).finally(
      () => {
        setUpdatingOrderId(null); // Clear the updating state once done
      }
    );
  };

  // Handle update button click
  const handleUpdateClick = (id) => {
    const status = statusMap[id]; // Use the latest status
    const cartItemIds = [id]; // Assuming you want to update only one order at a time
    console.log(cartItemIds, status);
    dispatch(changeCartItemStatus({ cartItemIds, status }));
  };

  return (
    <div className="max-w-[1000px] mx-auto ">
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className={`w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold flex justify-between items-center  shadow-lg ${
          isFormOpen ? "rounded-t-lg" : "rounded-lg"
        } transition-all duration-300 hover:from-blue-600 hover:to-indigo-700`}
      >
        <span>{isFormOpen ? "Hide Orders" : "Show All Received Orders"}</span>
        {isFormOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Orders List */}
      <div
        className={`transition-all duration-500 ${
          isFormOpen ? "max-h-[2000px] opacity-100 " : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="bg-white shadow-lg rounded-b-lg p-4 md:p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, idx) => (
                <OrderSkeleton key={idx} />
              ))}
            </div>
          ) : orderedItemsForAdmin.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedItemsForAdmin.map((order, idx) => (
                    <tr
                      key={order._id}
                      className="border-b transition-colors hover:bg-gray-100"
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3">{order._id}</td>
                      <td className="p-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">{order.productInfo?.name}</td>

                      {/* Status Dropdown */}
                      <td className="p-3">
                        {updatingOrderId === order._id ? (
                          <p className="text-sm text-gray-500 italic">
                            Updating...
                          </p>
                        ) : (
                          <select
                            value={statusMap[order._id] || order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="border p-2 rounded-md text-sm focus:outline-none bg-gray-50 hover:bg-gray-100 transition-all"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        )}
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center">
                          <button
                            onClick={() =>
                              dispatch(deleteCartItem(order.productInfo._id))
                            }
                            className="text-red-600 hover:text-red-800 text-xl cursor-pointer transition-colors duration-300 ease-in-out"
                          >
                            <FaTrash />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReceivedOrders;
