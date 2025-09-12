'use client'
import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from '@/app/constants';
import { useUserStore } from '@/app/store/userStore';
import { useShallow } from 'zustand/shallow';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const GoogleSignin = () => {

  const router = useRouter()

  const { checkUser } = useUserStore(useShallow(state => ({
    checkUser: state.checkUser
  })))

  return (
    <Box mt={2}>
      <GoogleLogin
        onSuccess={async credentialResponse => {
          // console.log(credentialResponse.credential);
          const userinfoRes = await fetch(`${API_BASE_URL}/g/user?code=${credentialResponse.credential}`)
          const userinfo = await userinfoRes.json()
          console.log('g userinfo', userinfo)

          const { id } = userinfo.results
          const { error } = await checkUser(id)
          if (error) {
            alert(error)
          } else {
            router.push('/dashboard')
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
        logo_alignment='center'
      />
    </Box>
  )
}

export default GoogleSignin