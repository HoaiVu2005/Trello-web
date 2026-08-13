/* eslint-disable no-console */
import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { logoutUserAPI } from '~/redux/User/userSlice'
import { refreshTokenAPI } from '~/apis'

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}
let authorizeAxiosInstance = axios.create()
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu JWT tokens trong httpOnly cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

// Cấu hình Interceptors
// Add a request interceptor: Can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {

    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
//Khởi tạo một cái promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để
// Add a response interceptor: Can thiệp vào giữa những cái response nhận về
let refreshTokenPromise = null

authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    interceptorLoadingElements(false)

    // Xử lý refreshTOken tự động
    // TH1: Nếu nhận mã 401 từ backend thì gọi api đăng xuất luôn
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }
    //TH2: Nếu nhận mã 410 từ BE thì gọi API refreshToken để làm mới lại accessToken
    const originalRequests = error.config
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then(data => {
            // Đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ BE)
            return data?.accessToken
          })
          .catch((_error) => {
            // Nếu nhận bất kỳ lỗi nào từ API refresh token thì cứ logout luôn
            axiosReduxStore.dispatch(logoutUserAPI(false))
            // return Promise.reject(_error)

          })
          .finally(() => {
            // Dù API có thành công hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như ban đầu
            refreshTokenPromise = null

          })
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then(accessToken => {
        return authorizeAxiosInstance(originalRequests)
      })
    }

    // Mọi mã http status code nằm ngoài khoảng 200 sẽ là error và rơi vào đây
    // Xử lý tập trung phần hiển thị thông báo lỗi trả cề từ mọi API ở đây
    // console.log(error)
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)


export default authorizeAxiosInstance