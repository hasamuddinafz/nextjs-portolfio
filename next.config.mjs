/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['miro.medium.com'],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
};

export default nextConfig;
