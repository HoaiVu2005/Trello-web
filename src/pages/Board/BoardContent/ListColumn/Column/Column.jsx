import React, { useState } from 'react'
import { Box, TextField, Tooltip, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ListCard from './ListCard/ListCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { mapOrder } from '~/pages/Ultis/sorts'
import { useConfirm } from 'material-ui-confirm'
import { createNewCardAPI, deleteColumnDetailsAPI, updateColumnDetailsAPI } from '~/apis'
import { cloneDeep } from 'lodash'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

function Column({ column }) {
  const COLUMN_HEADER_HEIGHT = '50px'
  const COLUMN_FOOTER_HEIGHT = '56px'
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)


  const { attributes, isDragging, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }
  const addNewCard = async () => {
    if (!enterValueTitle) {
      toast.error('Please enter card title!')

      return
    }

    const newCardData = {
      title: enterValueTitle,
      columnId: column._id
    }
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    toggleNewCardForm()
    setEnterValueTitle('')
  }

  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      // description: 'This action will permanently delete your Column and its Cards! Are you sure? ',
      // dialogProps: { maxWidth: 'xs' },
      // allowClose: false

    }).then(() => {
      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
      dispatch(updateCurrentActiveBoard(newBoard))
      deleteColumnDetailsAPI(column._id).then(res => {
        toast.success(res?.deleteResult)
      })


    }).catch(() => { })
  }

  const onUpdateColumnTitle = (newTitle) => {
    // console.log('onUpdateColumnTitle:', newTitle)
    updateColumnDetailsAPI(column._id, { title: newTitle }).then(() => {
      const newBoard = cloneDeep(board)

      const columnToUpdate = newBoard.columns.find(c => c._id === column._id)
      columnToUpdate.title = newTitle
      dispatch(updateCurrentActiveBoard(newBoard))
    })
  }

  const [enterValueTitle, setEnterValueTitle] = useState('')

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box {...listeners} sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#EBECF0', minWidth: '300px', borderRadius: '5px', maxWidth: '300px', height: 'fit-content', maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})` }}>
        {/* Header column */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: COLUMN_HEADER_HEIGHT, p: 2 }}>
          {/* <Typography sx={{ fontWeight: 'bold' }}>{column?.title}</Typography> */}
          <ToggleFocusInput data-no-dnd='true' value={column?.title} onChangedValue={onUpdateColumnTitle} />
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open}
                onClick={handleClick} sx={{ cursor: 'pointer' }} />
            </Tooltip>

            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
              }}
            >
              <MenuItem
                onClick={toggleNewCardForm}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}>
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': {
                      color: 'warning.dark'
                    }
                  }
                }}>
                <ListItemIcon>
                  <DeleteForeverIcon className='delete-forever-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archieve this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

        </Box>
        {/* List card */}
        <ListCard cards={orderedCards} />
        {/* Footer */}
        <Box sx={{ height: COLUMN_FOOTER_HEIGHT, p: 2 }}>
          {!openNewCardForm
            ? <Box
              onClick={toggleNewCardForm}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <Button variant="text" sx={{ textTransform: 'none', cursor: 'pointer' }}><AddCardIcon sx={{ marginRight: '8px', cursor: 'pointer' }} />Add new card</Button>
              <ZoomOutMapIcon sx={{ cursor: 'pointer' }} />
            </Box>
            : <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField size='small'
                id="filled-helperText"
                label="Enter card title"
                value={enterValueTitle}
                autoFocus
                data-no-dnd="true"
                variant='outlined'
                onChange={(e) => setEnterValueTitle(e.target.value)}

                sx={{
                  '& label': { color: 'text.primary' },

                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },

                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },

                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  },

                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                <Button
                  className='interceptor-loading'
                  onClick={addNewCard}
                  variant='container' color="success" size='small' sx={{
                    boxShadow: 'none', border: '0.5px solid', bgcolor: (theme) => theme.palette.success.main, borderColor: (theme) => theme.palette.success.main, '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main
                    }, color: 'white', textTransform: 'none'
                  }}>
                  Add
                </Button>
                <CloseIcon onClick={toggleNewCardForm} sx={{ cursor: 'pointer', color: (theme) => theme.palette.warning.light }} />
              </Box>
            </Box>
          }

        </Box>

      </Box>
    </div>
  )
}

export default Column
