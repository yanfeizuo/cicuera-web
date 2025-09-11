'use client'
import { API_BASE_URL } from '@/app/constants'
import { useUserStore } from '@/app/store/userStore'
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const EmailSignup = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [verifyCode, setVerifyCode] = useState<string>('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const { checkUser } = useUserStore(useShallow(state => ({
    checkUser: state.checkUser
  })))

  const getVerifyCode = async () => {
    const res = await fetch(`${API_BASE_URL}/email/sendCode/${email}`)
    const resJson = await res.json()
    if (!resJson.error) {
      alert('Send verify code succeed')
    } else {
      console.log('get verify code err', resJson.error)
    }
  }
  const handleEmailLogin = async () => {
    const res = await fetch(`${API_BASE_URL}/email/user?email=${email}&password=${password}&code=${verifyCode}`)
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
      console.log('verify email code err', resJson.error)
    }
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2)
  }
  return (
    <Box>
      <Stack sx={{ mt: 4 }} direction={'row'} justifyContent={'center'}>
        <Typography fontWeight={700}>Signup</Typography>
      </Stack>
      <TextField
        sx={{ mt: 1 }}
        size='small'
        fullWidth
        label="Enter email address"
        variant='outlined'
        value={email}
        onChange={e => setEmail(e.target.value)}
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
      <TextField
        sx={{ mt: 2 }}
        size='small'
        label="Password Confirm"
        type={showPassword2 ? 'text' : 'password'}
        fullWidth
        value={password2}
        onChange={e => setPassword2(e.target.value)}
        slotProps={{
          input: {
            endAdornment:
              <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword2}>
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          }
        }}
      ></TextField>
      <TextField
        sx={{ mt: 2 }}
        size='small'
        label="Verify code"
        fullWidth
        value={verifyCode}
        onChange={e => setVerifyCode(e.target.value)}
        slotProps={{
          input: {
            endAdornment:
              <InputAdornment position='end'>
                <Button onClick={getVerifyCode}>Send</Button>
              </InputAdornment>
          }
        }}
      ></TextField>
      <Button disabled={!email || !verifyCode || !(
        password && password2 && password === password2
      )} sx={{ mt: 2 }} fullWidth variant='contained'
        onClick={handleEmailLogin}
      >Signup</Button>
    </Box>
  )
}

export default EmailSignup