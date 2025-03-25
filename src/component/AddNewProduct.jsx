import React, { useState } from "react";
import { addNewProduct } from "../store/productSlice";
import { useDispatch } from "react-redux";
import {
  FaIdBadge,
  FaTag,
  FaAlignLeft,
  FaLayerGroup,
  FaShapes,
  FaRuler,
  FaDollarSign,
  FaPercentage,
  FaImage,
  FaStar,
  FaUsers,
  FaStore,
  FaUndo,
  FaShieldAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";

const AddNewProduct = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    originalPrice: "",
    discount: "",
    currency: "Rs.",
    stock: "",
    isInStock: false,
    brand: "",
    images: "",
    thumbnail: "",
    ratings: "",
    reviewsCount: "",
    isFeatured: false,
    seller: "",
    returnPolicy: "",
    warranty: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle form visibility

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      // Check file size or any other validation you need
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store the base64 string in formData.profilePicture
        setProduct({
          ...product,
          thumbnail: reader.result, // This should be the base64 string (image)
        });
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProduct(product));
    setProduct({
      id: "",
      name: "",
      description: "",
      category: "",
      subCategory: "",
      size: "",
      price: "",
      originalPrice: "",
      discount: "",
      currency: "USD",
      stock: "",
      isInStock: true,
      brand: "",
      images: "",
      thumbnail: "",
      ratings: "0",
      reviewsCount: "0",
      isFeatured: false,
      seller: "",
      returnPolicy: "",
      warranty: "",
    });
    setIsFormOpen(false); // Close form after submission
  };

  return (
    <div
      className={`${
        isFormOpen ? "ring-1" : ""
      } max-w-[1000px] md:mx-auto md:rounded-[8px] bg-white`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className={`w-full py-4 px-6 font-medium bg-slate-600 hover:bg-slate-700 text-white md:rounded-t-[4px] transition-colors duration-200 flex items-center justify-between gap-2 cursor-pointer ${
          isFormOpen ? "" : "md:rounded-b-[4px]"
        }`}
      >
        {isFormOpen ? "Close Form" : "Add New Product"}
        {isFormOpen ? <FaTimes /> : <FaPlus />}
      </button>
      {/* Form with Slide Animation */}
      <div
        className={`overflow-hidden box-border transition-all duration-500 ease-in-out bg-white border shadow-md px-6 md:px-20 rounded-b-[8px] ${
          isFormOpen ? "max-h-[2000px] opacity-100 py-6" : "max-h-0 opacity-0 "
        }`}
      >
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Basic Info */}
          <div className="relative">
            <Input
              label="Product ID"
              icon={<FaIdBadge className="!text-gray-500" />}
              type="text"
              name="id"
              placeholder="prod_12345"
              value={product.id}
              onChange={handleChange}
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            /> 
          </div>

          <div className="relative">
          <Input
              label="Name"
              icon={<FaTag className="!text-gray-500" />}
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Description (Single Row) */}
          <div className="sm:col-span-2 relative">
          <label className="flex text-gray-700 font-semibold mb-2">
            Description
          </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="rounded-md relative block w-full p-2  border border-gray-300 placeholder-gray-500 text-gray-900  focus:border-blue-500 sm:text-sm shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Brand and Category */}
          <div className="relative">
              <Input
              label="Brand"
              icon={<FaStore className="!text-gray-500" />}
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="e.g. Sony.."
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          <div className="relative">
             <Input
              label="Category"
              icon={<FaLayerGroup className="!text-gray-500" />}
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Subcategory and Size */}
          <div className="relative">
            <Input
              label="Subcategory"
              icon={<FaShapes className="!text-gray-500" />}
              type="text"
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              placeholder="e.g. Audio Accessories"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Pricing */}
          <div className="relative">
            <Input
              label="Price"
              icon={<FaDollarSign className="!text-gray-500" />}
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="e.g. 299.99"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            /> 
          </div>

          <div className="relative">
            <Input
              label="Original Price"
              icon={<FaDollarSign className="!text-gray-500" />}
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
              placeholder="e.g. 349.99"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Discount and Currency */}
          <div className="relative">
             <Input
              label="Discount"
              icon={<FaPercentage className="!text-gray-500" />}
              type="text"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="e.g. 15%"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          <div className="relative">
             <Input
              label="Currency"
              icon={<FaDollarSign className="!text-gray-500" />}
              type="text"
              name="currency"
              value={product.currency}
              onChange={handleChange}
              placeholder="e.g. Rs"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Stock */}
          <div className="relative">
             <Input
              label="Stock"
              icon={<FaRuler className="!text-gray-500" />}
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Images */}
          <div className="relative">
               <Input
              label="Images"
              icon={<FaImage className="!text-gray-500" />}
              type="text"
              name="images"
              value={product.images}
              onChange={handleChange}
              placeholder="e.g. url1, url2"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />

          </div>
          <div className="relative">
              <Input
              label="Thumbnail"
              icon={<FaImage className="!text-gray-500" />}
              type="file"
              name="thumbnail"
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Ratings and Reviews */}
          <div className="relative">
              <Input
              label="Ratings"
              icon={<FaStar className="!text-gray-500" />}
              type="number"
              name="ratings"
              value={product.ratings}
              onChange={handleChange}
              placeholder="0-5"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          <div className="relative">
               <Input
              label="Reviews Count"
              icon={<FaUsers className="!text-gray-500" />}
              type="number"
              name="reviewsCount"
              value={product.reviewsCount}
              onChange={handleChange}
              placeholder="e.g. 0"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Seller and Featured */}
          <div className="relative">
               <Input
              label="Seller"
              icon={<FaStore className="!text-gray-500" />}
              type="text"
              name="seller"
              value={product.seller}
              onChange={handleChange}
              placeholder="e.g. TechTrendz"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>

          {/* Policies */}
          <div className="relative">
               <Input
              label="Return Policy"
              icon={<FaUndo className="!text-gray-500" />}
              type="text"
              name="returnPolicy"
              value={product.returnPolicy}
              onChange={handleChange}
              placeholder="e.g., 30-day return"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2 relative">
               <Input
              label="Warranty"
              icon={<FaShieldAlt className="!text-gray-500" />}
             type="text"
              name="warranty"
              value={product.warranty}
              onChange={handleChange}
              placeholder="e.g., 1-year limited"
              className="!rounded-lg !py-3 shadow-sm focus:outline-none focus:ring-[1px] focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isInStock"
              checked={product.isInStock}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              In Stock
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Featured Product
            </label>
          </div>

          {/* Submit Button (Single Row) */}
          <div className="flex gap-[12px] py-2 sm:col-span-2 justify-end">
          <Button
                type="button"
                className="!bg-transparent !text-black hover:!ring-2 ring-offset-1 ring-slat-400"
                title="Cancle"
                onClick={() => setIsFormOpen(!isFormOpen)}
              />
            <Button
                type="submit"
                title="Upload Product"
                onClick={handleSubmit}
              />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
