'use client'
import ConnectBank from '@/app/components/ConnectBank'
import { useUserStore } from '@/app/store/userStore'
import { fetchWithAuth } from '@/app/utils/api'
import { Card, CardActions, CardContent, Paper, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

interface IAccount {
  name: string
  accId: string
  accountName: string
  bankName: string
  balance: string
  last4: string
}

const Bank = () => {

  const [accounts, setAccounts] = useState<IAccount[]>([])

  const userData = useUserStore(state => state.userData)

  const getAccount = useCallback(async () => {
    const id = userData?.id
    if (id) {
      const res = await fetchWithAuth(`user/getAccount?id=${id}`)
      const accountRes = await res.json()
      setAccounts(accountRes.results)
    } else {
      console.log('get account err: null id')
    }
  }, [userData])

  useEffect(() => {
    if (userData) {
      getAccount()
    }
  }, [userData, getAccount])

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          List of bank account
        </Typography>
        <Stack direction={'row'} spacing={2}>
          {
            (accounts && accounts.length) ? accounts.map(a => (
              <Paper key={a.accId} variant='outlined' sx={{ p: 2 }}>
                <Typography>name: {a.name}</Typography>
                <Typography>bank name: {a.bankName}</Typography>
                <Typography>acc name: {a.accountName}</Typography>
                <Typography>balance: {a.balance}</Typography>
                <Typography>mask: {a.last4}</Typography>
              </Paper>
            )) : (
              <Typography variant="h5" component="div">
                No data
              </Typography>
            )
          }

        </Stack>

      </CardContent>
      <CardActions>
        <ConnectBank id={userData?.id} successCallBack={getAccount} />
      </CardActions>
    </Card>
  )
}

export default Bank