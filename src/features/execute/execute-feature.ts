import { NexusSDK, ExecuteParams, BridgeAndExecuteParams } from '@avail-project/nexus-core';
import { parseUnits } from 'viem';
import { TOKEN_METADATA, SUPPORTED_TOKENS } from '../../types/nexus-types'; // Assume imported types
import { logToUI, updateOutput } from '../../utils/app-utils';

export function setupExecuteFeature(sdk: NexusSDK) {
    const executeBtn = document.getElementById('execute-btn') as HTMLButtonElement;
    const simulateExecuteBtn = document.getElementById('simulate-execute') as HTMLButtonElement;
    const bridgeExecuteBtn = document.getElementById('bridge-execute-btn') as HTMLButtonElement;
    const simulateBridgeExecuteBtn = document.getElementById('simulate-bridge-execute') as HTMLButtonElement;
    const output = document.getElementById('execute-output') as HTMLParagraphElement;

    const buildFunctionParams = (
        token: SUPPORTED_TOKENS,
        amount: string,
        chainId: number,
        user: `0x${string}`
    ) => {
        const decimals = TOKEN_METADATA[token].decimals;
        const amountWei = parseUnits(amount, decimals);
        const tokenAddr = TOKEN_CONTRACT_ADDRESSES[token][chainId]; // Assume defined
        return { functionParams: [tokenAddr, amountWei] };
    };

    const executeParams: ExecuteParams = {
        toChainId: 1, // Ethereum
        contractAddress: '0xc3d688B66703497DAA19211EEdff47f25384cdc3' as `0x${string}`, // Sample Aave supply
        contractAbi: [{ name: 'supply', inputs: [{ type: 'address' }, { type: 'uint256' }] }], // Simplified ABI
        functionName: 'supply',
        buildFunctionParams,
        waitForReceipt: true,
        requiredConfirmations: 3,
        tokenApproval: { token: 'USDC', amount: '100000000' }, // 100 USDC
    };

    const performExecute = async (simulate = false, bridge = false) => {
        try {
            let result;
            if (bridge) {
                const bridgeParams: BridgeAndExecuteParams = {
                    token: 'USDC',
                    amount: '100000000',
                    toChainId: 1,
                    sourceChains: [8453],
                    execute: executeParams,
                    waitForReceipt: true,
                };
                result = simulate
                    ? await sdk.simulateBridgeAndExecute(bridgeParams)
                    : await sdk.bridgeAndExecute(bridgeParams);
            } else {
                result = simulate
                    ? await sdk.simulateExecute(executeParams)
                    : await sdk.execute(executeParams);
            }
            if (result.success && result.explorerUrl) {
                logToUI(`${bridge ? 'Bridge & Execute' : 'Execute'} ${simulate ? 'simulated' : 'TX'}: ${result.explorerUrl}`);
            } else {
                logToUI(`Error: ${result.error}`);
            }
            updateOutput(output, JSON.stringify(result, null, 2));
        } catch (error) {
            logToUI(`Execute error: ${error}`);
        }
    };

    executeBtn.addEventListener('click', () => performExecute(false, false));
    simulateExecuteBtn.addEventListener('click', () => performExecute(true, false));
    bridgeExecuteBtn.addEventListener('click', () => performExecute(false, true));
    simulateBridgeExecuteBtn.addEventListener('click', () => performExecute(true, true));
}