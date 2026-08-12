import { Box, Button, Tooltip, Typography } from '@mui/material'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import AppsIcon from '@mui/icons-material/Apps'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Workspace from '~/components/AppBar/Menus/Workspace'
import Recent from '~/components/AppBar/Menus/Recent'
import Started from '~/components/AppBar/Menus/Started'
import Template from '~/components/AppBar/Menus/Template'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Profile from '~/components/AppBar/Menus/Profile'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
import { useState } from 'react'
import { CreateBoardModal } from '../Modal/CreateBoardModal'
import { useForm } from 'react-hook-form'
function AppBar() {
  const [isOpenMoDal, setIsOpenModel] = useState(false)
  const { reset } = useForm()
  const handleOpenModal = () => {
    setIsOpenModel(true)
  }
  const handleCloseModal = () => {
    setIsOpenModel(false)
    // Reset lại toàn bộ form khi đóng Modal
    reset()
  }
  return (
    <div>
      <Box sx={{ overflowY: 'hidden', display: 'flex', overflowX: 'auto', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: 2, height: (theme) => theme.trello.appBarHeight, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2C3E50' : '#1575C0') }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 2
        }}>
          <Tooltip title='Board Lists' >
            <Link to='/boards'><AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} /></Link>

          </Tooltip>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.5
            }}>

              <AccessibleForwardIcon sx={{ color: 'white ', fontSize: 30 }} />
              <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 600 }}>Trello</Typography>

            </Box>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Workspace />
            <Recent />
            <Started />
            <Template />
            <Button onClick={handleOpenModal} sx={{ color: 'white', textTransform: 'none' }} variant="text"><AddToPhotosIcon sx={{ marginRight: '8px' }} />Create</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AutoCompleteSearchBoard />
          <ModeSelect />
          <Notifications />
          <Tooltip title="Help">
            <HelpOutlineOutlinedIcon sx={{ color: 'white', cursor: 'pointer' }} fontSize='medium' />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
      <CreateBoardModal isOpen={isOpenMoDal} handleCloseModal={handleCloseModal} />
    </div>
  )
}

export default AppBar
