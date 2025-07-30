import React from "react";
import ProductSkeleton from "./ProductSkeleton";

const ProductsLoading = () => {
  // Show 6 skeleton cards for loading state
  const skeletonCount = 6;

  return (
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(skeletonCount)].map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsLoading;