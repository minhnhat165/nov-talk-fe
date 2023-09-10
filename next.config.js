/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'ui-avatars.com',
      'lh3.googleusercontent.com',
      'scontent-sea1-1.xx.fbcdn.net',
      'platform-lookaside.fbsbx.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
