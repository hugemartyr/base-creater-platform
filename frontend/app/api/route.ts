
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "wagmi/chains";
import { creatorRegistryAddress, creatorRegistryABI } from "@/lib/creatorRegistry";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  const result = await client.readContract({
    address: creatorRegistryAddress,
    abi: creatorRegistryABI,
    functionName: "getCreator",
    args: [address],
  });

  return NextResponse.json(result);
}
