'use client'

import { ethersAdapter, projectId, networks, metadata } from '../config/wallet'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'

// Create the modal
console.log('call createAppKit')
export const modal = createAppKit({
  adapters: [ethersAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

function AppKit({ children }: { children: ReactNode}) {
  return (
    <>{children}</>
  )
}

export default AppKit