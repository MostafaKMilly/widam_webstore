import { AlertCircle } from "lucide-react";

export const ErrorComponent = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-screen text-red-600">
    <AlertCircle className="text-5xl mr-2" />
    <span>{message || "Error loading data. Please try again later."}</span>
  </div>
);
