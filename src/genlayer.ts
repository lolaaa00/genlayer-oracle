// @ts-nocheck
export const CONTRACT_ADDRESS = '0x2731A164724A4edC6E72Ad507D873B19521d1296';

const FALLBACK = [
  { role: "Consensus Menace", power: "Can settle validator arguments before they finish loading.", quirk: "Says 'gm' then vanishes for exactly 4 days.", lore: "Once forked the testnet on a dare. Never apologized. The fork had better uptime." },
  { role: "Validator Therapist", power: "Emotionally stabilizes the network during contentious governance votes.", quirk: "Explains the same concept 5 different ways and thinks each time is different.", lore: "Held unofficial office hours in #general. 40 people showed. None of the problems were technical." },
  { role: "Builder Goblin", power: "Ships prototypes before the requirements document exists.", quirk: "Opens 12 PRs simultaneously then disappears for the weekend.", lore: "Deployed to mainnet from a coffee shop at 4% battery. It worked. Nobody found out why." },
  { role: "Silent Authority", power: "Maintains order without saying anything above a whisper.", quirk: "Reads every message but only replies to the ones nobody else noticed.", lore: "Has been watching since week one. Message count: 47. Influence: immeasurable." },
  { role: "Testnet Survivor", power: "Has outlasted every restart, migration, and catastrophe since Asimov.", quirk: "Treats every new feature with quiet, well-earned suspicion.", lore: "Participated in Testnet Asimov just to say they were there. Brings it up every 3 weeks." },
  { role: "Governance Sorcerer", power: "Writes proposals so clean that opposition dissolves before the vote.", quirk: "Overthinks casual Discord messages for 45 minutes.", lore: "Passed a proposal nobody wanted by writing a better one about it. The community still doesn't know." },
  { role: "Contract Whisperer", power: "Reads Intelligent Contracts the way others read horoscopes.", quirk: "Leaves code comments funnier than the actual code.", lore: "Fixed a critical vulnerability at 3am and told nobody for a week. Commit message said 'cleanup'." },
  { role: "Chaos Architect", power: "Introduces exactly the right entropy to make the system stronger.", quirk: "PRs marked 'small fix' are statistically the most dangerous.", lore: "Broke testnet twice improving the same function. The third attempt is referenced in lore." },
  { role: "Protocol Phantom", power: "Operates across every channel without anyone mapping the full picture.", quirk: "Always has 3 tabs open to the same docs page.", lore: "Was in every important conversation from the start. Username appears once in each. Time zone: unknown." },
  { role: "Braincell Operator", power: "Processes information at a speed that confuses other smart people.", quirk: "Says 'actually' in every technical thread. Is always right.", lore: "Corrected a whitepaper publicly. Authors updated the doc. No acknowledgment was given." },
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export async function classifyAgent(handle, displayName, roles) {
  // Simulate contract call delay
  await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
  
  const h = hash((handle + displayName + roles).toLowerCase());
  const profile = FALLBACK[h % FALLBACK.length];
  
  // Generate fake tx hash based on input
  const txHash = '0x' + Array.from({length: 64}, (_, i) => 
    ((h * (i + 1) * 2654435761) >>> 0).toString(16).padStart(8, '0')
  ).join('').slice(0, 64);

  return {
    ...profile,
    txHash,
  };
}
