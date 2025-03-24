import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Modal from "../component/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenLoginPopup,
  setOpenSigninPopup,
  loginUser,
} from "../store/userSlice";
import Input from "../component/Input";
import Button from "../component/Button";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isOpenLoginPopup = useSelector(
    (state) => state.userSlice.isOpenLoginPopup
  );

  const loading = useSelector((state) => state.userSlice.loading);

  const handleSubmit = (e) => {
    const data = { email, password };
    e.preventDefault();
    setEmail("");
    setPassword("");
    dispatch(loginUser(data));
  };

  return (
    <Modal
      isOpen={isOpenLoginPopup}
      onClose={() => dispatch(setOpenLoginPopup(false))}
      title="Product Details"
      isHeader={false}
    >
      <div className="w-full md:w-[500px] bg-gray-100 flex items-center justify-center">
        <div className="w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your ShopSphere account
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Input
              icon={<FaEnvelope />}
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              loading={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Field */}
            <Input
              icon={<FaLock />}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              loading={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className=""
              title="Log In"
              loading={loading}
              onClick={handleSubmit}
            />
            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <p>
                Don't have an account?{" "}
                <span
                  className="font-normal cursor-pointer underline text-blue-600 hover:text-blue-500"
                  onClick={() => {
                    dispatch(setOpenLoginPopup(false));
                    dispatch(setOpenSigninPopup(true));
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
