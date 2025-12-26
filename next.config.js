/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: "/fileserver",
  env: {
    NEXT_PUBLIC_BASE_PATH: '/fileserver',
  },
}

module.exports = nextConfig
