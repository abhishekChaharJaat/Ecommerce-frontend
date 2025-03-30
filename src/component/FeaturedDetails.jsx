import React, { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { setShowSelectProduct, addToCart } from "../store/productSlice";
import { setOpenLoginPopup } from "../store/userSlice";
import Carousel from "./Carousel";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const isShowSelectedProduct = useSelector(
    (state) => state.productSlice.isShowSelectedProduct
  );
  const product = useSelector((state) => state.productSlice.selectedProduct);
  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);

  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);   // Quantity selector
  const [color, setColor] = useState(1);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (productId, color, qty, size) => {
    const data = { productId, color, qty, size };
    if (isLoggedIn) {
      dispatch(addToCart(data));
    } else {
      dispatch(setOpenLoginPopup(true));
    }
  };

  // Function to render the size selection
  const renderSizeSelection = () => {
    if (product.category === "Clothing" || product.category === "Footwear") {
      const sizes =
        product.category === "Clothing"
          ? ["S", "M", "L", "XL", "XXL"]
          : ["6", "7", "8", "9", "10", "11"]; 

      return (
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
            Select Size:
          </label>
          <div className="flex gap-3 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border cursor-pointer text-[10px] rounded-md text-gray-700 font-medium ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return null; 
  };

  return (
    <Modal
      isOpen={isShowSelectedProduct}
      onClose={() => dispatch(setShowSelectProduct(false))}
      isHeader={true}
      title="Product Details"
    >
      <div className="container mx-auto p-4 md:w-[1000px]">
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Carousel images={product.images} />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 text-[14px] mb-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex">{renderStars(product.ratings)}</div>
              <span className="ml-2 text-gray-500">
                ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-semibold text-green-600">
                {product.currency} {product.price}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {product.currency} {product.originalPrice}
              </span>
              <span className="text-sm text-red-500 font-medium">
                {product.discount} OFF
              </span>
            </div>

            {/* Stock */}
            <p className="text-gray-700 mb-2">
              {product.isInStock ? (
                <span className="text-green-500">
                  In Stock ({product.stock} left)
                </span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>

            {/* Brand and Seller */}
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Sold by:</span> {product.seller}
            </p>

            {/* Policies */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <FaTruck className="text-gray-600" />
                <span className="text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-gray-600" />
                <span className="text-gray-700">{product.returnPolicy}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  Warranty: {product.warranty}
                </span>
              </div>
            </div>

            {/* Size Selection */}
            {renderSizeSelection()}

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Quantity:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-2 border rounded-md">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                handleAddToCart(product._id, color, qty, selectedSize);
                dispatch(setShowSelectProduct(false));
              }}
              className="flex items-center gap-2 bg-slate-600 text-white py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails;
