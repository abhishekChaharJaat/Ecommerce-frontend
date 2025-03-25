import React, { useState } from "react";
import { FaShoppingCart, FaTimes, FaBars, FaUserShield, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import profile from '../Images/profile.webp'
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenLoginPopup,
  setOpenSigninPopup,
  setOpenUserInfoDrawer,
} from "../store/userSlice";
import Button from "../component/Button";
import SearchBar from "../component/SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
  const user = useSelector((state) => state.userSlice.user);
  const loading = useSelector((state) => state.userSlice.loading);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/*Main Navbar*/}
      <nav className="w-full h-[80px] bg-slate-100 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl mx-2 font-bold text-gray-800">
            <Link to="/">ShopSphere</Link>
          </div>

          {/*Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/categories"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Categories
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Cart and User Actions */}
          <div className="flex items-center gap-x-6">
            {isLoggedIn || loading ? (
              <>
                {user?.role === 1  && (
                  <Link
                    to="/admin"
                    className="relative hover:text-blue-600 mr-2"
                  >
                    <FaUserShield size={20} />
                    <span className="absolute -top-1 left-2  text-green-700 text-[8px] font-[500] flex items-center justify-center">
                      Admin
                    </span>
                  </Link>
                )}

                <Link to='/cart' className="relative text-gray-600 hover:text-blue-600 mr-2 cursor-pointer">
                  <FaShoppingCart className="text-xl" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Link>
                <div className="hidden md:flex gap-[8px] justify-center items-center">
                  <img
                    src={user?.profilePicture ? user?.profilePicture : profile }
                    alt="User profile"
                    className="ml-6 w-12 h-12 border rounded-full object-cover ring-2 ring-indigo-400 hover:ring-offset-1 hover:ring-slat-400 cursor-pointer"
                    onClick={() => dispatch(setOpenUserInfoDrawer(true))}
                  /> 
                </div>
              </>
            ) : (
              <div className="flex gap-[8px]">
                <Button
                  type=""
                  className="!bg-transparent !text-black hidden md:flex"
                  title="Log In"
                  onClick={() => dispatch(setOpenLoginPopup(true))}
                />
                <Button
                  type=""
                  className="hidden md:flex"
                  title="Sign Up"
                  onClick={() => dispatch(setOpenSigninPopup(true))}
                />
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              type=""
              className="md:hidden flex !bg-transparent !text-black !text-[24px]"
              title=""
              onClick={() => dispatch(setOpenUserInfoDrawer(true))}
              icon={<FaBars />}
            />
          </div>
        </div>
      </nav>

      {/* ===================================== Mobile Drawer ============================*/}
      <div
        className={`fixed flex flex-col justify-between inset-y-0 left-0 w-64 bg-slate-100 shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden px-4 py-2`}
      >
        <div className="">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <Button
              type=""
              className="md:hidden flex !bg-transparent !text-black !text-[22px]"
              title=""
              onClick={toggleDrawer}
              icon={<FaTimes />}
            />
          </div>

          {/* Drawer Navigation */}
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleDrawer}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleDrawer}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleDrawer}
            >
              About
            </Link>
          </div>
        </div>
        <div className="py-8 flex flex-col gap-[16px]">
          <Button
            type=""
            className="!bg-transparent !text-black md:hidden !ring-2 ring-offset-1 ring-slat-400"
            title="Log In"
            onClick={() => {
              toggleDrawer();
              dispatch(setOpenLoginPopup(true));
            }}
          />
          <Button
            type=""
            className="md:hidden"
            title="Sign Up"
            onClick={() => {
              toggleDrawer();
              dispatch(setOpenSigninPopup(true));
            }}
          />
        </div>
      </div>

      {/* Overlay for when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Header;
