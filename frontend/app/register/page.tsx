"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { creatorRegistryAddress, creatorRegistryABI } from "../../lib/creatorRegistry";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const router = useRouter();

  const [name, setName] = useState("");
  const [profileURI, setProfileURI] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  });
  const [txHash, setTxHash] = useState("");

  const categories = [
    "Digital Art",
    "Community",
    "Education", 
    "Music",
    "Film",
    "Technology",
    "Environment",
    "Health",
    "Social Justice",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !profileURI || !description || !category || !isConnected) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      toast("Registering on-chain...");
      writeContract(
        {
          abi: creatorRegistryABI,
          address: creatorRegistryAddress,
          functionName: "registerCreator",
          args: [name, profileURI],
        },
        {
          onSuccess(txHash) {
            setTxHash(txHash);
            toast.success("Successfully registered!");
          },
          onError(error) {
            console.error("Registration failed:", error);
            toast.error(`Registration failed: ${error.message}`);
          },
        }
      );
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <Navigation />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Side - Graphic */}
            <div className="relative z-10 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight animate-fade-in-down">
                  Join the <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Creator Revolution</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                  Register as a creator or cause on Base. Connect with supporters, receive donations, and participate in community funding rounds through transparent, onchain governance.
                </p>
              </div>
              
              {/* Animated Graphic - Interconnected User Bubbles */}
              <div className="relative w-full h-64 lg:h-80 animate-fade-in-up overflow-hidden">
                {/* Background bubbles - varying sizes and positions */}
                <div className="absolute top-4 left-8 w-16 h-16 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-12 right-12 w-12 h-12 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-24 left-20 w-20 h-20 bg-accent/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-32 right-24 w-14 h-14 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-40 left-4 w-10 h-10 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                <div className="absolute top-16 left-32 w-18 h-18 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute top-28 right-8 w-16 h-16 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-36 left-16 w-12 h-12 bg-secondary/25 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                
                {/* Middle section bubbles */}
                <div className="absolute top-48 left-8 w-20 h-20 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-56 right-16 w-14 h-14 bg-secondary/35 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                <div className="absolute top-64 left-28 w-16 h-16 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1.1s' }}></div>
                <div className="absolute top-72 right-4 w-12 h-12 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1.4s' }}></div>
                
                {/* Bottom section bubbles */}
                <div className="absolute bottom-8 left-12 w-18 h-18 bg-secondary/25 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute bottom-16 right-8 w-20 h-20 bg-primary/35 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                <div className="absolute bottom-24 left-24 w-14 h-14 bg-accent/25 rounded-full animate-pulse" style={{ animationDelay: '1.3s' }}></div>
                <div className="absolute bottom-32 right-20 w-16 h-16 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '1.6s' }}></div>
                <div className="absolute bottom-40 left-4 w-12 h-12 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                
                {/* Additional smaller bubbles for density */}
                <div className="absolute top-8 right-32 w-8 h-8 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="absolute top-20 left-40 w-6 h-6 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute top-44 right-28 w-10 h-10 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-60 left-12 w-8 h-8 bg-accent/15 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute top-76 right-12 w-6 h-6 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Connection lines between bubbles */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
                  <defs>
                    <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {/* Connection lines between various bubble positions */}
                  <line x1="80" y1="40" x2="120" y2="60" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="120" y1="60" x2="160" y2="80" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="160" y1="80" x2="200" y2="100" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="200" y1="100" x2="240" y2="120" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="240" y1="120" x2="280" y2="140" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="280" y1="140" x2="320" y2="160" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  
                  <line x1="40" y1="80" x2="80" y2="100" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="80" y1="100" x2="120" y2="120" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="120" y1="120" x2="160" y2="140" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="160" y1="140" x2="200" y2="160" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  
                  <line x1="60" y1="160" x2="100" y2="180" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="180" x2="140" y2="200" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="140" y1="200" x2="180" y2="220" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="180" y1="220" x2="220" y2="240" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  
                  <line x1="80" y1="240" x2="120" y2="260" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="120" y1="260" x2="160" y2="280" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  <line x1="160" y1="280" x2="200" y2="300" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.3" />
                  
                  {/* Diagonal connections */}
                  <line x1="40" y1="40" x2="80" y2="80" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                  <line x1="80" y1="80" x2="120" y2="120" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                  <line x1="120" y1="120" x2="160" y2="160" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                  <line x1="160" y1="160" x2="200" y2="200" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                  
                  <line x1="200" y1="80" x2="240" y2="120" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                  <line x1="240" y1="120" x2="280" y2="160" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                  <line x1="280" y1="160" x2="320" y2="200" stroke="url(#bubbleGradient)" strokeWidth="1" opacity="0.2" />
                </svg>
                
                {/* Central larger user bubble */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-2xl animate-pulse z-10">
                  <svg className="w-16 h-16 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative z-10">
              <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 lg:p-12 space-y-8 animate-fade-in-up">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Create Your Creator Profile</h2>
                  <p className="text-muted-foreground">
                    Build a comprehensive profile to showcase your work and connect with supporters
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Creator/Cause Name *</Label>
                      <Input
                        placeholder="Your Name or Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Profile Image URL *</Label>
                      <Input
                        placeholder="https://example.com/profile.jpg"
                        value={profileURI}
                        onChange={(e) => setProfileURI(e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Category *</Label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 cursor-pointer"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description *</Label>
                    <Textarea
                      placeholder="Tell us about yourself, your project, or your cause. What are you passionate about? What do you want to achieve?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  
                  {/* Website */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Website</Label>
                    <Input
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Social Media Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Twitter</Label>
                        <Input
                          placeholder="https://twitter.com/username"
                          value={socialLinks.twitter}
                          onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Instagram</Label>
                        <Input
                          placeholder="https://instagram.com/username"
                          value={socialLinks.instagram}
                          onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">LinkedIn</Label>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          value={socialLinks.linkedin}
                          onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">YouTube</Label>
                        <Input
                          placeholder="https://youtube.com/@username"
                          value={socialLinks.youtube}
                          onChange={(e) => setSocialLinks({...socialLinks, youtube: e.target.value})}
                          className="h-12 text-base"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isPending} 
                    className="w-full h-12 text-lg font-semibold animate-glow"
                  >
                    {isPending ? "Registering..." : "Create Creator Profile"}
                  </Button>
                </form>
                
                
                
                {txHash && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-700 dark:text-green-300 text-center text-sm">
                      Success! View transaction:{" "}
                      <a
                        href={`https://sepolia.basescan.org/tx/${txHash}`}
                        className="underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {txHash.slice(0, 10)}...
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>
      <Footer />
    </div>
    </div>
  );
}
