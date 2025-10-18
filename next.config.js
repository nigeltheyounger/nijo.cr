/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['kemono.party', 'kemono.su', 'coomer.party', 'coomer.su'],
  },
}

module.exports = nextConfig
