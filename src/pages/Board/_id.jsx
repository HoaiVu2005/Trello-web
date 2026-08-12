import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Board/BoardBar/BoardBar'
import BoardContent from '~/pages/Board/BoardContent/BoardContent'
import { useEffect } from 'react'
import { moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetailsAPI, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'
import { useParams } from 'react-router-dom'
import LoadingPageSpinner from '~/components/Loading/LoadingPageSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
function Board() {
  const dispatch = useDispatch()
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '6a2e19f84c9c98db15da1626'

    dispatch(fetchBoardDetailsAPI(boardId))

  }, [dispatch, boardId])


  const moveColumns = (dndOrderedColumns) => {
    const newBoard = { ...board }
    const dndOrderdColumnOrderIds = dndOrderedColumns.map(c => c._id)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderdColumnOrderIds
    dispatch(updateCurrentActiveBoard(newBoard))

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInsameColumn = (dndOrderdCards, dndOrderdCardIds, columnId) => {
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    columnToUpdate.cards = dndOrderdCards
    columnToUpdate.cardOrderIds = dndOrderdCardIds
    dispatch(updateCurrentActiveBoard(newBoard))


    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderdCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const newBoard = cloneDeep(board)

    const dndOrderdColumnOrderIds = dndOrderedColumns.map(c => c._id)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderdColumnOrderIds
    dispatch(updateCurrentActiveBoard(newBoard))


    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds.filter(id => !id.includes('-placeholder-card')),
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds.filter(id => !id.includes('-placeholder-card'))
    })
  }


  if (!board) {
    return <LoadingPageSpinner caption="Loading Board..." />
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <ActiveCard />
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          // deleteColumnDetails={deleteColumnDetails}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          moveCardInsameColumn={moveCardInsameColumn}
          moveColumns={moveColumns}
          board={board}
        // createNewCard={createNewCard}
        // createNewColumn={createNewColumn}
        />
      </Container>
    </>
  )
}

export default Board