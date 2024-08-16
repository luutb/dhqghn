/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/admin',             // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/admin/auth',
  //       permanent: true,    // Đường dẫn thực tế đến API bên ngoài
  //     },
  //     {
  //       source: '/',            // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/admin/dashboard',    
  //       permanent: true,     // Đường dẫn nội bộ của ứng dụng
  //     },
  //     {
  //       source: '/qllh',             // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/admin/dashboard/class-room', 
  //       permanent: true,   // Đường dẫn thực tế đến API bên ngoài
  //     },
  //     {
  //       source: '/qlsv',            // Đường dẫn yêu cầu từ phía người dùng
  //       destination: '/admin/dashboard/alumunus', 
  //       permanent: true,        // Đường dẫn nội bộ của ứng dụng
  //     },

  //   ];
  // },
  async rewrites() {
    return [
      {
        source: '/admin',             // Đường dẫn yêu cầu từ phía người dùng
        destination: '/admin/auth',
     // Đường dẫn thực tế đến API bên ngoài
      },
      {
        source: '/',            // Đường dẫn yêu cầu từ phía người dùng
        destination: '/admin/dashboard',    
         // Đường dẫn nội bộ của ứng dụng
      },
      {
        source: '/qllh',             // Đường dẫn yêu cầu từ phía người dùng
        destination: '/admin/dashboard/class-room', 
      // Đường dẫn thực tế đến API bên ngoài
      },
      {
        source: '/qlsv',            // Đường dẫn yêu cầu từ phía người dùng
        destination: '/admin/dashboard/alumunus', 
             // Đường dẫn nội bộ của ứng dụng
      },
      {
        source: '/qlgv',            // Đường dẫn yêu cầu từ phía người dùng
        destination: '/admin/dashboard/teachers', 
             // Đường dẫn nội bộ của ứng dụng
      },

    ];
  },
    // exportPathMap() {
    //     return {
    //       '/admin': { page: '/admin/auth' },
    //       '/': { page: '/admin/dashboard' },
    //       '/qlsv': { page: '/admin/dashboard/alumunus' },
    //       '/qllh': { page: '/admin/dashboard/class-room' },
    //       '/qlgv': { page: '/admin/dashboard/teachers' },
    //       // Thêm các đường dẫn khác tại đây
    //     };
    //   },
      
};

export default nextConfig;
