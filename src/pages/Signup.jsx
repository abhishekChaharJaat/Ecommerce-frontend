import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Modal from "../component/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenSigninPopup,
  setOpenLoginPopup,
  signupUser,
} from "../store/userSlice";
import Input from "../component/Input";
import Button from "../component/Button";

const Signup = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isOpenSigninPopup = useSelector(
    (state) => state.userSlice.isOpenSigninPopup
  );
  const loading = useSelector((state) => state.userSlice.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };

  return (
    <Modal
      isOpen={isOpenSigninPopup}
      onClose={() => dispatch(setOpenSigninPopup(false))}
      title="Product Details"
      isHeader={false}
    >
      <div className="h-full w-full md:w-[500px] bg-gray-100 flex items-center justify-center">
        <div className="w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join ShopSphere today</p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <Input
              icon={<FaUser />}
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Email Field */}
            <Input
              icon={<FaEnvelope />}
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Field */}
            <Input
              icon={<FaLock />}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a href="/" className="text-blue-600 hover:text-blue-500">
                  Terms & Conditions
                </a>
              </label>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className=""
              title="Sign Up"
              onClick={handleSubmit}
              loading={loading}
            />

            {/* Login Link */}
            <div className="text-center text-sm">
              <p>
                Already have an account?{" "}
                <span
                  className="font-normal cursor-pointer underline text-blue-600 hover:text-blue-500"
                  onClick={() => {
                    dispatch(setOpenLoginPopup(true));
                    dispatch(setOpenSigninPopup(false));
                  }}
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Signup;
