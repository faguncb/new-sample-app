// Re-export core types for convenience
export type { BridgeParams, BridgeResult, TransferParams, TransferResult, ExecuteParams, ExecuteResult, /* ... all other types from doc */ } from '@avail-project/nexus-core';

// Mock constants from doc
export const TOKEN_METADATA = {
    USDC: { decimals: 6, symbol: 'USDC' },
    USDT: { decimals: 6, symbol: 'USDT' },
    ETH: { decimals: 18, symbol: 'ETH' },
} as const;

export type SUPPORTED_TOKENS = keyof typeof TOKEN_METADATA;

export const TOKEN_CONTRACT_ADDRESSES = {
    USDC: {
        1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        // Add for all chains...
    },
    // ...
} as const;

export const DESTINATION_SWAP_TOKENS = new Map([
    [10, ['USDC', 'USDT']], // Optimism
    [42161, ['USDC', 'ETH']], // Arbitrum
    // ...
]);