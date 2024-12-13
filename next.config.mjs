/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lovely-flamingo-139.convex.cloud"
			},
			{
				protocol: "https",
				hostname: "placehold.co"
			},
			{
				protocol: "https",
				hostname: "hidden-labrador-178.convex.cloud"
			}
		]
	}
};

export default nextConfig;
