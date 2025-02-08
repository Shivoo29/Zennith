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
	// Add assetPrefix for production
	assetPrefix: process.env.NODE_ENV === 'production' 
		? 'https://zennith-esummit.vercel.app' 
		: '',
	// Configure webpack to handle GLB files
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(glb|gltf)$/,
			use: {
				loader: 'file-loader',
				options: {
					publicPath: '/_next/static/models',
					outputPath: 'static/models',
				},
			},
		});
		return config;
	},
}

module.exports = nextConfig