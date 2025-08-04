"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { creatorRegistryAddress, creatorRegistryABI } from "@/lib/creatorRegistry";
import { useRouter } from "next/navigation";

interface Creator {
  name: string;
  profileURI: string;
  registered: boolean;
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<{ address: string; data: Creator }[]>([]);

  const { data: creatorAddresses } = useReadContract({
    abi: creatorRegistryABI,
    address: creatorRegistryAddress,
    functionName: "getAllCreators",
  });

  useEffect(() => {
    async function fetchCreators() {
      if (!creatorAddresses || !Array.isArray(creatorAddresses)) return;

      const creatorData = await Promise.all(
        creatorAddresses.map(async (addr: string) => {
          const res = await fetchCreator(addr);
          return { address: addr, data: res };
        })
      );

      setCreators(creatorData);
    }

    fetchCreators();
  }, [creatorAddresses]);

  async function fetchCreator(address: string): Promise<Creator> {
    const res = await fetch("/api/creator", {
      method: "POST",
      body: JSON.stringify({ address }),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  }

  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Registered Creators</h1>
      {creators.length === 0 ? (
        <p>No creators found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {creators.map(({ address, data }, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{data.name}</h2>
              <p className="text-sm break-all text-muted">Address: {address}</p>
              <p className="text-sm text-muted">Bio: {data.profileURI}</p>
              <a
                href={data.profileURI}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

