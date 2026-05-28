/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workspace package contains "use client" components that Next.js needs
  // to transpile from source rather than treat as pre-built CJS.
  transpilePackages: ['@electroplix/components'],
  reactStrictMode: true,
};

export default nextConfig;
