// @ts-nocheck
export const CONTRACT_ADDRESS = '0x2731A164724A4edC6E72Ad507D873B19521d1296';

export async function classifyAgent(handle, displayName, roles) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: 'You are the GenLayer Oracle. Classify GenLayer community members with funny meme-worthy profiles. Return ONLY valid JSON no markdown.',
      messages: [{
        role: 'user',
        content: `Classify: Handle: ${handle}, Name: ${displayName}, Roles: ${roles || 'none'}. Return JSON: {"role":"2-4 word title","power":"1 sentence ability","quirk":"1 funny flaw","lore":"2 sentence history with punchline"}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content[0].text.trim().replace(/```json|```/g, '').trim();
  const result = JSON.parse(text);
  return {
    role: result.role ?? 'Unknown Agent',
    power: result.power ?? '',
    quirk: result.quirk ?? '',
    lore: result.lore ?? '',
    txHash: CONTRACT_ADDRESS,
  };
}
