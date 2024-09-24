// app/layout.tsx or app/layout.jsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";
import Script from "next/script";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import MainHeader from "@/components/layout/Header/MainHeader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Widam",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
        />
      </head>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <MainHeader />
        {/* Add padding-top to prevent content from being hidden behind the fixed header */}
        <main className="flex-grow pt-40">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            position: "top-center",
            // Default styles
            className: "",
            style: {
              background: "#fff",
              color: "#333",
            },
            // Success toast styling
            success: {
              className: "bg-green-100 text-green-700",
            },
            // Error toast styling
            error: {
              className: "bg-red-100 text-red-700",
            },
            // Custom styles for other types
            custom: {
              className: "bg-blue-100 text-blue-700",
            },
          }}
        />
      </body>
    </html>
  );
}
