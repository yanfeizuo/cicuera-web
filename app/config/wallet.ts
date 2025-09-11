import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum, meter, bsc, berachain } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, meter, arbitrum, bsc, berachain ] as [AppKitNetwork, ...AppKitNetwork[]]

export const ethersAdapter = new EthersAdapter();

// Set up metadata
export const metadata = {
  name: "Cicuera",
  description: "Cicuera",
  url: "", // origin must match your domain & subdomain
  icons: [""],
};
