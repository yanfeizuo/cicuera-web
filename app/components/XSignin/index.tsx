import { API_BASE_URL } from '@/app/constants';
import { useUserStore } from '@/app/store/userStore';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useShallow } from 'zustand/shallow';

const XSignin = () => {

  const router = useRouter()

  const { data, checkUser } = useUserStore(useShallow(state => ({
    data: state.userData,
    checkUser: state.checkUser,
  })))

  const openTwitterPopup = (): Promise<{ code: string, state: string }> => {
    return new Promise(async (resolve, reject) => {

      const loginUrlRes = await fetch(`${API_BASE_URL}/x/login`)
      const res = await loginUrlRes.json()
      console.log('res', res)
      const authUrl = res.results
      // const authUrl = `http://localhost:3001`;

      const popup = window.open(
        authUrl,
        "X Auth",
        `width=600,height=800,left=${(window.screen.width - 600) / 2},top=${(window.screen.height - 800) / 2}`
      );

      const messageHandler = (event: MessageEvent) => {
        // console.log('event', event)
        if (event.origin !== window.location.origin) return;

        const { code, state } = event.data;

        if (code && state) {
          window.removeEventListener("message", messageHandler);
          resolve({ code, state });
        }
      };

      window.addEventListener("message", messageHandler);

      // 设置超时
      setTimeout(() => {
        if (popup && !popup.closed) {
          popup.close();
          reject(new Error("auth timeout"));
          window.removeEventListener("message", messageHandler);
        }
      }, 300000); // 5分钟超时
    });
  };

  const handleTwitterLogin = async () => {
    try {
      //const { code, state } = {code: 1, state: 2}
      const { code, state } = await openTwitterPopup();
      console.log({ code, state })
      const userinfoRes = await fetch(`${API_BASE_URL}/x/user?code=${code}&state=${state}`)
      const userinfo = await userinfoRes.json()
      console.log('userinfo', userinfo)
      const { id } = userinfo.results
      const { error } = await checkUser(id)
      if (error) {
        alert(error)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      console.error("X login failed:", err);
    }
  };

  return (
    <Box>
      <Button fullWidth variant='contained' disabled={!!data} onClick={handleTwitterLogin}>
        Signin with X
      </Button>
    </Box>
  )
}

export default XSignin