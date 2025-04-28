import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname:"images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com", // All github user content
      }
    ]
  },
  devIndicators: false
};

export default nextConfig;
