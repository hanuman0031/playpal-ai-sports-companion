// ─────────────────────────────────────────────────────────────
// PlayPal — Prediction mini-game types
// ─────────────────────────────────────────────────────────────

export interface PredictionOption {
  id: string;
  label: string;               // e.g. "Boundary", "Wicket", "Dot ball"
  emoji: string;               // visual cue on TV
}

export interface Prediction {
  id: string;
  matchEventContext: string;    // what we're predicting about
  question: string;             // "What happens on the next ball?"
  options: PredictionOption[];
  correctOptionId?: string;     // set after the event resolves
  deadline: number;             // unix ms — must pick before this
}

export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;              // emoji avatar
  color: string;               // accent color hex
}

export interface MemberPrediction {
  memberId: string;
  predictionId: string;
  selectedOptionId: string;
  timestamp: number;
}

export interface LeaderboardEntry {
  member: FamilyMember;
  score: number;
  streak: number;              // consecutive correct predictions
  totalPredictions: number;
  correctPredictions: number;
}
