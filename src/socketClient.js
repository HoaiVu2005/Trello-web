import { io } from 'socket.io-client'
import { API_ROOT } from './pages/Ultis/constants'
export const socketIoInstance = io(API_ROOT)
