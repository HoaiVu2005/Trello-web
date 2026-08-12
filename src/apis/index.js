
import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/pages/Ultis/authorizeAxios'
import { API_ROOT } from '~/pages/Ultis/constants'

// export const fetchBoardDetailsAPI = async (boardId) => {
//   const respone = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return respone.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return respone.data
}
// columns

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return respone.data
}
export const deleteColumnDetailsAPI = async (columnId) => {
  const respone = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return respone.data
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}
export const createNewBoardAPI = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/boards`, newColumnData)
  toast.success('Board created successfully!', { theme: 'colored' })

  return response.data
}


//  cards
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
  return respone.data
}

export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Account created successfully! Please check and verify your account before loging in!', { theme: 'colored' })
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!', { theme: 'colored' })
  return response.data
}
export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`)
  return response.data
}

export const updateCardDetaisAPI = async (cardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData)
  return response.data
}

export const inviteUserToBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
  toast.success('User invited to board successfully!')
  return response.data
}