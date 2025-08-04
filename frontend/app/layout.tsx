// app/layout.tsx
'use client';
import { ThemeProvider } from "@/lib/theme-provider"

import './globals.css';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from '../lib/config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          
           </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
      </body>
    </html>
  );
}


// 'use client';

// import './globals.css';
// import { WagmiConfig } from 'wagmi';
// import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
// import { Chain } from 'wagmi/chains';
// import { baseSepolia } from 'wagmi/chains';
// import { WalletProvider } from '@/context/WalletContext';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
        
//           <RainbowKitProvider>
//             <WalletProvider>
//               {children}
//             </WalletProvider>
//           </RainbowKitProvider>
        
//       </body>
//     </html>
//   );
// }
