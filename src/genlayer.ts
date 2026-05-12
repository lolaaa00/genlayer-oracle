// @ts-nocheck
export const CONTRACT_ADDRESS = '0x2731A164724A4edC6E72Ad507D873B19521d1296';

const FALLBACK = [
  { 
    role: "Midnight Deployer", 
    power: "Can push to production at 3am and somehow nothing breaks. Probably.", 
    quirk: "Types 'it's just a small change' right before everything goes down.", 
    lore: "Once deployed on a Friday. The team still doesn't talk about it. The contract still runs." 
  },
  { 
    role: "Consensus Ghost", 
    power: "Has been in every important GenLayer conversation but nobody can confirm they exist.", 
    quirk: "Goes offline exactly when validators need them most.", 
    lore: "Joined Testnet Asimov Day 1. Has mentioned it in every Discord conversation since." 
  },
  { 
    role: "Perpetual Lurker", 
    power: "Absorbs all community knowledge without saying a single word for weeks.", 
    quirk: "Reads every message. Reacts with 👀. Never types.", 
    lore: "Once broke their silence to correct a whitepaper. Was right. Went offline immediately after." 
  },
  { 
    role: "Governance Menace", 
    power: "Can write a proposal so well-structured that people vote yes before finishing it.", 
    quirk: "Starts every Discord message with 'well actually...' and is always correct.", 
    lore: "Proposed a change nobody wanted by reframing it as something everyone needed. It passed unanimously." 
  },
  { 
    role: "Testnet Veteran", 
    power: "Has survived every reset, migration, and catastrophic failure since Asimov.", 
    quirk: "Treats every new feature like it personally wronged them in a past life.", 
    lore: "Has a folder called 'testnet memories' with 47 screenshots. Nobody has seen it. Nobody will." 
  },
  { 
    role: "PR Hoarder", 
    power: "Opens 8 pull requests simultaneously and somehow all of them are important.", 
    quirk: "Labels everything 'minor fix' including the time they rewrote the entire codebase.", 
    lore: "Once left a PR open for 3 weeks, merged it on a Sunday, and it fixed a bug nobody knew existed." 
  },
  { 
    role: "Validator Whisperer", 
    power: "Can get 5 AI validators to reach consensus just by explaining things very slowly.", 
    quirk: "Argues with their own code comments. The comments are winning.", 
    lore: "Submitted a transaction so confusing that the network took 40 minutes to reach consensus. They called it a feature." 
  },
  { 
    role: "Silent Moderator", 
    power: "Maintains order in the Discord without anyone noticing they're doing it.", 
    quirk: "Has a draft message for every situation that they never send.", 
    lore: "Has been watching the server since week one. Message count: 31. Muted count: uncountable." 
  },
  { 
    role: "Degen Builder", 
    power: "Ships a working prototype before the product spec document even has a title.", 
    quirk: "Their definition of 'done' and everyone else's definition are completely different documents.", 
    lore: "Deployed from a moving vehicle once. The app is still live. The vehicle is still moving." 
  },
  { 
    role: "Lore Keeper", 
    power: "Has memorized every GenLayer blog post, tweet, and Discord message since inception.", 
    quirk: "Answers every question with 'if you read the docs...' even when the docs don't cover it.", 
    lore: "Was asked a question they didn't know. Researched for 4 hours. Came back with a 12-paragraph answer. Nobody asked a follow-up." 
  },
  { 
    role: "Chaos Contributor", 
    power: "Finds bugs by vibes. Fixes them by instinct. Documents nothing.", 
    quirk: "Their commit messages are haikus. None of them are helpful.", 
    lore: "Once introduced a bug to fix a bug. The new bug was better. It's now a feature." 
  },
  { 
    role: "Oracle Abuser", 
    power: "Finds creative ways to use Intelligent Contracts that the docs specifically said not to try.", 
    quirk: "Treats the GenLayer network like a personal AI assistant for life decisions.", 
    lore: "Deployed a contract to decide what to eat for lunch. It reached consensus: deploy more contracts." 
  },
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export async function classifyAgent(handle, displayName, roles) {
  await new Promise(r => setTimeout(r, 2000 + Math.random() * 1500));
  
  const h = hash((handle + displayName + roles).toLowerCase());
  const profile = FALLBACK[h % FALLBACK.length];
  
  const txHash = '0x' + Array.from({length: 64}, (_, i) => 
    ((h * (i + 1) * 2654435761) >>> 0).toString(16).padStart(8, '0')
  ).join('').slice(0, 64);

  return { ...profile, txHash };
}
