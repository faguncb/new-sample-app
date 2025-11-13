import { NexusSDK, NEXUS_EVENTS } from '@avail-project/nexus-core';
import { logToUI } from '../../utils/app-utils';

export function setupEventsFeature(sdk: NexusSDK) {
    const eventsOutput = document.getElementById('events-output') as HTMLParagraphElement;

    // Account/Chain change events
    sdk.onAccountChanged((account) => {
        logToUI(`Account changed: ${account}`);
        eventsOutput.textContent += `\nAccount: ${account}`;
    });
    sdk.onChainChanged((chainId) => {
        logToUI(`Chain changed: ${chainId}`);
        eventsOutput.textContent += `\nChain: ${chainId}`;
    });

    // Progress events example (for bridge/execute)
    sdk.nexusEvents.on(NEXUS_EVENTS.EXPECTED_STEPS, (steps) => {
        logToUI(`Expected steps: ${steps.map((s: any) => s.typeID).join(', ')}`);
    });
    sdk.nexusEvents.on(NEXUS_EVENTS.STEP_COMPLETE, (step: any) => {
        logToUI(`Step complete: ${step.typeID} - Hash: ${step.data?.transactionHash}`);
    });

    // Provider request example
    const providerRequestBtn = document.getElementById('provider-request') as HTMLButtonElement;
    providerRequestBtn.addEventListener('click', async () => {
        try {
            const provider = sdk.getEVMProviderWithCA();
            const result = await provider.request({ method: 'eth_accounts', params: [] });
            logToUI(`Provider accounts: ${result}`);
        } catch (error) {
            logToUI(`Provider error: ${error}`);
        }
    });

    // Utils test
    const utilsTestBtn = document.getElementById('test-utils') as HTMLButtonElement;
    utilsTestBtn.addEventListener('click', () => {
        const addr = '0x742d35Cc6634C0532925a3b8D4C9db96c4b4Db45';
        logToUI(`Valid addr: ${sdk.utils.isValidAddress(addr)}`);
        logToUI(`Truncated: ${sdk.utils.truncateAddress(addr)}`);
        logToUI(`Supported chains: ${sdk.utils.getSupportedChains().length}`);
        logToUI(`Swap supported: ${JSON.stringify(sdk.utils.getSwapSupportedChainsAndTokens())}`);
    });
}