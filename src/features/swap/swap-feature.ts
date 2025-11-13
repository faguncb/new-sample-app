import { NexusSDK, ExactInSwapInput, ExactOutSwapInput } from '@avail-project/nexus-core';
import { parseUnits } from 'viem';
import { TOKEN_METADATA } from '../../types/nexus-types';
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupSwapFeature(sdk: NexusSDK) {
    const swapExactInBtn = document.getElementById('swap-exact-in') as HTMLButtonElement;
    const swapExactOutBtn = document.getElementById('swap-exact-out') as HTMLButtonElement;
    const fromChainSelect = document.getElementById('swap-from-chain') as HTMLSelectElement;
    const fromAmountInput = document.getElementById('swap-from-amount') as HTMLInputElement;
    const toChainSelect = document.getElementById('swap-to-chain') as HTMLSelectElement;
    const tokenSelect = document.getElementById('swap-token') as HTMLSelectElement;
    const output = document.getElementById('swap-output') as HTMLParagraphElement;

    // Mock intent hook (in real app, confirm with user)
    const swapIntentHook = async ({ intent, allow, deny }: any) => {
        // Simulate user confirmation
        setTimeout(() => allow(), 1000);
        logToUI('Intent allowed (simulated).');
    };

    const performSwapExactIn = async () => {
        const token = tokenSelect.value as 'USDC';
        const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC mainnet (mock)
        const swapInput: ExactInSwapInput = {
            from: [{
                chainId: parseInt(fromChainSelect.value),
                amount: parseUnits(fromAmountInput.value, TOKEN_METADATA[token].decimals),
                tokenAddress: tokenAddress as `0x${string}`,
            }],
            toChainId: parseInt(toChainSelect.value),
            toTokenAddress: tokenAddress as `0x${string}`,
        };
        try {
            const result = await sdk.swapWithExactIn(swapInput, { swapIntentHook });
            logToUI(`Swap Exact In TX: ${result.explorerUrl || 'Pending'}`);
            updateOutput(output, JSON.stringify(result, null, 2));
        } catch (error) {
            logToUI(`Swap error: ${error}`);
        }
    };

    const performSwapExactOut = async () => {
        const token = tokenSelect.value as 'USDC';
        const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
        const swapInput: ExactOutSwapInput = {
            toChainId: parseInt(toChainSelect.value),
            toTokenAddress: tokenAddress as `0x${string}`,
            toAmount: parseUnits('100', TOKEN_METADATA[token].decimals), // 100 USDC out
        };
        try {
            const result = await sdk.swapWithExactOut(swapInput, { swapIntentHook });
            logToUI(`Swap Exact Out TX: ${result.explorerUrl || 'Pending'}`);
            updateOutput(output, JSON.stringify(result, null, 2));
        } catch (error) {
            logToUI(`Swap error: ${error}`);
        }
    };

    swapExactInBtn.addEventListener('click', performSwapExactIn);
    swapExactOutBtn.addEventListener('click', performSwapExactOut);

    // Log swap progress events
    const unsubscribe = sdk.nexusEvents.on('SWAP_STEPS', (step: any) => {
        if (step.type === 'SWAP_COMPLETE') logToUI('Swap completed!');
        else if (step.explorerURL) logToUI(`Step: ${step.type} - ${step.explorerURL}`);
    });
    // Don't forget to unsubscribe on cleanup in main.ts if needed
}