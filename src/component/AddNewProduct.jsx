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
        className={`w-full py-4 px-6 font-medium bg-slate-700 text-white md:rounded-t-[8px] transition-colors duration-200 flex items-center justify-between gap-2 cursor-pointer ${
          isFormOpen ? "" : "md:rounded-b-[8px]"
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
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Basic Info */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaIdBadge className="text-blue-500" /> Product ID
            </label>
            <input
              type="text"
              name="id"
              value={product.id}
              onChange={handleChange}
              placeholder="e.g., prod_12345"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaTag className="text-blue-500" /> Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description (Single Row) */}
          <div className="sm:col-span-2 relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaAlignLeft className="text-blue-500" /> Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          {/* Brand and Category */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaStore className="text-blue-500" /> Brand
            </label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="e.g., Sony"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaLayerGroup className="text-blue-500" /> Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="e.g., Electronics"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subcategory and Size */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaShapes className="text-blue-500" /> Subcategory
            </label>
            <input
              type="text"
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              placeholder="e.g., Audio Accessories"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pricing */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaDollarSign className="text-blue-500" /> Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="e.g., 299.99"
              min="0"
              step="0.01"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaDollarSign className="text-blue-500" /> Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
              placeholder="e.g., 349.99"
              min="0"
              step="0.01"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Discount and Currency */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaPercentage className="text-blue-500" /> Discount
            </label>
            <input
              type="text"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="e.g., 15%"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaDollarSign className="text-blue-500" /> Currency
            </label>
            <input
              type="text"
              name="currency"
              value={product.currency}
              onChange={handleChange}
              placeholder="e.g., USD"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaRuler className="text-blue-500" /> Stock
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="e.g., 25"
              min="0"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Images */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaImage className="text-blue-500" /> Images
            </label>
            <input
              type="text"
              name="images"
              value={product.images}
              onChange={handleChange}
              placeholder="e.g., url1, url2"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaImage className="text-blue-500" /> Thumbnail
            </label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              placeholder="Thumbnail URL"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ratings and Reviews */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaStar className="text-blue-500" /> Ratings
            </label>
            <input
              type="number"
              name="ratings"
              value={product.ratings}
              onChange={handleChange}
              placeholder="0-5"
              min="0"
              max="5"
              step="0.1"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUsers className="text-blue-500" /> Reviews Count
            </label>
            <input
              type="number"
              name="reviewsCount"
              value={product.reviewsCount}
              onChange={handleChange}
              placeholder="e.g., 0"
              min="0"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Seller and Featured */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaStore className="text-blue-500" /> Seller
            </label>
            <input
              type="text"
              name="seller"
              value={product.seller}
              onChange={handleChange}
              placeholder="e.g., TechTrendz"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Policies */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUndo className="text-blue-500" /> Return Policy
            </label>
            <input
              type="text"
              name="returnPolicy"
              value={product.returnPolicy}
              onChange={handleChange}
              placeholder="e.g., 30-day return"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2 relative">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaShieldAlt className="text-blue-500" /> Warranty
            </label>
            <input
              type="text"
              name="warranty"
              value={product.warranty}
              onChange={handleChange}
              placeholder="e.g., 1-year limited"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md ring-1 transition-colors font-medium duration-200 flex items-center justify-center gap-2"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              Cancle
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
