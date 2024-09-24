// src/components/Loading.js
import React from "react";

function Loading() {
  return (
    <div className="animate-pulse p-4 space-y-4">
      {/* Header Skeleton */}
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>

      {/* Subheader Skeleton */}
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>

      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300 rounded w-full"></div>

      {/* Text Lines Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-300 rounded w-32"></div>

      {/* Additional Elements */}
      <div className="flex space-x-4">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}

export default Loading;
