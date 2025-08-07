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
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BenefitsSection from '@/components/BenefitsSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HowItWorksSection from '@/components/HowItWorksSection';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex flex-col">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
}
