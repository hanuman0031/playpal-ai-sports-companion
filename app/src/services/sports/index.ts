// ─────────────────────────────────────────────────────────────
// PlayPal — Sports service barrel
// Swap MockSportsProvider for a real one by changing this file.
// ─────────────────────────────────────────────────────────────

export { MockSportsProvider, mockSportsProvider } from './MockSportsProvider';
export type { ScriptedEvent } from './cricketMatch';
export type { FootballScriptedEvent } from './footballMatch';

// ┌──────────────────────────────────────────────────────────┐
// │ PLUG IN A REAL API HERE:                                  │
// │                                                            │
// │ 1. Create a class that implements SportsDataProvider       │
// │ 2. Export it from this file                                │
// │ 3. Update the provider used in matchStore.ts               │
// │                                                            │
// │ Example:                                                   │
// │   export { CricInfoProvider } from './CricInfoProvider';   │
// └──────────────────────────────────────────────────────────┘
