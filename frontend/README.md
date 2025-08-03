This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



:

💎 DecentraFund
A decentralized Patreon-like app built on the Base Sepolia testnet. Users can connect their wallets, support creators with donations, and vote on fund distributions using Quadratic Voting.

🛠️ Tech Stack
Next.js 14 App Router

Wagmi + Viem + RainbowKit for wallet connections

Tailwind CSS + shadcn/ui for UI

Solidity Smart Contracts deployed on Base Sepolia

CI/CD via GitHub Actions

Dev Tools: Prettier, ESLint, Husky, lint-staged

⚙️ Project Setup
1. Clone & Install
bash
Copy
Edit
git clone https://github.com/your-username/DecentraFund.git
cd DecentraFund
npm install
2. Environment Variables
Create a .env.local file:

ini
Copy
Edit
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC=https://base-sepolia.g.alchemy.com/v2/your_key
💻 Frontend
Start Dev Server
bash
Copy
Edit
npm run dev
Build for Production
bash
Copy
Edit
npm run build && npm run start
Format & Lint
bash
Copy
Edit
npm run lint       # ESLint check
npm run format     # Prettier format
🔐 Wallet Setup (Base Sepolia)
Add Base Sepolia to Wallet
Chain ID: 84532

RPC URL: https://sepolia.base.org

Explorer: https://sepolia.basescan.org

Currency: ETH

Get Test ETH
Base Sepolia Faucet:
https://www.alchemy.com/faucets/base-sepolia

⛓️ Smart Contracts
Compile Contracts
bash
Copy
Edit
npx hardhat compile
Deploy to Base Sepolia
bash
Copy
Edit
npx hardhat run scripts/deploy.js --network baseSepolia
Example hardhat.config.js
js
Copy
Edit
networks: {
  baseSepolia: {
    url: process.env.NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC,
    accounts: [process.env.PRIVATE_KEY],
  },
}
Environment for Contracts
ini
Copy
Edit
PRIVATE_KEY=your_private_key
✅ Git Hooks
Pre-commit hook checks formatting/lint before each commit:

bash
Copy
Edit
npm run prepare
🚦 CI: GitHub Actions
Lint & format checks run automatically on push and pull_request to main.

📦 Scripts Summary
Script	Description
dev	Start dev server
build	Build frontend
lint	ESLint check
format	Prettier format
prepare	Setup Husky pre-commit hook
test	Placeholder for test framework
deploy	Deploy contracts via Hardhat

