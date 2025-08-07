'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from './themeToggle';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Climbr</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/creators')}
            className="hidden sm:inline-flex"
          >
            Browse Creators
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => router.push('/register')}
            className="hidden sm:inline-flex"
          >
            Register
          </Button>
          <ConnectButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
} 