import { NexusSDK } from '@avail-project/nexus-core';
import { initNexusProvider } from './providers/nexus-provider';
import { setupBalancesFeature } from './features/balances/balances-feature';
import { setupBridgeFeature } from './features/bridge/bridge-feature';
import { setupTransferFeature } from './features/transfer/transfer-feature';
import { setupExecuteFeature } from './features/execute/execute-feature';
import { setupSwapFeature } from './features/swap/swap-feature';
import { setupAllowancesFeature } from './features/allowances/allowances-feature';
import { setupIntentsFeature } from './features/intents/intents-feature';
import { setupEventsFeature } from './features/events/events-feature';
import { logToUI } from './utils/app-utils';

let sdk: NexusSDK | null = null;

const connectBtn = document.getElementById('connect-btn') as HTMLButtonElement;
const networkSelect = document.getElementById('network-select') as HTMLSelectElement;
const accountInfo = document.getElementById('account-info') as HTMLParagraphElement;

connectBtn.addEventListener('click', async () => {
    if (!window.ethereum) {
        logToUI('MetaMask not detected!');
        return;
    }
    try {
        const network = networkSelect.value as 'mainnet' | 'testnet';
        sdk = await initNexusProvider(network);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        accountInfo.textContent = `Connected: ${accounts[0]}`;
        logToUI('SDK initialized successfully!');

        // Setup all features
        setupBalancesFeature(sdk);
        setupBridgeFeature(sdk);
        setupTransferFeature(sdk);
        setupExecuteFeature(sdk);
        setupSwapFeature(sdk);
        setupAllowancesFeature(sdk);
        setupIntentsFeature(sdk);
        setupEventsFeature(sdk);
    } catch (error) {
        logToUI(`Connection error: ${error}`);
    }
});

const cleanupBtn = document.getElementById('cleanup-btn') as HTMLButtonElement;
cleanupBtn.addEventListener('click', () => {
    if (sdk) {
        sdk.removeAllListeners();
        sdk.deinit();
        logToUI('SDK cleaned up.');
    }
});