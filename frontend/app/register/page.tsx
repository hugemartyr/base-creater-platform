"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { creatorRegistryAddress, creatorRegistryABI } from "../../lib/creatorRegistry";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const router = useRouter();

  const [name, setName] = useState("");
  const [profileURI, setProfileURI] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !profileURI || !isConnected) {
      toast.error("Missing name or profile image URL");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-12 animate-fade-in-up relative overflow-hidden">
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
        {/* Decorative blurred circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-2xl w-full mx-auto text-center mb-10 space-y-4 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Register as a Creator or Cause</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Join the decentralized movement. Register your profile to receive support, donations, and participate in community funding rounds.
        </p>
      </div>
      <div className="w-full max-w-xl mx-auto bg-card border border-border rounded-xl shadow-lg p-8 space-y-6 animate-fade-in-up relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Your Name or Project"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="text-left space-y-2">
            <Label>Profile Image URL</Label>
            <Input
              placeholder="https://example.com/profile.jpg"
              value={profileURI}
              onChange={(e) => setProfileURI(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full text-lg py-3 animate-glow">
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="flex gap-4 pt-2 justify-center">
          <Button variant="outline" onClick={() => router.push("/creators")}>View Creators</Button>
        </div>
        {txHash && (
          <p className="text-green-600 text-center">
            Success! View tx:{" "}
            <a
              href={`https://sepolia.basescan.org/tx/${txHash}`}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {txHash.slice(0, 10)}...
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
