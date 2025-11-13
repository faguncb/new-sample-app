import { NexusSDK, BridgeParams } from '@avail-project/nexus-core';
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupBridgeFeature(sdk: NexusSDK) {
    const bridgeBtn = document.getElementById('bridge-btn') as HTMLButtonElement;
    const simulateBridgeBtn = document.getElementById('simulate-bridge') as HTMLButtonElement;
    const amountInput = document.getElementById('bridge-amount') as HTMLInputElement;
    const chainSelect = document.getElementById('bridge-chain') as HTMLSelectElement;
    const output = document.getElementById('bridge-output') as HTMLParagraphElement;

    const performBridge = async (simulate = false) => {
        const params: BridgeParams = {
            token: 'USDC',
            amount: parseFloat(amountInput.value),
            chainId: parseInt(chainSelect.value),
            sourceChains: [10, 42161], // Optimism, Arbitrum
        };
        try {
            const result = simulate
                ? await sdk.simulateBridge(params)
                : await sdk.bridge(params);
            if (result.success && result.explorerUrl) {
                logToUI(`Bridge ${simulate ? 'simulated' : 'TX'}: ${result.explorerUrl}`);
            } else {
                logToUI(`Error: ${result.error}`);
            }
            updateOutput(output, JSON.stringify(result, null, 2));
        } catch (error) {
            if (error.message.includes('User denied')) logToUI('User cancelled.');
            else if (error.message.includes('Insufficient')) logToUI('Insufficient balance.');
            else logToUI(`Bridge error: ${error}`);
        }
    };

    bridgeBtn.addEventListener('click', () => performBridge(false));
    simulateBridgeBtn.addEventListener('click', () => performBridge(true));
}