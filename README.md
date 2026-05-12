# GenLayer Oracle — AI Agent Classification System

A community identity tool where GenLayer's Intelligent Contract uses AI consensus to classify community members and assign them funny, meme-worthy agent profiles.

## Live App

https://genlayer-oracle.vercel.app/

## How GenLayer powers the core mechanic

1. User enters their X handle, display name and Discord roles
2. The frontend calls `classify_agent()` on the deployed Intelligent Contract
3. 5 AI validators reach consensus using `gl.eq_principle_strict_eq()` and `gl.exec_prompt()`
4. The Oracle assigns a unique role, power, quirk and lore entry
5. The real transaction hash is displayed on the card
6. User shares their card on X

## GenLayer Integration

**Contract file:** `oracle_agent.py`
**Contract address:** `0x2731A164724A4edC6E72Ad507D873B19521d1296`
**Network:** Bradbury Testnet
**SDK:** genlayer-js

## Tech Stack

- React + TypeScript + Vite
- GenLayer Intelligent Contract (Python)
- genlayer-js SDK
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev
```

## Contract deployment

The Intelligent Contract is deployed on GenLayer Studio (Bradbury Testnet).
Source: `oracle_agent.py`
