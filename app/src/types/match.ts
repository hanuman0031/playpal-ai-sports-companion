// ─────────────────────────────────────────────────────────────
// PlayPal — Core domain types for matches, events, and sports
// ─────────────────────────────────────────────────────────────

/** Supported sports in the app */
export type Sport = 'cricket' | 'football';

/** The explanation depth the user has selected */
export type ExplanationMode = 'beginner' | 'kid' | 'expert';

/** Status of a live match */
export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'paused';

// ── Cricket-specific types ──────────────────────────────────

export type CricketEventType =
  | 'dot_ball'
  | 'single'
  | 'double'
  | 'triple'
  | 'boundary_four'
  | 'boundary_six'
  | 'wicket'
  | 'wide'
  | 'no_ball'
  | 'lbw'
  | 'caught'
  | 'run_out'
  | 'bowled'
  | 'stumped'
  | 'over_end'
  | 'innings_end'
  | 'match_end';

export interface CricketScore {
  runs: number;
  wickets: number;
  overs: number;
  balls: number;
  runRate: number;
  extras: number;
}

export interface CricketMatchState {
  battingTeam: string;
  bowlingTeam: string;
  score: CricketScore;
  targetScore?: number;
  currentBatsman: string;
  currentBowler: string;
  partnership: { runs: number; balls: number };
}

// ── Football-specific types ─────────────────────────────────

export type FootballEventType =
  | 'goal'
  | 'assist'
  | 'yellow_card'
  | 'red_card'
  | 'foul'
  | 'corner'
  | 'free_kick'
  | 'penalty'
  | 'offside'
  | 'substitution'
  | 'half_time'
  | 'full_time'
  | 'kick_off'
  | 'save';

export interface FootballScore {
  home: number;
  away: number;
  possession: { home: number; away: number };
  shots: { home: number; away: number };
}

export interface FootballMatchState {
  homeTeam: string;
  awayTeam: string;
  score: FootballScore;
  half: 1 | 2;
  minute: number;
  addedTime: number;
}

// ── Unified match event ─────────────────────────────────────

export interface MatchEvent {
  id: string;
  timestamp: number;          // unix ms
  matchTime: string;          // human-readable: "23.4 overs" or "67'"
  sport: Sport;
  type: CricketEventType | FootballEventType;
  title: string;              // short label: "WICKET!" or "GOAL!"
  description: string;        // one-line detail
  player?: string;
  team?: string;
  isKeyMoment: boolean;       // true → eligible for highlights
  significance: 1 | 2 | 3;   // 1=routine, 2=notable, 3=critical
}

// ── Unified match object ────────────────────────────────────

export interface Match {
  id: string;
  sport: Sport;
  status: MatchStatus;
  teamA: TeamInfo;
  teamB: TeamInfo;
  venue: string;
  startTime: number;
  events: MatchEvent[];
  sportState: CricketMatchState | FootballMatchState;
}

export interface TeamInfo {
  name: string;
  shortName: string;
  color: string;             // hex for UI accent
  logo?: string;             // asset path or URL
  players: PlayerInfo[];
}

export interface PlayerInfo {
  id: string;
  name: string;
  role: string;              // "Batsman", "Bowler", "Forward", etc.
  number?: number;
  stats: Record<string, string | number>;
}

// ── Sports data provider interface ──────────────────────────
// Implement this interface to plug in a real API.

export type MatchEventCallback = (event: MatchEvent) => void;
export type MatchStateCallback = (match: Match) => void;

export interface SportsDataProvider {
  /** Returns the list of available matches */
  getMatches(): Promise<Match[]>;

  /** Start emitting live events for a specific match */
  startLiveUpdates(matchId: string): void;

  /** Stop emitting live events */
  stopLiveUpdates(): void;

  /** Register a callback for individual events */
  onEvent(callback: MatchEventCallback): void;

  /** Register a callback for full match state updates */
  onStateUpdate(callback: MatchStateCallback): void;

  /** Remove all listeners */
  removeAllListeners(): void;

  /** Get current match state snapshot */
  getCurrentState(matchId: string): Match | null;
}
