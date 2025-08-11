'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import { OpenLinkProps } from '../types';
import style from './OpenLink.module.css';

export const OpenLink = ({ onSubmit }: OpenLinkProps) => {

  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    async function createLinkToken() {
      try {
        const res = await fetch("http://localhost:8000/api/create_link_token", {
          method: "POST"
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error("Error creating link token:", error);
      }
    }

    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);

    // get status from backend
    onSubmit(true)
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {

  }, [ready])

  return (
    <div className={style.container}>
      <button className={style.btn} onClick={() => open()} disabled={!ready}>
        Connect Bank Account
      </button>
    </div>
  )
}
