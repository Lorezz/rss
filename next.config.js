/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
    env: {
      HOST: process.env.HOST,
    },
  },
};

module.exports = nextConfig;
