import { Box, Container } from '@mui/material'
import React from 'react'
import EmailLogin from '../components/EmailLogin'

const Signup = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box maxWidth={500}>
        <EmailLogin />

      </Box>
    </Container>
  )
}

export default Signup