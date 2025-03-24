import React, { useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { getAllProduct } from "../store/productSlice";
import shop from "../Images/shop.png";
import Products from "../component/Products";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../component/SearchBar";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.userSlice.isLoggedIn);
  return (
    <>
      <div className="bg-gray-100">
        {/* Hero Section */}
        <div className="md:hidden fixed bg-gray-100  w-full z-[1] flex justify-center items-center py-3">
          <SearchBar />
        </div>
        {!isLoggedIn && (
          <section className="relative bg-gradient-to-r from-slate-400 to-slate-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4  flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
                <img
                  src={shop}
                  alt="Hero Product"
                  className="w-[300px] h-[250px] md:w-[400px] md:h-[350px] rounded-lg  object-cover"
                />
              </div>
              <div className="text-center md:text-left md:mb-0 md:ml-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
                  Discover Amazing Deals at ShopSphere
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  Shop the latest trends in fashion, electronics, and more!
                </p>
                <button
                  onClick={() => {}}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-200 transition-colors duration-300"
                >
                  <FaShoppingBag className="mr-2" />
                  Start Shopping
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <Products />
      </div>
    </>
  );
};

export default Home;

// {
//   "id": "prod_12345",
//   "name": "Wireless Bluetooth Headphones",
//   "description": "High-quality headphones with noise cancellation and 20-hour battery life.",
//   "sku": "WH-1000XM4-BLK",
//   "category": "Electronics",
//   "subCategory": "Audio Accessories",
//   "price": 299.99,
//   "originalPrice": 349.99,
//   "discount": "15%",
//   "currency": "USD",
//   "stock": 25,
//   "isInStock": true,
//   "brand": "Sony",
//   "images": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"],
//   "thumbnail": "https://example.com/thumb.jpg",
//   "ratings": 4.5,
//   "reviewsCount": 120,
//   "isFeatured": false,
//   "seller": "TechTrendz",
//   "returnPolicy": "30-day return policy",
//   "warranty": "1-year limited warranty"
// }
