import { NexusSDK } from '@avail-project/nexus-core';
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupIntentsFeature(sdk: NexusSDK) {
    const getIntentsBtn = document.getElementById('get-intents') as HTMLButtonElement;
    const output = document.getElementById('intents-output') as HTMLParagraphElement;

    getIntentsBtn.addEventListener('click', async () => {
        try {
            const intents = await sdk.getMyIntents(1); // Chain 1
            logToUI(`Fetched ${intents.length} intents.`);
            updateOutput(output, JSON.stringify(intents, null, 2));
        } catch (error) {
            logToUI(`Intents error: ${error}`);
        }
    });

    // Intent hook
    sdk.setOnIntentHook(({ intent, allow, deny, refresh }) => {
        // Simulate allow
        allow();
        logToUI('Intent hook: Allowed.');
    });
}