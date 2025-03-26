// UserInfoDrawer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaVenus,
} from "react-icons/fa";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  logout,
  setOpenEditProfilePopup,
  setOpenUserInfoDrawer,
  setOpenSigninPopup,
  setOpenLoginPopup,
} from "../store/userSlice";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";

const UserInfoDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);
  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);

  //   const user = {
  //     name: "Abhishek Chahar",
  //     email: "abhishekchahar200@gmail.com",
  //     profileImage: Me,
  //     phone: "+1 234 567 8900",
  //     address: "123 Main St, City",
  //     orderCount: 5,
  //   };

  const handleLogout = () => {
    dispatch(logout());
    if (!localStorage.getItem("token")) {
      toast.success("Logout");
    }
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Overlay - Only shown when drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[1000]"
          onClick={onClose}
        />
      )}

      {/* Drawer - Completely hidden when not open */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[1001] ${
          isOpen ? "translate-x-0" : "translate-x-full hidden bg-red-300"
        }`}
      >
        <div className="flex justify-between items-center p-3 bg-white border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex gap-[12px]">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt="Profile"
                className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-indigo-100 shadow-md"
              />
            ) : (
              <FaUserCircle className="w-12 h-12" />
            )}

            <div>
              <h3 className="text-[18px] font-bold text-gray-900 ">
                {user?.name || "Guest User"}
              </h3>
              <p className="text-[12px] text-gray-600 italic">
                {user?.email || "Not logged in"}
              </p>
            </div>
          </div>
          <button
            className="text-[16px] flex justify-center items-center hover:bg-indigo-100 text-indigo-600 rounded-full hover:border-2 w-8 h-8 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable content container */}

        <div className="p-5 h-[calc(100%-64px)] overflow-y-auto scrollbar-hide flex flex-col gap-y-6">
          <div className="md:hidden flex flex-col space-y-4  bg-gray-50 p-4 rounded-lg">
            <Link
              to="/"
              className="text-[#18475A] font-[700] hover:text-blue-600 transition-colors"
              onClick={() => {
                dispatch(setOpenUserInfoDrawer(false));
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-[#18475A] font-[700] hover:text-blue-600 transition-colors"
              onClick={() => {
                dispatch(setOpenUserInfoDrawer(false));
              }}
            >
              About
            </Link>
            <Link
              to="/categories"
              className="text-[#18475A] font-[700] hover:text-blue-600 transition-colors"
              onClick={() => {
                dispatch(setOpenUserInfoDrawer(false));
              }}
            >
              Categories
            </Link>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-[18px] md:text-[20px] font-[600] italic">
              Personal Info
            </p>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <FaUser className="text-indigo-500" /> Name
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {" "}
                {/* Adjusted text size for mobile vs desktop */}
                {user?.name || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-indigo-500" /> Email
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {user?.email || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <FaPhone className="text-indigo-500" /> Phone
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                +91 {user?.phone || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 gap-6">
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-500" /> Address
              </span>
              <span className="text-end text-gray-600 text-sm md:text-base">
                {user?.address || "Not provided"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <PiMapPinSimpleAreaBold className="text-indigo-500" /> Pin code{" "}
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {user?.pincode || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700 flex items-center gap-2">
                <FaVenus className="text-indigo-500" /> Gender{" "}
              </span>
              <span className="text-gray-600 text-sm md:text-base">
                {user?.gender || 0}
              </span>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="space-y-3 pb-5">
              <button
                onClick={() => {
                  dispatch(setOpenUserInfoDrawer(false));
                  dispatch(setOpenEditProfilePopup(true));
                }}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <FaEdit /> Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md cursor-poi"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="py-4 flex flex-col gap-[16px] ">
              <Button
                type=""
                className="!bg-transparent !text-black md:hidden !ring-2 ring-offset-1 ring-slat-400"
                title="Log In"
                onClick={() => {
                  dispatch(setOpenUserInfoDrawer(false));
                  dispatch(setOpenLoginPopup(true));
                }}
              />
              <Button
                type=""
                className="md:hidden"
                title="Sign Up"
                onClick={() => {
                  dispatch(setOpenUserInfoDrawer(false));
                  dispatch(setOpenSigninPopup(true));
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfoDrawer;
