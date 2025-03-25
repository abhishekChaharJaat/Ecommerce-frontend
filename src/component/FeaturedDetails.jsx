import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaTruck, FaUndo } from 'react-icons/fa';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setShowSelectProduct } from '../store/productSlice';

const ProductDetails = () => {

    const dispatch = useDispatch()

    const isShowSelectedProduct = useSelector(state => state.productSlice.isShowSelectedProduct)
    const product = useSelector(state => state.productSlice.selectedProduct)
  // Product data from your JSON
//   const product = {
//     id: "prod_12345",
//     name: "Wireless Bluetooth Headphones",
//     description: "High-quality headphones with noise cancellation and 20-hour battery life.",
//     sku: "WH-1000XM4-BLK",
//     category: "Electronics",
//     subCategory: "Audio Accessories",
//     price: 299.99,
//     originalPrice: 349.99,
//     discount: "15%",
//     currency: "Rs.",
//     stock: 25,
//     isInStock: true,
//     brand: "Sony",
//     images: ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
//     thumbnail: "https://example.com/thumb.jpg",
//     ratings: 4.5,
//     reviewsCount: 120,
//     isFeatured: false,
//     seller: "TechTrendz",
//     returnPolicy: "30-day return policy",
//     warranty: "1-year limited warranty"
//   };

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

 
  return (
    <Modal
    isOpen={isShowSelectedProduct}
    onClose={() => dispatch(setShowSelectProduct(false))}
    isHeader={true}
    title="Product Details"
  >

    <div className="container mx-auto p-4 md:w-[1000px] ">
      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-auto  max-h-[395px] rounded-lg shadow-md mb-4 object-cover"
          />
          {/* <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} view ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md shadow-sm cursor-pointer hover:opacity-80"
              />
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-gray-600 text-[14px] mb-2">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">{renderStars(product.ratings)}</div>
            <span className="ml-2 text-gray-500">({product.reviewsCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-semibold text-green-600">
              {product.currency} {product.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              {product.currency} {product.originalPrice}
            </span>
            <span className="text-sm text-red-500 font-medium">{product.discount} OFF</span>
          </div>

          {/* Stock */}
          <p className="text-gray-700 mb-2">
            {product.isInStock ? (
              <span className="text-green-500">In Stock ({product.stock} left)</span>
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
              <span className="text-gray-700">Warrenty: {product.warranty}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button onClick={() => alert("Your item is added to cart")} className="flex items-center gap-2 bg-slate-600 text-white py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
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