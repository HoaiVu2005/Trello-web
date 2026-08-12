import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

function LoadingPageSpinner({ caption }) {
  return (

    <Box sx={{
      alignContent: 'center',
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      width: '100vw',
      height: '100vh'
    }}>
      <CircularProgress />
      <Typography>{caption}</Typography>

    </Box>
  )
}


export default LoadingPageSpinner
