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
    reset()
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2C3E50' : '#1575C0'),
        '&::-webkit-scrollbar': { height: '4px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '4px' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Board Lists">
          <Link to="/boards" aria-label="View Board List">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Link>
        </Tooltip>

        <Link to="/" style={{ textDecoration: 'none' }} aria-label="Trello Home">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessibleForwardIcon sx={{ color: 'white', fontSize: 30 }} />
            <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
              Trello
            </Typography>
          </Box>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Workspace />
          <Recent />
          <Started />
          <Template />
          <Button
            onClick={handleOpenModal}
            sx={{ color: 'white', textTransform: 'none' }}
            variant="text"
          >
            <AddToPhotosIcon sx={{ marginRight: '8px' }} />Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AutoCompleteSearchBoard />
        <ModeSelect />
        <Notifications />
        <Tooltip title="Help">
          <HelpOutlineOutlinedIcon
            sx={{ color: 'white', cursor: 'pointer', display: { xs: 'none', sm: 'inline-flex' } }}
            fontSize="medium"
          />
        </Tooltip>
        <Profile />
      </Box>

      <CreateBoardModal isOpen={isOpenMoDal} handleCloseModal={handleCloseModal} />
    </Box>
  )
}

export default AppBar


