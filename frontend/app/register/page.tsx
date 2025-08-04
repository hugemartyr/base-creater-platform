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
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-2xl font-bold">Register as a Creator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Profile Image URL</Label>
          <Input
            placeholder="https://example.com/profile.jpg"
            value={profileURI}
            onChange={(e) => setProfileURI(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="flex gap-4 pt-4">
        <Button onClick={() => router.push("/creators")}>View Creators</Button>
      </div>

      {txHash && (
        <p className="text-green-600">
          Success! View tx:{" "}
          <a
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            className="underline"
            target="_blank"
          >
            {txHash.slice(0, 10)}...
          </a>
        </p>
      )}
    </div>
  );
}
