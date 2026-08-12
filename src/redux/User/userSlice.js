import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import authorizeAxiosInstance from '~/pages/Ultis/authorizeAxios'
import { API_ROOT } from '~/pages/Ultis/constants'


// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentUSer: null
}

// các hành động gọi api và cập nhật dữ liệu vào redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
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

  // Reducer: Nơi xử lý dữ liệu đồng bộ
  reducers: {

  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về
      const user = action.payload
      state.currentUSer = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUSer = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUSer = user
    })
  }
})

// Action creators are generated for each case reducer function
// export const { } = userSlice.actions

// Selectors:
export const selectCurrentUser = (state) => {
  return state.user.currentUSer
}
// export default activeBoardslice.reducer
export const userReducer = userSlice.reducer