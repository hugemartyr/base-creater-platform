// "use client";

// import { useEffect, useState } from "react";
// import { useReadContract } from "wagmi";
// import { creatorRegistryAddress, creatorRegistryABI } from "@/lib/creatorRegistry";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// interface Creator {
//   name: string;
//   profileURI: string;
//   registered: boolean;
// }

// export default function CreatorsPage() {
//   const [creators, setCreators] = useState<{ address: string; data: Creator }[]>([]);

//   const { data: creatorAddresses } = useReadContract({
//     abi: creatorRegistryABI,
//     address: creatorRegistryAddress,
//     functionName: "getAllCreators",
//   });

//   useEffect(() => {
//     async function fetchCreators() {
//       if (!creatorAddresses || !Array.isArray(creatorAddresses)) return;

//       const creatorData = await Promise.all(
//         creatorAddresses.map(async (addr: string) => {
//           const res = await fetchCreator(addr);
//           return { address: addr, data: res };
//         })
//       );

//       setCreators(creatorData);
//     }

//     fetchCreators();
//   }, [creatorAddresses]);

//   async function fetchCreator(address: string): Promise<Creator> {
//     const res = await fetch("/api/creator", {
//       method: "POST",
//       body: JSON.stringify({ address }),
//       headers: { "Content-Type": "application/json" },
//     });
//     return await res.json();
//   }

//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-background py-12 animate-fade-in-up">
//       <div className="max-w-2xl w-full mx-auto text-center mb-10 space-y-4">
//         <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Discover Creators & Causes</h1>
//         <p className="text-lg text-muted-foreground max-w-xl mx-auto">
//           Explore and support creators, community workers, and social causes. Your donations and votes help shape the future of the community.
//         </p>
//         <Button className="mt-2 animate-glow" onClick={() => router.push('/register')}>Register as Creator or Cause</Button>
//       </div>
//       <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {creators.length === 0 ? (
//           <div className="col-span-full text-center text-muted-foreground text-lg">No creators found.</div>
//         ) : (
//           creators.map(({ address, data }, i) => (
//             <div key={i} className="bg-card border border-border rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
//               <img
//                 src={data.profileURI || '/public/globe.svg'}
//                 alt={data.name}
//                 className="w-20 h-20 rounded-full object-cover border border-primary mb-2 bg-muted"
//                 onError={(e) => (e.currentTarget.src = '/public/globe.svg')}
//               />
//               <h2 className="text-xl font-semibold text-center">{data.name}</h2>
//               <p className="text-xs break-all text-muted-foreground text-center">{address}</p>
//               <a
//                 href={data.profileURI}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-primary underline text-sm"
//               >
//                 View Profile
//               </a>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

import { creatorRegistryAddress, creatorRegistryABI } from '@/lib/creatorRegistry';

// import { config } from '@/lib/wagmi';

const publicClient = getPublicClient(config);

interface Creator {
  address: string;
  name: string;
  profileURI: string;
  registered: boolean;
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    async function loadCreators() {
      try {
        const addresses: `0x${string}`[] = await publicClient.readContract({
          address: creatorRegistryAddress,
          abi: creatorRegistryABI,
          functionName: 'getAllCreators',
        });

        console.log("Fetched creator addresses:", addresses);

        const data = await Promise.all(
          addresses.map(async (addr) => {
            const [name, profileURI, registered] = await publicClient.readContract({
              address: creatorRegistryAddress,
              abi: creatorRegistryABI,
              functionName: 'getCreator',
              args: [addr],
            });

            console.log("Fetched creator:", { addr, name, profileURI, registered });

            return {
              address: addr,
              name,
              profileURI,
              registered,
            };
          })
        );

        setCreators(data.filter((c) => c.registered));
      } catch (err) {
        console.error('Failed to fetch creators', err);
      }
    }

    loadCreators();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-8 text-center">Registered Creators</h1>
      {creators.length === 0 ? (
        <p className="text-center text-muted-foreground">No creators found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
            >
              <img
                src={creator.profileURI || '/globe.svg'}
                onError={(e) => (e.currentTarget.src = '/globe.svg')}
                alt={creator.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border border-primary"
              />
              <h2 className="font-semibold text-lg">{creator.name}</h2>
              <p className="text-xs text-muted-foreground break-words">{creator.address}</p>
              <a
                href={creator.profileURI}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline mt-2"
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

