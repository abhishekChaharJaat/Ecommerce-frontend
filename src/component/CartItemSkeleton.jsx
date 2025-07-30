import React from "react";

const CartItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Image skeleton */}
        <div className="w-20 h-20 bg-gray-100 rounded"></div>
        
        {/* Product details skeleton */}
        <div className="flex-1">
          <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
          <div className="flex items-center space-x-2">
            <div className="h-3 bg-gray-100 rounded w-16"></div>
            <div className="h-3 bg-gray-100 rounded w-16"></div>
          </div>
        </div>
      </div>
      
      {/* Price and actions skeleton */}
      <div className="flex items-center space-x-4">
        <div className="h-5 bg-gray-100 rounded w-20"></div>
        <div className="h-8 w-8 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;