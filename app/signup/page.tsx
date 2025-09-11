import { Box, Container } from '@mui/material'
import React from 'react'
import EmailSignup from '../components/EmailSignup'

const Signup = () => {
  return (
    <Container sx={{display: 'flex', justifyContent: 'center'}}>
          <Box maxWidth={500}>
            <EmailSignup />
    
          </Box>
        </Container>
  )
}

export default Signup