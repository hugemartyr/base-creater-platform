'use client';

import { Rocket, Link2, Wallet, CheckCircle, Vote, Gift, HandCoins } from 'lucide-react';

const steps = [
  {
    icon: Rocket,
    title: 'Sign Up or Explore',
    description: 'Register as a creator, cause, or supporter — or start exploring campaigns.'
  },
  {
    icon: HandCoins,
    title: 'Donate or Stream',
    description: 'Support your favorite creators and causes with one-time or streaming donations.'
  },
  {
    icon: Gift,
    title: 'Join Donation Drives',
    description: 'Participate in periodic donation drives to grow the prize pool.'
  },
  {
    icon: Vote,
    title: 'Vote & Allocate',
    description: 'Use quadratic voting to help decide how the prize pool is distributed.'
  },
  {
    icon: CheckCircle,
    title: 'See Your Impact',
    description: 'Track transparent, onchain results and community impact.'
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-background animate-fade-in-up">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Support, donate, vote, and see your impact — all on a transparent, community-powered platform.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-0">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center md:w-1/5 px-4 animate-fade-in-up self-stretch">
              <div className="flex flex-col items-center flex-1">
                <div className="p-4 bg-primary/10 rounded-full mb-4 animate-glow-card">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-center">{step.description}</p>
              </div>
              {/* Connector line except after last step */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block h-1 w-12 bg-primary/20 rounded-full mx-auto"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}