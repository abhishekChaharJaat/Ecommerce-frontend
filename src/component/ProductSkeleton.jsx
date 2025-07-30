import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"></div>
      
      {/* Product Image Skeleton */}
      <div className="relative animate-pulse">
        <div className="p-2">
          <div className="w-full h-28 sm:h-72 bg-gray-100 rounded-[8px]"></div>
        </div>
        {/* Discount Badge Skeleton */}
        <div className="absolute top-1 left-1 md:top-3 md:left-3 bg-gray-100 h-6 w-16 rounded-full"></div>
        {/* Stock Status Skeleton */}
        <div className="absolute top-1 right-1 md:top-3 md:right-3 bg-gray-100 h-5 w-5 rounded-full"></div>
      </div>

      {/* Product Info Skeleton */}
      <div className="p-2 sm:p-5 flex flex-col gap-1 md:gap-2 animate-pulse">
        {/* Product Name */}
        <div className="h-4 sm:h-6 bg-gray-100 rounded w-3/4"></div>
        
        {/* Brand */}
        <div className="h-3 sm:h-4 bg-gray-100 rounded w-1/2 mt-1"></div>
        
        {/* Rating */}
        <div className="flex items-center mt-1">
          <div className="h-4 w-4 bg-gray-100 rounded-full mr-1"></div>
          <div className="h-3 sm:h-4 bg-gray-100 rounded w-12"></div>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-1 md:gap-2 mt-1">
          <div className="h-3 w-3 bg-gray-100 rounded"></div>
          <div className="h-5 sm:h-6 bg-gray-100 rounded w-20"></div>
          <div className="h-3 sm:h-4 bg-gray-100 rounded w-16"></div>
        </div>
        
        {/* Add to Cart Button */}
        <div className="h-8 md:h-10 bg-gray-100 rounded-md mt-2"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;