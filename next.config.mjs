/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.builder.io",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
