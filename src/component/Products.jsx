import React from "react";
import Button from "./Button";
import { FaStar, FaCheckCircle, FaShoppingCart, FaTag } from "react-icons/fa";
import { setOpenLoginPopup,setOpenSigninPopup } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSelectProduct,
  setSelectedProduct,
  addToCart,
} from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
  const featuredProducts = useSelector((state) => state.productSlice.products);

  // const products = [
  //   {
  //     id: 3,
  //     name: "Wireless Bluetooth Headphones",
  //     brand: "Sony",
  //     currency: "Rs",
  //     discount: "15%",
  //     thumbnail: "https://example.com/thumb.jpg",
  //     isInStock: true,
  //     price: 299,
  //     originalPrice: 499,
  //     ratings: 4.2,
  //   },
  // ];

  const handleProductClicked = (data) => {
    dispatch(setSelectedProduct(data));
    dispatch(setShowSelectProduct(true));
  };

  const handleAddToCart = (productId, color, qty, size) => {
    const data = { productId, color, qty, size };
    if (isLoggedIn) {
      dispatch(addToCart(data));
      console.log(data);
    } else {
      dispatch(setOpenSigninPopup(true));
    }
  };

  return (
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredProducts?.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform  hover:shadow-2xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative">
                <div className="p-2">
                <img
                  onClick={() => handleProductClicked(product)}
                  src={product?.thumbnail}
                  alt="svb"
                  className="w-full shadow-sm rounded-[8px] h-28 sm:h-72 object-cover cursor-pointer"
                />
                </div>
                {product?.discount && (
                  <span
                    className={`${
                      product?.discount < 1 ? "hidden" : ""
                    } absolute top-1 left-1 md:top-3 md:left-3 bg-red-500 text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1`}
                  >
                    {product?.discount} OFF
                  </span>
                )}
                <span className="absolute top-1 right-1 md:top-3 md:right-3 text-white">
                  {product?.isInStock ? (
                    <FaCheckCircle className="text-green-500 text-lg" />
                  ) : (
                    // <FaTimesCircle className="text-red-500 text-lg" />
                    <p className="text-red-500 text-xs font-medium">
                      Out of stock
                    </p>
                  )}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-2 sm:p-5 flex flex-col gap-1 md:gap-2">
                <h3 className="text-[12px] sm:text-xl font-[600] text-gray-900 truncate">
                  {product?.name}
                </h3>
                <p className="text-xs sm:text-sm italic text-gray-500">
                  {product?.brand}
                </p>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1 text-sm sm:text-base" />
                  <span className="text-gray-700 text-xs sm:text-sm font-medium">
                    {product?.ratings} / 5
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <FaTag className="text-indigo-600 text-[10px] md:text-sm" />
                  <p className="text-[14px] sm:text-xl font-bold text-gray-900">
                    {product?.currency} {product?.price}
                  </p>
                  {product?.originalPrice > product?.price && (
                    <p className="text-[11px] sm:text-sm text-red-500 line-through">
                      {product?.currency} {product?.originalPrice}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  title={
                    <span className="flex items-center justify-center gap-2">
                      <FaShoppingCart /> Add to Cart
                    </span>
                  }
                  onClick={() => {
                    handleAddToCart(product._id, "black", 1, "M");
                  }}
                  className="w-full py-[6px] md:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-[12px] sm:text-base"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
