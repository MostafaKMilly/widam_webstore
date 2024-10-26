"use client";
import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="flex justify-center items-center mx-auto">
        <Loader className="animate-spin w-10 h-10 text-primary" />
      </div>
    </div>
  );
};

export default LoadingPage;
