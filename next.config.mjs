/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'packly-local.s3.ap-southeast-1.amazonaws.com',
            'admin.shop.packly.com',
            '192.168.10.11',
            '157.230.240.97', // ✅ ADD THIS
        ],
    },
};

export default nextConfig;
