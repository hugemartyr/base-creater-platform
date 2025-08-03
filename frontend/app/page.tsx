// app/page.tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from '../lib/config';
const queryClient = new QueryClient()
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ModeToggle } from '@/components/themeToggle';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';  






export default function Home() {
const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center">
       <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
          <ConnectButton />
           <Button onClick={() => router.push("/register")}>
        Register as Creator
      </Button>
        </RainbowKitProvider>
        
      </QueryClientProvider>
    </WagmiProvider>
      <ModeToggle />
    </main>
  );
}
