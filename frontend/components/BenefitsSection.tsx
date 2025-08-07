'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, 
  UserCheck, 
  Lock, 
  ArrowRight,
  Star,
  Target,
  Vote,
  Gift,
  Users
} from 'lucide-react';

const creatorBenefits = [
  {
    icon: DollarSign,
    title: "Direct & Ongoing Support",
    description: "Receive streaming or one-time donations directly from your community."
  },
  {
    icon: Vote,
    title: "Quadratic Funding",
    description: "Compete for prize pools in donation drives, allocated by quadratic voting."
  },
  {
    icon: Lock,
    title: "Onchain Transparency",
    description: "All donations and rewards are transparent, secure, and verifiable on Base."
  }
];

const supporterBenefits = [
  {
    icon: Star,
    title: "Support What Matters",
    description: "Fund creators, causes, and projects you believe in, with full transparency."
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Your votes and donations help decide which projects receive the most support."
  },
  {
    icon: ArrowRight,
    title: "Transparent Rewards",
    description: "See exactly how your contributions are used and rewarded onchain."
  }
];

export default function BenefitsSection() {
  const router = useRouter();

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Benefits for Creators, Supporters & Causes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a platform where your support, vote, and impact are always visible and rewarded.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Creator Benefits */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">For Creators & Causes</h3>
              <p className="text-muted-foreground">
                Grow your impact, earn transparently, and engage your community like never before.
              </p>
            </div>
            <div className="space-y-6">
              {creatorBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => router.push('/register')}
              className="w-full lg:w-auto"
            >
              Start Your Campaign
            </Button>
          </div>
          {/* Supporter Benefits */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">For Supporters</h3>
              <p className="text-muted-foreground">
                Make a difference by supporting and voting for the projects you care about.
              </p>
            </div>
            <div className="space-y-6">
              {supporterBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline"
              onClick={() => router.push('/creators')}
              className="w-full lg:w-auto"
            >
              Discover & Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 