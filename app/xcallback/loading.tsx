import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const loading = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', inset: 0}}>
      <CircularProgress></CircularProgress>
    </Box>
  )
}

export default loading