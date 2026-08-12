import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { Button, Typography } from '@mui/material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import { showModalActiveCard, updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'

function Card({ card }) {
  const dispatch = useDispatch()

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card._id, data: { ...card } })

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }
  const setActiveCardToRedux = () => {
    dispatch(updateCurrentActiveCard(card))
    dispatch(showModalActiveCard())
  }
  return (
    <>
      <MuiCard
        onClick={setActiveCardToRedux}
        ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners} sx={{
          cursor: 'pointer', boxShadow: card?.FE_PlaceholderCard ? 'none' : '0 1px 1px rgba(0,0,0,0.2)',
          overflow: card?.FE_PlaceholderCard ? 'hidden' : 'unset',
          height: card?.FE_PlaceholderCard ? '0px' : 'unset',
          border: card?.FE_PlaceholderCard ? 'none' : '1px solid transparent',
          '&:hover': { borderColor: (theme) => theme.palette.primary.main }
        }}>
        {card?.cover &&
          <CardMedia
            sx={{ height: 140 }}
            image={card?.cover}
            title="green iguana"
          />
        }
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            {card?.title}
          </Typography>
        </CardContent>
        {shouldShowCardActions() &&
          <CardActions sx={{ p: '0 4px 8px 4px' }}>
            {!!card?.memberIds?.length &&
              <Button size="small" startIcon={<GroupsIcon />}>{card?.memberIds?.length}</Button>
            }
            {!!card?.comments?.length &&
              <Button size="small" startIcon={<ModeCommentIcon />}>{card?.comments?.length}</Button>
            }
            {!!card?.attachments?.length &&
              <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>
            }
          </CardActions>
        }

      </MuiCard >
    </>
  )
}

export default Card
