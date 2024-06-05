/** @type {import('next').NextConfig} */
const nextConfig = {
  //...
  scripts: {
    build: "prisma generate && next build",
  },
};

export default nextConfig;
