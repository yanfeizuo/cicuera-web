import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import EmailLogin from '../components/EmailLogin'
import XSignin from '../components/XSignin'
import GoogleSignin from '../components/GoogleSignin'

const Signup = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box maxWidth={500}>
        <EmailLogin />

        <Stack direction={'row'} justifyContent={'center'}>
          <Typography sx={{py: 2}} color='text.secondary'>OR</Typography>
        </Stack>

        <XSignin />

        <GoogleSignin />

      </Box>
    </Container>
  )
}

export default Signup