import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import authorizeAxiosInstance from '~/pages/Ultis/authorizeAxios'
import { API_ROOT } from '~/pages/Ultis/constants'

// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentUSer: null
}

// Các hành động gọi api
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return respone.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logged out sucessfully!')
    }
    return response.data
  }
)

// Khởi tạo 1 cái Slice trong kho lưu trữ redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUSer = user

      // 🌟 THÊM DÒNG NÀY: Lưu accessToken vào localStorage
      if (user?.accessToken) {
        localStorage.setItem('accessToken', user.accessToken)
      }
    })

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUSer = null

      // 🌟 THÊM DÒNG NÀY: Dọn sạch localStorage khi đăng xuất
      localStorage.removeItem('accessToken')
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUSer = user
    })
  }
})

// Selectors
export const selectCurrentUser = (state) => {
  return state.user.currentUSer
}

export const userReducer = userSlice.reducer