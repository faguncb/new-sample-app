import { NexusSDK } from '@avail-project/nexus-core';
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupBalancesFeature(sdk: NexusSDK) {
    const getBalancesBtn = document.getElementById('get-balances') as HTMLButtonElement;
    const getUsdcBtn = document.getElementById('get-usdc-balance') as HTMLButtonElement;
    const output = document.getElementById('balances-output') as HTMLParagraphElement;

    getBalancesBtn.addEventListener('click', async () => {
        try {
            const balances = await sdk.getUnifiedBalances(false); // CA-applicable only
            logToUI(`Fetched ${balances.length} assets.`);
            updateOutput(output, JSON.stringify(balances, null, 2));
        } catch (error) {
            logToUI(`Balance error: ${error}`);
        }
    });

    getUsdcBtn.addEventListener('click', async () => {
        try {
            const balance = await sdk.getUnifiedBalance('USDC', false);
            logToUI(`USDC Balance: ${balance?.balance || '0'}`);
            updateOutput(output, JSON.stringify(balance, null, 2));
        } catch (error) {
            logToUI(`USDC balance error: ${error}`);
        }
    });
}