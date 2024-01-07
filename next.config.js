/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "process.env.STRAPI_BASE_URL",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
