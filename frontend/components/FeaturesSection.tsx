'use client';

import { 
  Users, 
  Shield, 
  Globe, 
  Zap, 
  Heart, 
  TrendingUp,
  Vote,
  Gift,
  HandCoins
} from 'lucide-react';

const features = [
  {
    icon: HandCoins,
    title: "Stream & Donate",
    description: "Support creators, community workers, and causes with streaming or one-time donations."
  },
  {
    icon: Gift,
    title: "Donation Drives",
    description: "Participate in periodic donation drives and help grow the prize pool for impactful projects."
  },
  {
    icon: Vote,
    title: "Quadratic Voting",
    description: "Prize pools are allocated using onchain quadratic voting, rewarding the most community-supported initiatives."
  },
  {
    icon: Shield,
    title: "Onchain Transparency",
    description: "All donations, votes, and rewards are transparent and verifiable on Base."
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "The community decides which projects and creators receive the most support."
  },
  {
    icon: Zap,
    title: "Creator Tools",
    description: "Access powerful tools to grow your audience, manage donations, and engage supporters."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30 animate-fade-in-up">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Join Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience community-powered funding, transparent rewards, and next-gen creator tools — all on Base.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 bg-background rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:animate-glow-card animate-fade-in-up"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 