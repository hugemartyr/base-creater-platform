'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 animate-fade-in-up">
      {/* Animated techy grid background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-20" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
        </svg>
      </div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight animate-fade-in-down">
              Decentralized Support for <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Creators & Causes</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
              Empower creators, community workers, and social causes on Base. Stream or donate directly, join periodic donation drives, and help allocate prize pools through onchain quadratic voting. <br />
              <span className="font-semibold">on Base, with powerful creator tools.</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button 
              size="lg" 
              onClick={() => router.push('/register')}
              className="text-lg px-8 py-3 animate-glow"
            >
              Join as Creator or Cause
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('/creators')}
              className="text-lg px-8 py-3"
            >
              Explore & Support
            </Button>
          </div>
          <div className="pt-8 animate-fade-in-up">
            <p className="text-sm text-muted-foreground">
              Community-powered funding. Transparent, fair, and onchain.
            </p>
          </div>
        </div>
      </div>
      {/* Decorative blurred circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
