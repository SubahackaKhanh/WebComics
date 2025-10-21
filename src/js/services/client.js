import axios from 'axios';
import { useToast } from 'vue-toastification';

// Khởi tạo toast
const toast = useToast();

// Tạo instance riêng cho API
export const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000,
});

// Hàm retry với delay
const retryRequest = async (config, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise(resolve => setTimeout(resolve, delay)); // Delay trước khi retry
      return await api.request(config);
    } catch (err) {
      if (err.response?.status !== 429 || i === retries - 1) {
        throw err; // Ném lỗi nếu không phải 429 hoặc hết retry
      }
    }
  }
};

// INTERCEPTOR REQUEST
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    toast.error('Lỗi cấu hình yêu cầu, vui lòng thử lại.');
    return Promise.reject(error);
  }
);

// INTERCEPTOR RESPONSE
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let message = 'Đã xảy ra lỗi không xác định.';

    if (error.response) {
      const status = error.response.status;
      if (status === 429) {
        // Retry for 429 errors
        try {
          const response = await retryRequest(error.config, 3, 2000); // Retry 3 lần, delay 2s
          return response;
        } catch (retryError) {
          message = '[429] Quá nhiều yêu cầu. Vui lòng thử lại sau vài giây.';
        }
      } else {
        const serverMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data);
        message = `[${status}] ${serverMessage}`;
      }
    } else if (error.request) {
      message = 'Không nhận được phản hồi từ server. Kiểm tra kết nối mạng.';
    } else {
      message = `Lỗi Axios: ${error.message}`;
    }

    toast.error(message);
    return Promise.reject(error);
  }
);