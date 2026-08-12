import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import authorizeAxiosInstance from '~/pages/Ultis/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/pages/Ultis/constants'
import { generatePlaceholderCard } from '~/pages/Ultis/formatter'


// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentActiveBoard: null
}

// các hành động gọi api và cập nhật dữ liệu vào redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {

    const respone = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return respone.data
  }
)

// Khởi tạo 1 cái Slice trong kho lưu trữ redux store
export const activeBoardslice = createSlice({
  name: 'activeBoard',
  initialState,

  // Reducer: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const fullBoard = action.payload

      // Update lại dữ liệu của activeBoard
      state.currentActiveBoard = fullBoard
    },
    updateCardInBoard: (state, action) => {
      const inComingCard = action.payload
      const column = state.currentActiveBoard.columns.find(i => i._id === inComingCard.columnId)
      if (column) {
        const card = column.cards.find(c => c._id === inComingCard._id)
        if (card) {
          // card.title = inComingCard.title
          Object.keys(inComingCard).forEach(key => {
            card[key] = inComingCard[key]
          })
        }
      }
    }


  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về
      let board = action.payload

      // Thành vuên trong cái board sẽ gộp lại
      board.FE_AllUsers = board.owners.concat(board.members)


      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]

        }
      })

      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardslice.actions

// Selectors:
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}
// export default activeBoardslice.reducer
export const activeBoardReducer = activeBoardslice.reducer