import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

function LoadingPageSpinner({ caption = 'Loading...' }) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2.5,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'),
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 68,
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress
          size={68}
          thickness={3.5}
          sx={{
            color: 'primary.main',
            animationDuration: '1.2s'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 0 18px rgba(0, 121, 191, 0.6)'
                : '0 0 14px rgba(0, 121, 191, 0.4)'
          }}
        >
          <TrelloIcon style={{ width: 22, height: 22, fill: '#fff' }} />
        </Box>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: '0.95rem',
          letterSpacing: '0.5px',
          color: (theme) => (theme.palette.mode === 'dark' ? '#94a3b8' : '#475569')
        }}
      >
        {caption}
      </Typography>
    </Box>
  )
}

export default LoadingPageSpinner
