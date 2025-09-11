import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, usePlaidLink } from 'react-plaid-link';
import { Button } from '@mui/material';
import { API_BASE_URL } from '@/app/constants';

interface Props {
  id: string | undefined
  successCallBack: (status: boolean) => void 
}

const ConnectBank = ({ id, successCallBack }: Props) => {

  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    async function createLinkToken() {
      try {
        const res = await fetch(`${API_BASE_URL}/plaid/createLinkToken`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id
          })
        });

        const data = await res.json();
        setLinkToken(data.results.link_token);
      } catch (error) {
        console.error("Error creating link token:", error);
      }
    }

    if (id) {
      createLinkToken();
    }
  }, [id]);
  
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (publicToken) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    // console.log(publicToken, metadata);

    try {
      const res = await fetch(`${API_BASE_URL}/plaid/exchangePublicToken`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_token: publicToken,
          id: id
        })
      });

      const data = await res.json();
      console.log('res data', data)

      if (data.error) {
        alert(data.error)
      } else {
        successCallBack(true)
      }
    } catch (error) {
      console.error("Error get accounts:", error);
    }
  }, [id, successCallBack]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess
  });

  return (
    <div>
      <Button variant='contained' onClick={() => open()} disabled={!ready || !linkToken}>
        Add Bank Account
      </Button>
    </div>
  )
}

export default ConnectBank