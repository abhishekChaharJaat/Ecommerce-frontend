import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { changeCartItemStatus } from "../store/productSlice";

const AllReceivedOrders = () => {
  const dispatch = useDispatch();

  const orderedItemsForAdmin = useSelector(
    (state) => state.productSlice.orderedItemsForAdmin
  );
  const loading = useSelector((state) => state.productSlice.loading);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Store the latest status for each order
  const [statusMap, setStatusMap] = useState(
    orderedItemsForAdmin.reduce((acc, order) => {
      acc[order._id] = order.status;
      return acc;
    }, {})
  );

  // Handle status change and update local state
  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: newStatus, // Update only the changed order's status
    }));
  };

  // Handle update button click
  const handleUpdateClick = (id) => {
    const status = statusMap[id]; // Use the latest status
    const cartItemIds = [id]; // Assuming you want to update only one order at a time
    console.log(cartItemIds, status);
    dispatch(changeCartItemStatus({ cartItemIds, status }));
  };

  return (
    <div className="max-w-[1000px] mx-auto p">
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold flex justify-between items-center rounded-lg shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
      >
        <span>{isFormOpen ? "Hide Orders" : "Show All Received Orders"}</span>
        {isFormOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}

      {/* Orders List */}
      <div
        className={`transition-all duration-500 ${
          isFormOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          {orderedItemsForAdmin.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
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
                      </td>

                      {/* Update Button */}
                      <td className="p-3">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md text-sm transition-all flex items-center gap-1 cursor-pointer"
                          onClick={() => handleUpdateClick(order._id)} // Corrected click handler
                        >
                          <FaEdit />
                          Update
                        </button>
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
