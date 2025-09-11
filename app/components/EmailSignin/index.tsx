import { API_BASE_URL } from '@/app/constants'
import { useUserStore } from '@/app/store/userStore'
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const EmailSignin = () => {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const [password, setPassword] = useState('')

  const { checkUser } = useUserStore(useShallow(state => ({
    checkUser: state.checkUser
  })))

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE_URL}/user/login?name=${userName}&password=${password}`)
    const resJson = await res.json()
    if (!resJson.error) {
      const { id } = resJson.results
      const { error } = await checkUser(id)
      if (error) {
        alert(error)
      } else {
        router.push('/dashboard')
      }
    } else {
      alert(resJson.error)
    }
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSignup = () => {
    router.push('/signup')
  }
  return (
    <Box>
      <Stack sx={{mt: 4}} direction={'row'} justifyContent={'center'}>
        <Typography fontWeight={700}>Signin</Typography>
      </Stack>
      <TextField
        sx={{ mt: 1 }}
        size='small'
        fullWidth
        label="Enter email address or account name"
        variant='outlined'
        value={userName}
        onChange={e => setUserName(e.target.value)}
      ></TextField>
      <TextField
        sx={{ mt: 2 }}
        size='small'
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={password}
        onChange={e => setPassword(e.target.value)}
        slotProps={{
          input: {
            endAdornment:
              <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          }
        }}
      ></TextField>
      <Button disabled={!userName || !password} sx={{ mt: 2 }} fullWidth variant='contained'
        onClick={handleLogin}
      >Signin</Button>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography color='text.secondary' fontSize={10}>No account yet?</Typography>
        <Button size='small' onClick={handleSignup}>Signup</Button>
      </Stack>
    </Box>
  )
}

export default EmailSignin