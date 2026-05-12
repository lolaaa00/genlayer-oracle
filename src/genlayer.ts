import { createClient, createAccount } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

const client = createClient({ network: testnetBradbury });

export const CONTRACT_ADDRESS = '0x2731A164724A4edC6E72Ad507D873B19521d1296';

export async function classifyAgent(
  handle: string,
  displayName: string,
  roles: string
): Promise<{ role: string; power: string; quirk: string; lore: string; txHash: string }> {
  const account = createAccount();

  const txHash = await client.writeContract({
    account,
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'classify_agent',
    args: [handle, displayName, roles],
    value: BigInt(0),
  });

  const receipt = await client.waitForTransactionReceipt({
    hash: txHash as `0x${string}`,
  });

  const result = JSON.parse((receipt as any).result ?? '{}');

  return {
    role: result.role ?? 'Unknown Agent',
    power: result.power ?? '',
    quirk: result.quirk ?? '',
    lore: result.lore ?? '',
    txHash: txHash as string,
  };
}

export async function getStats() {
  return await client.readContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'get_stats',
    args: [],
  });
}
