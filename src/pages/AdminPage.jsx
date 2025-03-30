import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddNewProduct from "../component/AddNewProduct";
import AllReceivedOrders from "../component/AllReceivedOrders";
import { adminGetAllOrders } from "../store/productSlice";


const AdminPage = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetAllOrders());
  }, []);
  return (
    <div className="w-full bg-gray-100 py-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Panel
      </h1>
      <div className="space-y-2">
      <AddNewProduct />
      <AllReceivedOrders/>
      <div className="h-[200px]"></div>
      </div>
    </div>
  );
};

export default AdminPage;
