import axios from 'axios'
import { useToast } from 'vue-toastification'

// Khởi tạo toast để hiển thị thông báo ra UI
const toast = useToast()

// Tạo instance riêng cho API
export const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4', // API gốc (cố định)
  timeout: 10000, // giới hạn thời gian tối đa 10 giây
})

// INTERCEPTOR REQUEST (CỔNG VÀO)
// Chạy MỖI KHI gọi API (trước khi gửi đi)
// Dùng để thêm token, header, hoặc log
api.interceptors.request.use(
  (config) => {
    // Giả sử sau này bạn có token thì thêm ở đây:
    // const token = localStorage.getItem('access_token')
    // if (token) config.headers.Authorization = `Bearer ${token}`

    return config // return lại để request tiếp tục được gửi đi
  },
  (error) => {
    // Lỗi xảy ra TRƯỚC khi request được gửi đi (ví dụ cấu hình sai)
    console.error('Request Error:', error)
    toast.error('Lỗi cấu hình yêu cầu, vui lòng thử lại.')
    return Promise.reject(error) // Bắt buộc reject để dừng request
  }
)

// INTERCEPTOR RESPONSE (CỔNG RA)
// Chạy MỖI KHI server trả về dữ liệu (hoặc lỗi)
api.interceptors.response.use(
  (response) => {
    // Khi server trả về thành công (status code 200–299)
    return response
  },
  (error) => {
    // Khi server trả về lỗi (status 4xx hoặc 5xx)
    let message = 'Đã xảy ra lỗi không xác định.'

    if (error.response) {
      // Server có phản hồi (ví dụ: 404, 500,…)
      const status = error.response.status
      const serverMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        JSON.stringify(error.response.data)

      message = `[${status}] ${serverMessage}`
    } else if (error.request) {
      // Không nhận được phản hồi (timeout, mất mạng,…)
      message = 'Không nhận được phản hồi từ server. Kiểm tra kết nối mạng.'
    } else {
      // Lỗi trong lúc xử lý yêu cầu (vd: lỗi cú pháp axios,…)
      message = `Lỗi Axios: ${error.message}`
    }

    toast.error(message)
    return Promise.reject(error) // Quan trọng: vẫn trả lỗi ra để phía gọi xử lý tiếp
  }
)
