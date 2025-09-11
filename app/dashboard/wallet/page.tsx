'use client'
import { SIGN_MSG } from '@/app/constants'
import { useUserStore } from '@/app/store/userStore'
import { fetchWithAuth } from '@/app/utils/api'
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { Eip1193Provider, ethers } from 'ethers'
import React, { useEffect, useState } from 'react'

const Wallet = () => {

  const [wallets, setWallets] = useState([])

  const userData = useUserStore(state => state.userData)

  const { address: account } = useAppKitAccount()
  const { open: openWallet } = useAppKit()

  const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155')

  useEffect(() => {
    if (userData) {
      getWallet(userData.id)
    }
  }, [userData])

  const getWallet = async (id: string) => {
    const res = await fetchWithAuth(`user/getWallet?id=${id}`)
    const walletRes = await res.json()
    setWallets(walletRes.results.wallets)
  }

  const addWallet = async () => {
    const bSigner = await (new ethers.BrowserProvider(walletProvider)).getSigner()
    const signature = await bSigner.signMessage(SIGN_MSG)
    // console.log('signature', signature)
    const id = userData?.id
    const res = await fetchWithAuth(`user/addWallet?sig=${signature}&id=${id}`)
    const addWalletRes = await res.json()
    console.log('res', addWalletRes)
    if (!addWalletRes.error) {
      getWallet(id!)
    } else {
      alert(addWalletRes.error)
    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          List of wallet address
        </Typography>
        <Stack>
          {
            (wallets && wallets.length) ? wallets.map(w => (
              <Typography key={w} variant="h5" component="div">
                {w}
              </Typography>
            )) : (
              <Typography variant="h5" component="div">
                No data
              </Typography>
            )
          }

        </Stack>

      </CardContent>
      <CardActions>
        {
          !account && (
            <Button variant="contained" disabled={!!account} onClick={() => openWallet()}>
              {
                account ? account : 'connect wallet'
              }
            </Button>
          )
        }
        <Button variant='contained' disabled={!account} size="small" onClick={addWallet}>Add</Button>
      </CardActions>
    </Card>
  )
}

export default Wallet