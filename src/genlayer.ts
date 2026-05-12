import { createClient, createAccount } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

const client = createClient({ network: testnetBradbury });

export const CONTRACT_ADDRESS = '0xYOUR_ADDRESS_HERE';

export async function classifyAgent(
  handle: string,
  displayName: string,
  roles: string
): Promise<{ role: string; power: string; quirk: string; lore: string; txHash: string }> {
  const account = createAccount();

  const txHash = await client.writeContract({
    account,
    address: CONTRACT_ADDRESS,
    functionName: 'classify_agent',
    args: [handle, displayName, roles],
    value: 0,
  });

  const receipt = await client.waitForTransactionReceipt({ hash: txHash });
  const result = JSON.parse(receipt.result ?? '{}');

  return {
    role: result.role ?? 'Unknown Agent',
    power: result.power ?? '',
    quirk: result.quirk ?? '',
    lore: result.lore ?? '',
    txHash,
  };
}
