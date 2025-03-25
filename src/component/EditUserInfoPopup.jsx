import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserCircle,
  FaStar,
} from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { setOpenEditProfilePopup, updateUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";

const EditUserInfoPopup = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userSlice);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
    pincode: "",
    role: null,
    gender: "",
  });

  const isOpenEditProfilePopup = useSelector(
    (state) => state.userSlice.isOpenEditProfilePopup
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      // Check file size or any other validation you need
      const reader = new FileReader();

      reader.onloadend = () => {
        // Store the base64 string in formData.profilePicture
        setFormData({
          ...formData,
          profilePicture: reader.result, // This should be the base64 string (image)
        });
      };

      reader.readAsDataURL(file); // Convert image to base64 string
    } else {
      // Handle regular inputs (text, etc.)
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      profilePicture: user?.profilePicture,
      role: user?.role,
      pincode: user?.pincode,
      gender: user?.gender,
    });
  }, [user]);

  return (
    <Modal
      isOpen={isOpenEditProfilePopup}
      onClose={() => {
        dispatch(setOpenEditProfilePopup(false));
      }}
      isHeader={true}
      title="Edit Your Profile"
    >
      <div className="w-full h-auto md:h-[450px] sm:w-[700px] mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-scroll scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center overflow-hidden ring-2">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full" />
                )}
              </div>
              <div className="absolute bottom-0 right-0">
                <input
                  type="file"
                  id="profile-picture-input"
                  className="absolute bottom-0 right-0  w-8 h-8 rounded-full z-[1] opacity-0"
                  onChange={handleChange}
                />
                <AiFillCamera
                  size={32}
                  className="absolute bottom-0 right-0 text-white bg-blue-500 p-2 rounded-full"
                />
              </div>
            </div>
          </div>
          {/* Name */}
          <div className="space-y-1">
            <Input
              label="Name"
              icon={<FaUserAlt className="!text-gray-500" />}
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          {/* Email */}
          <div className="space-y-1">
            <Input
              label="Email"
              icon={<FaEnvelope className="!text-gray-500" />}
              type="text"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          {/* Phone */}
          <div className="space-y-1">
            <Input
              label="Phone No."
              icon={<FaPhoneAlt className="!text-gray-500" />}
              type="text"
              name="phone"
              placeholder="Your Phone no."
              value={formData.phone}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          {/* Address */}
          <div className="space-y-1">
            <Input
              label="Address"
              icon={<FaMapMarkerAlt className="!text-gray-500" />}
              type="text"
              name="address"
              placeholder="Your Full Address"
              value={formData.address}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          {/* Gender */}
          <div className="space-y-1">
            <label className="text-gray-700 font-semibold" htmlFor="gender">
              Gender
            </label>
            <div className="flex items-center space-x-3">
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {/* Pincode */}
          <div className="space-y-1">
            <Input
              label="Pincode"
              icon={<PiMapPinSimpleAreaBold className="!text-gray-500" />}
              type="text"
              name="pincode"
              placeholder="Your Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          {/* Role */}
          <div className="space-y-1">
            <Input
              label={`${
                formData?.role === 0
                  ? "Admin banne k lie security code dale"
                  : "Yor are now Admin"
              }`}
              icon={<FaStar className="!text-gray-500" />}
              type="number"
              name="role"
              placeholder="Admin banne k lie security code dale"
              value={formData?.role}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-[12px] justify-end">
            <Button
              type="cancle"
              title="Cancel"
              onClick={() => {
                dispatch(setOpenEditProfilePopup(false));
              }}
              className="!bg-transparent !text-black"
            />
            <Button type="submit" title="Save All Changes" loading={loading} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserInfoPopup;
