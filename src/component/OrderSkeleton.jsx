import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow animate-pulse">
      <div className="flex items-center justify-between">
        {/* Order details skeleton */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-3">
            {/* Image skeleton */}
            <div className="w-16 h-16 bg-gray-100 rounded"></div>
            
            {/* Product info skeleton */}
            <div className="flex-1">
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/3"></div>
            </div>
          </div>
          
          {/* User info skeleton */}
          <div className="border-t pt-3">
            <div className="h-3 bg-gray-100 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
          </div>
        </div>
        
        {/* Status dropdown skeleton */}
        <div className="ml-4">
          <div className="h-10 w-32 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;