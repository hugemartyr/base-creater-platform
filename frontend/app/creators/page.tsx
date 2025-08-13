'use client';

import { useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { config } from '@/lib/config';
import { creatorRegistryABI, creatorRegistryAddress } from '@/lib/creatorRegistry';
import { baseSepolia } from 'wagmi/chains';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface Creator {
  name: string;
  profileURI: string;
  description: string;
  category: string;
  supporters: number;
  address: string;
}

// Dummy creators data for prototyping
const dummyCreators: Creator[] = [
  {
    name: "Sarah Chen",
    profileURI: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    description: "Digital artist creating NFT collections that support environmental causes",
    category: "Digital Art",
    supporters: 1247,
    address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  },
  {
    name: "Marcus Rodriguez",
    profileURI: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    description: "Community organizer working on urban farming initiatives",
    category: "Community",
    supporters: 892,
    address: "0x8ba1f109551bD432803012645Hac136c772c3e3"
  },
  {
    name: "Aisha Patel",
    profileURI: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    description: "Tech educator teaching coding to underprivileged youth",
    category: "Education",
    supporters: 2156,
    address: "0x147B8eb97fD247D06C4006D269c90C1908Fb5D54"
  },
  {
    name: "David Kim",
    profileURI: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description: "Musician creating soundtracks for indie games",
    category: "Music",
    supporters: 673,
    address: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"
  },
  {
    name: "Elena Popov",
    profileURI: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    description: "Documentary filmmaker focusing on social justice issues",
    category: "Film",
    supporters: 1892,
    address: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
  },
  {
    name: "James Wilson",
    profileURI: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    description: "Open source developer building tools for decentralized governance",
    category: "Technology",
    supporters: 3421,
    address: "0x617F2E2fD72FD9D22903125C5Cd3ee07df362F5a"
  }
];

export default function CreatorsPage() {
  const [creatorAddresses, setCreatorAddresses] = useState<string[]>([]);
  const [creators, setCreators] = useState<Creator[]>(dummyCreators);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  // Get unique categories for filter dropdown
  const categories = ['all', ...Array.from(new Set(dummyCreators.map(creator => creator.category)))];

  // Filter creators based on search term and category
  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    async function fetchCreatorAddresses() {
      try {
        const addresses = await readContract(config, {
          address: creatorRegistryAddress,
          abi: creatorRegistryABI,
          functionName: 'getAllCreators',
          chainId: baseSepolia.id,
        });

        if (Array.isArray(addresses)) {
          setCreatorAddresses(addresses as string[]);
          // For now, we'll use dummy data. In production, you'd fetch real creator data here
        }
      } catch (error) {
        console.error('Error fetching creator addresses:', error);
      }
    }

    fetchCreatorAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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
                Discover <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Creators & Causes</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
                Explore and support creators, community workers, and social causes. Your donations and votes help shape the future of the community through transparent, onchain governance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
              <Button 
                size="lg" 
                onClick={() => router.push('/register')}
                className="text-lg px-8 py-3 animate-glow"
              >
                Register as Creator or Cause
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/creators')}
                className="text-lg px-8 py-3"
              >
                View All Creators
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

      {/* Creators Section */}
      <section className="py-20 relative">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Featured Creators & Causes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Support these amazing creators and causes making a difference in our community
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search creators by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Count and Clear Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCreators.length} of {creators.length} creators
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-primary hover:text-primary/80"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreators.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="space-y-4">
                  <svg
                    className="mx-auto w-16 h-16 text-muted-foreground/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-muted-foreground">No creators found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or category filter
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              filteredCreators.map((creator, index) => (
                <div 
                  key={index} 
                  className="bg-card border border-border rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Creator Image */}
                    <div className="relative">
                      <img
                        src={creator.profileURI}
                        alt={creator.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-lg group-hover:border-primary/40 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face';
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                        {creator.category}
                      </div>
                    </div>
                    
                    {/* Creator Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{creator.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {creator.description}
                      </p>
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <span className="text-primary font-medium">
                          {creator.supporters.toLocaleString()} supporters
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1 text-sm"
                        onClick={() => {
                          // In production, this would navigate to creator's profile
                          console.log(`Viewing ${creator.name}'s profile`);
                        }}
                      >
                        View Profile
                      </Button>
                      <Button 
                        className="flex-1 text-sm animate-glow"
                        onClick={() => {
                          // In production, this would open donation modal
                          console.log(`Supporting ${creator.name}`);
                        }}
                      >
                        Support
                      </Button>
                    </div>
                    
                    {/* Address */}
                    <p className="text-xs text-muted-foreground font-mono break-all">
                      {creator.address.slice(0, 6)}...{creator.address.slice(-4)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3"
              onClick={() => {
                // In production, this would load more creators
                console.log('Loading more creators...');
              }}
            >
              Load More Creators
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

