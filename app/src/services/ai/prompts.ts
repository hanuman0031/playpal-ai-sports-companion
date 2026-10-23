// ─────────────────────────────────────────────────────────────
// PlayPal — AI prompt templates
// All prompts are in one file for easy auditing and tuning.
// Each function returns the final prompt string with context injected.
// ─────────────────────────────────────────────────────────────

import { MatchContext, ExplanationMode } from '../../types';

// ── Safety / system preamble ────────────────────────────────

const SAFETY_PREAMBLE = `You are PlayPal, a friendly AI sports companion for families watching live sports on TV.

RULES:
- Keep answers concise: 2-3 sentences max for spoken answers.
- Stay on topic: only discuss the current match, sport rules, players, and stats.
- Be age-appropriate at all times. No profanity, no controversial opinions, no gambling references.
- If you don't know something, say so honestly.
- Never fabricate statistics or player information not provided in the context.`;

const MODE_INSTRUCTIONS: Record<ExplanationMode, string> = {
  beginner: `AUDIENCE: Someone new to this sport. Explain all terminology. Use simple analogies. Avoid jargon.`,
  kid: `AUDIENCE: A child aged 6-10. Use very simple words, fun comparisons, and excitement. Add an emoji. Make it feel like telling a story.`,
  expert: `AUDIENCE: An experienced fan. Be precise and tactical. Use proper terminology. Reference strategy and technique.`,
};

// ── Context formatter ───────────────────────────────────────

function formatContext(ctx: MatchContext): string {
  return `CURRENT MATCH (${ctx.sport.toUpperCase()}):
${ctx.matchSummary}

CURRENT STATE:
${ctx.currentState}

RECENT EVENTS:
${ctx.recentEvents.map((e, i) => `${i + 1}. ${e}`).join('\n')}`;
}

// ── Prompt builders ─────────────────────────────────────────

/**
 * Build the "Explain This" prompt.
 * Explains the most recent event in plain language.
 */
export function buildExplainPrompt(ctx: MatchContext): string {
  return `${SAFETY_PREAMBLE}

${MODE_INSTRUCTIONS[ctx.mode]}

${formatContext(ctx)}

TASK: Explain what just happened in the match (the most recent event) in plain language appropriate for the audience. Include why it matters in the context of the match. Keep it to 2-3 sentences.`;
}

/**
 * Build the voice Q&A prompt.
 * Answers a user's question grounded in match context.
 */
export function buildQAPrompt(ctx: MatchContext, question: string): string {
  return `${SAFETY_PREAMBLE}

${MODE_INSTRUCTIONS[ctx.mode]}

${formatContext(ctx)}

USER QUESTION: "${question}"

TASK: Answer the user's question based on the match context above. If the question is about a rule or term, explain it clearly. If it's about the current match state, use the provided data. Keep your answer to 2-3 sentences. If you suggest a follow-up question, make it relevant and interesting.`;
}

/**
 * Build the highlights recap prompt.
 * Generates a match summary with key moments.
 */
export function buildHighlightsPrompt(ctx: MatchContext): string {
  return `${SAFETY_PREAMBLE}

${MODE_INSTRUCTIONS[ctx.mode]}

${formatContext(ctx)}

TASK: Generate a match highlights recap. Include:
1. A 2-3 sentence overall summary of the match.
2. The top 5 key moments, each with:
   - The match time (from the event data)
   - A one-line vivid description

Format your response as JSON:
{
  "summary": "...",
  "highlights": [
    { "timestamp": "...", "title": "...", "description": "..." }
  ]
}`;
}

/**
 * Build the player insight prompt.
 * Generates a one-sentence AI insight about a player's performance.
 */
export function buildInsightPrompt(
  ctx: MatchContext,
  playerName: string,
  playerStats: string,
): string {
  return `${SAFETY_PREAMBLE}

${MODE_INSTRUCTIONS[ctx.mode]}

${formatContext(ctx)}

PLAYER: ${playerName}
STATS: ${playerStats}

TASK: Write a single sentence insight about this player's current performance in the match. Be specific, reference a stat or moment, and make it engaging. One sentence only.`;
}

/**
 * Utility: serialize the match context for logging/debugging.
 */
export function serializeContext(ctx: MatchContext): string {
  return JSON.stringify(ctx, null, 2);
}
