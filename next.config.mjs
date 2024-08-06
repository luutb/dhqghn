/** @type {import('next').NextConfig} */
const nextConfig = {
    async exportPathMap(defaultPathMap, { dev }) {
        return {
          '/admin': { page: '/admin/auth' },
          '/': { page: '/admin/dashboard' },
          // Thêm các đường dẫn khác tại đây
        };
      },
      
};

export default nextConfig;
