import { NexusSDK, NexusNetwork } from '@avail-project/nexus-core';

export async function initNexusProvider(network: 'mainnet' | 'testnet'): Promise<NexusSDK> {
    const sdk = new NexusSDK({ network: network as NexusNetwork });
    if (!window.ethereum) throw new Error('Provider required');
    await sdk.initialize(window.ethereum);
    return sdk;
}