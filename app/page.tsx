import { Box, Container, Stack, Typography } from '@mui/material';
import XSignin from './components/XSignin';
import GoogleSignin from './components/GoogleSignin';
import EmailSignup from './components/EmailSignup';

export default function Page() {

  return (
    <Container sx={{display: 'flex', justifyContent: 'center'}}>
      <Box maxWidth={500}>
        <EmailSignup />

        <Stack direction={'row'} justifyContent={'center'}>
          <Typography sx={{py: 2}} color='text.secondary'>OR</Typography>
        </Stack>

        <XSignin />

        <GoogleSignin />

      </Box>
    </Container>
  );
}