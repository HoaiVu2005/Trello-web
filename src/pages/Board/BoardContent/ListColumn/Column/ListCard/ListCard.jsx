
import { Box } from '@mui/material'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCard({ cards }) {
  const COLUMN_HEADER_HEIGHT = '50px'
  const COLUMN_FOOTER_HEIGHT = '56px'
  return (
    <SortableContext items={cards?.map((card) => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px 5px 5px', m: '0 5px',
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#dcdde1 ',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'white',
          borderRadius: '8px'
        },
        gap: 1, flexDirection: 'column', display: 'flex', overflowY: 'auto', overflowX: 'hidden', maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`
      }}>
        {cards?.map((card) => (
          <Card card={card} key={card._id} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCard
