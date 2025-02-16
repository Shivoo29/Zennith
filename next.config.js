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
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ['image/webp'],
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
	// Add assetPrefix for production
	assetPrefix: process.env.NODE_ENV === 'production' 
		? 'https://zennith-esummit.vercel.app' 
		: '',
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(glb|gltf)$/,
			type: 'asset/resource',
			generator: {
				filename: 'static/models/[name][ext]'
			}
		})
		return config
	},


}

module.exports = nextConfig