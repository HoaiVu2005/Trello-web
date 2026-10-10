import { useState } from 'react'
import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/User/userSlice'
import { socketIoInstance } from '~/socketClient'

function CardActivitySection({ cardComment, onAddCardComment }) {
  const currentUser = useSelector(selectCurrentUser)
  const [commentText, setCommentText] = useState('')

  const handleSendComment = () => {
    const trimmedContent = commentText.trim()
    if (!trimmedContent) return

    const commentToAdd = {
      userAvatar: currentUser?.avatar,
      userDisplayName: currentUser?.displayName,
      content: trimmedContent
    }
    onAddCardComment(commentToAdd).then((resComment) => {
      setCommentText('')
      if (resComment) {
        socketIoInstance.emit('FE_COMMENT_TO_DIFFERENT_USER', resComment)
      }
    })
  }

  const handleAddCardComment = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendComment()
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      {/* Xử lý thêm comment vào Card */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Avatar
            sx={{ width: 36, height: 36, cursor: 'pointer', mt: 0.5 }}
            alt={currentUser?.displayName}
            src={currentUser?.avatar}
          />
          <TextField
            fullWidth
            placeholder="Write a comment..."
            type="text"
            variant="outlined"
            multiline
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleAddCardComment}
          />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', pl: '44px' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={!commentText.trim()}
            onClick={handleSendComment}
            endIcon={<SendIcon />}
            sx={{ textTransform: 'none' }}
          >
            Send
          </Button>
        </Box>
      </Box>

      {/* Hiển thị danh sách các comments */}
      {cardComment.length === 0 &&
        <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>No activity found!</Typography>
      }
      {cardComment.map((comment, index) =>
        <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={index}>
          <Tooltip title={comment?.userDisplayName || 'User'}>
            <Avatar
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              alt={comment?.userDisplayName}
              src={comment?.userAvatar}
            />
          </Tooltip>
          <Box sx={{ width: 'inherit' }}>
            <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
              {comment?.userDisplayName}
            </Typography>

            <Typography variant="span" sx={{ fontSize: '12px' }}>
              {moment(comment?.commentedAt).format('llll')}
            </Typography>

            <Box sx={{
              display: 'block',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
              p: '8px 12px',
              mt: '4px',
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              wordBreak: 'break-word',
              boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
            }}>
              {comment?.content}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CardActivitySection

