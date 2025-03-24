import React from "react";
// import { useDispatch } from "react-redux";
import AddNewProduct from "../component/AddNewProduct";

const AdminPage = () => {
  //   const dispatch = useDispatch();

  return (
    <div className="w-full bg-gray-100 py-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Panel - Add Product
      </h1>
      <AddNewProduct />
      <div className="w-full md:h-96 border mx-auto my-10">
        <p className="text-[20px] font-bold text-center text-red-900">
          {" "}
          All Orders
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
