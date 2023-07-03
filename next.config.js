/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "hnswlib-node"]

    return config
  },
}

module.exports = nextConfig
