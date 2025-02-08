/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['localhost'], // Add your image domains here
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		serverActions: true,
	},
	async redirects() {
		return [
			{
				source: '/admin',
				destination: '/admin/dashboard',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig