import { NexusSDK } from '@avail-project/nexus-core';
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupAllowancesFeature(sdk: NexusSDK) {
    const checkBtn = document.getElementById('check-allowances') as HTMLButtonElement;
    const setBtn = document.getElementById('set-allowance') as HTMLButtonElement;
    const revokeBtn = document.getElementById('revoke-allowance') as HTMLButtonElement;
    const chainSelect = document.getElementById('allowance-chain') as HTMLSelectElement;
    const amountInput = document.getElementById('allowance-amount') as HTMLInputElement;
    const output = document.getElementById('allowances-output') as HTMLParagraphElement;

    checkBtn.addEventListener('click', async () => {
        try {
            const allowances = await sdk.getAllowance(parseInt(chainSelect.value), ['USDC', 'USDT']);
            logToUI(`Allowances fetched.`);
            updateOutput(output, JSON.stringify(allowances, null, 2));
        } catch (error) {
            logToUI(`Allowance check error: ${error}`);
        }
    });

    setBtn.addEventListener('click', async () => {
        try {
            await sdk.setAllowance(parseInt(chainSelect.value), ['USDC'], BigInt(amountInput.value));
            logToUI('Allowance set.');
        } catch (error) {
            logToUI(`Set allowance error: ${error}`);
        }
    });

    revokeBtn.addEventListener('click', async () => {
        try {
            await sdk.revokeAllowance(parseInt(chainSelect.value), ['USDC']);
            logToUI('Allowance revoked.');
        } catch (error) {
            logToUI(`Revoke error: ${error}`);
        }
    });

    // Allowance hook example
    sdk.setOnAllowanceHook(({ allow, deny, sources }) => {
        allow(['min']); // Allow minimum required
        logToUI('Allowance hook: Allowed min.');
    });
}