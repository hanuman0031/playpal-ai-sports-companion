// ─────────────────────────────────────────────────────────────
// PlayPal — AI service types
// ─────────────────────────────────────────────────────────────

import { ExplanationMode, Sport } from './match';

/** Context object passed to every AI prompt */
export interface MatchContext {
  sport: Sport;
  matchSummary: string;        // e.g. "India 145/3 after 18.2 overs vs Australia"
  recentEvents: string[];      // last 5 events as human-readable strings
  currentState: string;        // serialized current match state
  mode: ExplanationMode;
}

/** The shape of an AI explain response */
export interface ExplainResponse {
  explanation: string;
  funFact?: string;
  confidence: number;          // 0-1, from model or heuristic
}

/** The shape of a voice Q&A response */
export interface QAResponse {
  answer: string;
  followUp?: string;           // suggested next question
  confidence: number;
}

/** A single highlight in the recap */
export interface Highlight {
  eventId: string;
  timestamp: string;           // match time
  title: string;
  description: string;
  significance: 1 | 2 | 3;
}

/** Full highlights recap */
export interface HighlightsResponse {
  summary: string;             // 2-3 sentence match recap
  highlights: Highlight[];
}

/** AI-generated stat insight for a player */
export interface StatInsight {
  playerId: string;
  playerName: string;
  insight: string;             // one-sentence AI insight
  statLine: string;            // e.g. "42 runs off 28 balls, SR 150.0"
}

/** Request payload sent to the backend proxy */
export interface AIRequest {
  type: 'explain' | 'ask' | 'highlights' | 'insight';
  context: MatchContext;
  question?: string;           // for 'ask' type
  playerId?: string;           // for 'insight' type
  playerStats?: string;        // for 'insight' type
}

/** Wrapper for all AI responses with error handling */
export interface AIResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  fromCache: boolean;          // true if demo mode was used
}
