'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ModeToggle } from './themeToggle';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

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
          <Button 
            variant="ghost" 
            onClick={() => router.push('/funding-rounds')}
            className="hidden sm:inline-flex"
          >
            Funding Rounds
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => router.push('/vote')}
            className="hidden sm:inline-flex"
          >
            Vote
          </Button>
          
          {/* Dropdown menu for additional items */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden sm:inline-flex">
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/contributor')}>
                Contributor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/about')}>
                About
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ConnectButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
} 