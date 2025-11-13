import { NexusSDK, TransferParams } from '@avail-project/nexus-core';
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupTransferFeature(sdk: NexusSDK) {
    const transferBtn = document.getElementById('transfer-btn') as HTMLButtonElement;
    const simulateTransferBtn = document.getElementById('simulate-transfer') as HTMLButtonElement;
    const recipientInput = document.getElementById('transfer-recipient') as HTMLInputElement;
    const amountInput = document.getElementById('transfer-amount') as HTMLInputElement;
    const chainSelect = document.getElementById('transfer-chain') as HTMLSelectElement;
    const output = document.getElementById('transfer-output') as HTMLParagraphElement;

    const performTransfer = async (simulate = false) => {
        const params: TransferParams = {
            token: 'USDC',
            amount: parseFloat(amountInput.value),
            chainId: parseInt(chainSelect.value),
            recipient: recipientInput.value as `0x${string}`,
            sourceChains: [8453], // Base
        };
        try {
            const result = simulate
                ? await sdk.simulateTransfer(params)
                : await sdk.transfer(params);
            if (result.success && result.explorerUrl) {
                logToUI(`Transfer ${simulate ? 'simulated' : 'TX'}: ${result.explorerUrl}`);
            } else {
                logToUI(`Error: ${result.error}`);
            }
            updateOutput(output, JSON.stringify(result, null, 2));
        } catch (error) {
            logToUI(`Transfer error: ${error}`);
        }
    };

    transferBtn.addEventListener('click', () => performTransfer(false));
    simulateTransferBtn.addEventListener('click', () => performTransfer(true));
}