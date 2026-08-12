
import { Box, Button, TextField } from '@mui/material'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import Column from './Column/Column'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import { createNewColumnAPI } from '~/apis'
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { generatePlaceholderCard } from '~/pages/Ultis/formatter'

function ListColumn({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }
  const [enterValueTitle, setEnterValueTitle] = useState('')
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)


  const addNewColumn = async () => {
    if (!enterValueTitle) {
      toast.error('Please enter column title!')
      return
    }

    const newColumnData = {
      title: enterValueTitle
    }

    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleNewColumnForm()
    setEnterValueTitle('')
  }
  return (
    <SortableContext items={columns?.map((column) => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{ '&::-webkit-scrollbar-track': { m: 2 }, overflowY: 'hidden', display: 'flex', gap: 2, overflowX: 'auto', bgcolor: 'inherit', width: '100%', height: '100%', px: 2 }}>
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {!openNewColumnForm
          ? <Box onClick={toggleNewColumnForm} sx={{
            minWidth: '250px', maxWidth: '250px',
            mx: 2, borderRadius: '6px', height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button sx={{ width: '100%', color: 'white', pl: 2.5, py: 1, justifyContent: 'flex-start', textTransform: 'none' }} startIcon={<AddBoxIcon />}>Add new column</Button>
          </Box>
          : <Box sx={{ minWidth: '250x', maxWidth: '250px', mx: 2, p: 1, borderRadius: '6px', height: 'fit-content', bgcolor: '#ffdfff3d', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField size='small'
              id="filled-helperText"
              label="Enter column title"
              value={enterValueTitle}
              autoFocus
              variant='outlined'
              onChange={(e) => setEnterValueTitle(e.target.value)}

              sx={{
                cursor: 'pointer',
                '& label': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
              <Button
                className='interceptor-loading'
                onClick={addNewColumn}
                variant='container' color="success" size='small' sx={{
                  boxShadow: 'none', border: '0.5px solid', bgcolor: (theme) => theme.palette.success.main, borderColor: (theme) => theme.palette.success.main, '&:hover': {
                    bgcolor: (theme) => theme.palette.success.main
                  }, color: 'white', textTransform: 'none'
                }}>
                Add Column
              </Button>
              <CloseIcon onClick={toggleNewColumnForm} sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.light } }} />
            </Box>
          </Box>
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumn
