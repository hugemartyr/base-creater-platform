"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import CreatorRegistryABI from "../../lib/abis/CreatorRegistry.json";
import { uploadToPinata } from "@/utils/ipfs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { config } from '../../lib/config';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const CONTRACT_ADDRESS = "0xYourDeployedAddress"; // Replace with your address
const queryClient = new QueryClient()

export default function RegisterPage() {
//   const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file || !name) {
      toast.error("Missing name or profile image");
      return;
    }

    try {
      toast("Uploading to IPFS...");
      const ipfsURI = await uploadToPinata(name, bio, file);

      toast("Registering on chain...");
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CreatorRegistryABI,
        functionName: "registerCreator",
        args: [name, ipfsURI],
      });

      toast.success("Creator registered!");
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };



return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>

             <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Register as Creator</h1>

      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Bio</Label>
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>

      <div>
        <Label>Profile Image</Label>
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>

      <Button disabled={isPending} onClick={handleSubmit}>
        {isPending ? "Registering..." : "Register"}
      </Button>
    </div>
            

           </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
);
}

