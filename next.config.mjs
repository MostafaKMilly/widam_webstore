/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "widam.akwad.qa",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "app.widam.com.qa",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
