/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/admin/auth',             // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/admin',
  //       permanent: true,    // Đường dẫn thực tế đến API bên ngoài
  //     },
  //     {
  //       source: '/admin/dashboard',            // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/',    
  //       permanent: true,     // Đường dẫn nội bộ của ứng dụng
  //     },
  //     {
  //       source: '/admin/dashboard/class-room',             // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/qllh', 
  //       permanent: true,   // Đường dẫn thực tế đến API bên ngoài
  //     },
  //     {
  //       source: '/admin/dashboard/alumunus',            // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/qlsv', 
  //       permanent: true,        // Đường dẫn nội bộ của ứng dụng
  //     },

  //   ];
  // },
    // exportPathMap() {
    //     return {
    //       '/admin': { page: '/admin/auth' },
    //       '/': { page: '/admin/dashboard' },
    //       '/qlsv': { page: '/admin/dashboard/alumunus' },
    //       '/qllh': { page: '/admin/dashboard/class-room' },
    //       // Thêm các đường dẫn khác tại đây
    //     };
    //   },
      
};

export default nextConfig;
