# Nexus Core Sample App

A comprehensive browser-based dashboard demonstrating **every feature** of the [@avail-project/nexus-core](https://www.npmjs.com/package/@avail-project/nexus-core) TypeScript SDK for cross-chain operations.

## Features Implemented
- **Initialization & Provider**: Connect MetaMask, mainnet/testnet toggle.
- **Balances**: Unified balances across chains; specific token queries (e.g., USDC).
- **Bridging**: Bridge tokens (e.g., USDC to Polygon/Arbitrum) with simulation and optimizations (skip if local funds sufficient).
- **Transfers**: Direct/smart transfers with fallbacks to chain abstraction.
- **Execution**: Smart contract calls (e.g., Aave supply); bridge-and-execute; simulations; allowance handling.
- **Swaps**: Exact-in/out cross-chain swaps with intent hooks and progress events.
- **Allowances**: Check, set, revoke; hooks for auto-approval.
- **Intents**: Fetch user intents; intent hooks.
- **Events**: Account/chain changes; progress steps (e.g., SWAP_STEPS, BRIDGE_EXECUTE_COMPLETED_STEPS).
- **Utilities**: Address validation, formatting, metadata, supported chains/tokens.
- **Provider**: Custom EVM provider with CA; RPC requests.
- **Optimizations**: Automatic bridge skip, direct transfers if local funds available.
- **Error Handling**: User denied, insufficient funds, unsupported chain/token.
- **Cleanup**: Remove listeners, deinit SDK.

## Supported Networks & Tokens
- **Mainnet**: Ethereum (1), Optimism (10), Polygon (137), Arbitrum (42161), Avalanche (43114), Base (8453), Scroll (534352), Sophon (50104), Kaia (8217), BNB (56), HyperEVM (999).
- **Testnet**: Optimism Sepolia (11155420), Polygon Amoy (80002), Arbitrum Sepolia (421614), Base Sepolia (84532), Sepolia (11155111), Monad Testnet (10143).
- **Tokens**: ETH (18 decimals), USDC/USDT (6 decimals) on all supported chains.

## Quick Start
1. Clone or create the project structure as above.
2. Install dependencies: `npm install`.
3. Run dev server: `npm run dev`.
4. Open `http://localhost:5173`.
5. Connect MetaMask (approve connections).
6. Select network (mainnet/testnet).
7. Interact with buttons:
    - **Balances**: View portfolio overview.
    - **Bridge/Transfer**: Send tokens cross-chain (use testnet for safety).
    - **Execute/Swap**: Perform DeFi actions (mock ABIs; replace with real).
    - **Allowances/Intents**: Manage permissions.
    - **Events/Utils**: Monitor changes and test helpers.
8. Check console/UI logs and explorer links for TXs.
9. Cleanup on exit: Click "Cleanup" button.

## Configuration
- Edit `src/types/nexus-types.ts` for custom token addresses/ABIs.
- For CLI/backend: Adapt `main.ts` to use `ethers` provider instead of `window.ethereum`.
- Testnet: Use faucet for funds (e.g., Base Sepolia USDC).

## Error Handling Examples
- User denied: `if (error.message.includes('User denied')) { ... }`
- Insufficient: `if (error.message.includes('Insufficient')) { ... }`
- Unsupported: `if (error.message.includes('Unsupported')) { ... }`

## Advanced Usage
- **Portfolio Overview**:
  ```ts
  const balances = await sdk.getUnifiedBalances();
  balances.forEach(asset => {
    console.log(`${asset.symbol}: $${asset.balanceInFiat} (Breakdown: ${asset.breakdown?.map(b => `${b.chain.name}: ${b.balance}`).join(', ')})`);
  });