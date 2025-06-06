import axios from 'axios';
import { getToken, removeToken } from './handle-token'; // Giả sử bạn có các hàm này để quản lý token

const axiosInstance = axios.create({
  //http://103.75.185.135/api
  baseURL:'http://103.75.185.135/api', // Thay đổi thành API cơ sở của bạn
  timeout: 60000, // Thay đổi thời gian chờ nếu cần
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm request interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken(); // Lấy token từ localStorage, cookies, hoặc bất kỳ nơi nào bạn lưu trữ
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Thêm response interceptor để xử lý lỗi và token hết hạn
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;