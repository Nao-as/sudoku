/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	}, // Enable experimental features
};

export default nextConfig;
