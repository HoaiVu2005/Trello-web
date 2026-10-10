import { Box, Button, Tooltip } from '@mui/material'
import ApiIcon from '@mui/icons-material/Api'
import PublicIcon from '@mui/icons-material/Public'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterListIcon from '@mui/icons-material/FilterList'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { capitalizeFirstLetter } from '~/pages/Ultis/formatter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
function BoardBar({ board }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
        overflowX: 'auto',
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976D2'),
        '&::-webkit-scrollbar': { height: '4px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '4px' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <Tooltip title={board?.description}>
          <Button sx={{ textTransform: 'none', color: 'white', whiteSpace: 'nowrap' }} variant="text">
            <ApiIcon sx={{ marginRight: '8px' }} />{board?.title}
          </Button>
        </Tooltip>
        <Button sx={{ textTransform: 'none', color: 'white', whiteSpace: 'nowrap' }} variant="text">
          <PublicIcon sx={{ marginRight: '8px' }} />{capitalizeFirstLetter(board?.type)}
        </Button>
        <Button sx={{ textTransform: 'none', color: 'white', whiteSpace: 'nowrap' }} variant="text">
          <AddToDriveIcon sx={{ marginRight: '8px' }} />Add to GoogleDrive
        </Button>
        <Button sx={{ textTransform: 'none', color: 'white', whiteSpace: 'nowrap' }} variant="text">
          <AutoAwesomeIcon sx={{ marginRight: '8px' }} />Automation
        </Button>
        <Button sx={{ textTransform: 'none', color: 'white', whiteSpace: 'nowrap' }} variant="text">
          <FilterListIcon sx={{ marginRight: '8px' }} />Filters
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        <InviteBoardUser boardId={board._id} />
        <BoardUserGroup boardUsers={board?.FE_AllUsers} />
      </Box>
    </Box>
  )
}

export default BoardBar
