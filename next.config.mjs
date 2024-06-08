/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'movie-app.storage.iran.liara.space'
            }
        ]
    }
};

export default nextConfig;
