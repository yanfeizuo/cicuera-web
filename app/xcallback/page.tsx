'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const XCallBack = () => {

  const searchParams = useSearchParams()
  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (code && state) {
      window.opener.postMessage({ code, state }, window.location.origin);
    }

    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>X Loading</h2>
    </div>
  )
}

export default XCallBack