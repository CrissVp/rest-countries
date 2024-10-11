/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	basePath: '/rest-countries',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com'
			},
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org'
			}
		]
	}
};

export default nextConfig;

