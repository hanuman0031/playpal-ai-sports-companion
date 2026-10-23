// ─────────────────────────────────────────────────────────────
// PlayPal — Match state store (Zustand)
// Central state for the live match: score, events, sport state.
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand';
import {
  Match,
  MatchEvent,
  Sport,
  CricketMatchState,
  FootballMatchState,
  ExplanationMode,
  MatchContext,
} from '../types';
import { MockSportsProvider } from '../services/sports';

interface MatchStore {
  // ── State ─────────────────────────────────────────────────
  currentMatch: Match | null;
  events: MatchEvent[];
  isLive: boolean;
  selectedSport: Sport;
  explanationMode: ExplanationMode;
  provider: MockSportsProvider;

  // ── Actions ───────────────────────────────────────────────
  selectSport: (sport: Sport) => void;
  setExplanationMode: (mode: ExplanationMode) => void;
  startMatch: (matchId: string) => void;
  stopMatch: () => void;
  addEvent: (event: MatchEvent) => void;
  updateMatchState: (match: Match) => void;
  getMatchContext: () => MatchContext;
  getLastEvent: () => MatchEvent | null;
  getKeyMoments: () => MatchEvent[];
}

function formatCricketSummary(state: CricketMatchState): string {
  const s = state.score;
  return `${state.battingTeam} ${s.runs}/${s.wickets} after ${s.overs}.${s.balls % 6} overs vs ${state.bowlingTeam}. Current batsman: ${state.currentBatsman}, bowler: ${state.currentBowler}. Run rate: ${s.runRate}.`;
}

function formatFootballSummary(state: FootballMatchState): string {
  return `${state.homeTeam} ${state.score.home}-${state.score.away} ${state.awayTeam}. ${state.half === 1 ? 'First' : 'Second'} half, ${state.minute}'. Possession: ${state.homeTeam} ${state.score.possession.home}% - ${state.awayTeam} ${state.score.possession.away}%.`;
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  currentMatch: null,
  events: [],
  isLive: false,
  selectedSport: 'cricket',
  explanationMode: 'beginner',
  provider: new MockSportsProvider(0.5),

  selectSport: (sport) => set({ selectedSport: sport }),

  setExplanationMode: (mode) => set({ explanationMode: mode }),

  startMatch: (matchId) => {
    const { provider } = get();

    // Wire up callbacks before starting
    provider.removeAllListeners();

    provider.onEvent((event) => {
      get().addEvent(event);
    });

    provider.onStateUpdate((match) => {
      get().updateMatchState(match);
    });

    provider.startLiveUpdates(matchId);
    set({ isLive: true });
  },

  stopMatch: () => {
    const { provider } = get();
    provider.stopLiveUpdates();
    set({ isLive: false });
  },

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  updateMatchState: (match) =>
    set({ currentMatch: match }),

  getMatchContext: () => {
    const { currentMatch, events, explanationMode } = get();
    if (!currentMatch) {
      return {
        sport: 'cricket',
        matchSummary: 'No match in progress',
        recentEvents: [],
        currentState: '',
        mode: explanationMode,
      };
    }

    const recentEvents = events
      .slice(-5)
      .map((e) => `[${e.matchTime}] ${e.title}: ${e.description}`);

    const matchSummary =
      currentMatch.sport === 'cricket'
        ? formatCricketSummary(currentMatch.sportState as CricketMatchState)
        : formatFootballSummary(currentMatch.sportState as FootballMatchState);

    return {
      sport: currentMatch.sport,
      matchSummary,
      recentEvents,
      currentState: JSON.stringify(currentMatch.sportState),
      mode: explanationMode,
    };
  },

  getLastEvent: () => {
    const { events } = get();
    return events.length > 0 ? events[events.length - 1] : null;
  },

  getKeyMoments: () => {
    const { events } = get();
    return events.filter((e) => e.isKeyMoment);
  },
}));
