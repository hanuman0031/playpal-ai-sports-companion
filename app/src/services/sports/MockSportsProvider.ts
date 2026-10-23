// ─────────────────────────────────────────────────────────────
// PlayPal — MockSportsProvider
// Implements SportsDataProvider with scripted, timer-driven events.
// Deterministic: same sequence every run, perfect for demos.
// ─────────────────────────────────────────────────────────────

import {
  Match,
  MatchEvent,
  MatchEventCallback,
  MatchStateCallback,
  SportsDataProvider,
  CricketMatchState,
  FootballMatchState,
} from '../../types';
import {
  indiaTeam,
  australiaTeam,
  initialCricketState,
  cricketEvents,
  ScriptedEvent,
} from './cricketMatch';
import {
  arsenalTeam,
  cityTeam,
  initialFootballState,
  footballEvents,
  FootballScriptedEvent,
} from './footballMatch';

let globalEventId = 0;
function nextEventId(): string {
  return `evt-${++globalEventId}`;
}

export class MockSportsProvider implements SportsDataProvider {
  private eventCallbacks: MatchEventCallback[] = [];
  private stateCallbacks: MatchStateCallback[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private currentEventIndex = 0;
  private currentMatch: Match | null = null;
  private isRunning = false;

  /** Speed multiplier: 1 = real timing, 0.5 = double speed, 0.25 = 4x for demo */
  private speedMultiplier: number;

  constructor(speedMultiplier = 1) {
    this.speedMultiplier = speedMultiplier;
  }

  async getMatches(): Promise<Match[]> {
    return [this.createCricketMatch(), this.createFootballMatch()];
  }

  startLiveUpdates(matchId: string): void {
    if (this.isRunning) {
      this.stopLiveUpdates();
    }

    const matches = [this.createCricketMatch(), this.createFootballMatch()];
    this.currentMatch = matches.find((m) => m.id === matchId) ?? matches[0];
    this.currentEventIndex = 0;
    this.isRunning = true;

    // Notify initial state
    this.notifyStateUpdate();

    // Start the event chain
    this.scheduleNextEvent();
  }

  stopLiveUpdates(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onEvent(callback: MatchEventCallback): void {
    this.eventCallbacks.push(callback);
  }

  onStateUpdate(callback: MatchStateCallback): void {
    this.stateCallbacks.push(callback);
  }

  removeAllListeners(): void {
    this.eventCallbacks = [];
    this.stateCallbacks = [];
  }

  getCurrentState(matchId: string): Match | null {
    if (this.currentMatch?.id === matchId) {
      return { ...this.currentMatch };
    }
    return null;
  }

  // ── Internals ───────────────────────────────────────────────

  private getScriptedEvents(): (ScriptedEvent | FootballScriptedEvent)[] {
    if (!this.currentMatch) return [];
    return this.currentMatch.sport === 'cricket' ? cricketEvents : footballEvents;
  }

  private scheduleNextEvent(): void {
    const events = this.getScriptedEvents();
    if (this.currentEventIndex >= events.length || !this.isRunning) {
      // Match complete
      if (this.currentMatch) {
        this.currentMatch.status = 'completed';
        this.notifyStateUpdate();
      }
      return;
    }

    const scriptedEvent = events[this.currentEventIndex];
    const delay = scriptedEvent.delay * this.speedMultiplier;

    this.timer = setTimeout(() => {
      this.processEvent(scriptedEvent);
      this.currentEventIndex++;
      this.scheduleNextEvent();
    }, delay);
  }

  private processEvent(scripted: ScriptedEvent | FootballScriptedEvent): void {
    if (!this.currentMatch) return;

    // Create the full event
    const event: MatchEvent = {
      ...scripted.event,
      id: nextEventId(),
      timestamp: Date.now(),
    };

    // Add to match events
    this.currentMatch.events.push(event);

    // Update match state based on sport
    if (this.currentMatch.sport === 'cricket') {
      const cState = this.currentMatch.sportState as CricketMatchState;
      const cScripted = scripted as ScriptedEvent;

      Object.assign(cState, cScripted.stateUpdate);
      Object.assign(cState.score, cScripted.scoreUpdate);

      // Recalculate run rate
      if (cState.score.overs > 0) {
        cState.score.runRate =
          Math.round((cState.score.runs / cState.score.overs) * 10) / 10;
      }
    } else {
      const fState = this.currentMatch.sportState as FootballMatchState;
      const fScripted = scripted as FootballScriptedEvent;

      Object.assign(fState, fScripted.stateUpdate);
      if (fScripted.scoreUpdate) {
        Object.assign(fState.score, fScripted.scoreUpdate);
      }
    }

    // Notify listeners
    this.eventCallbacks.forEach((cb) => cb(event));
    this.notifyStateUpdate();
  }

  private notifyStateUpdate(): void {
    if (!this.currentMatch) return;
    const snapshot = { ...this.currentMatch };
    this.stateCallbacks.forEach((cb) => cb(snapshot));
  }

  private createCricketMatch(): Match {
    return {
      id: 'cricket-ind-aus-t20',
      sport: 'cricket',
      status: 'live',
      teamA: indiaTeam,
      teamB: australiaTeam,
      venue: 'Wankhede Stadium, Mumbai',
      startTime: Date.now(),
      events: [],
      sportState: { ...initialCricketState },
    };
  }

  private createFootballMatch(): Match {
    return {
      id: 'football-ars-mci',
      sport: 'football',
      status: 'live',
      teamA: arsenalTeam,
      teamB: cityTeam,
      venue: 'Emirates Stadium, London',
      startTime: Date.now(),
      events: [],
      sportState: { ...initialFootballState },
    };
  }
}

// ── Singleton for easy import ─────────────────────────────────
// Default to 0.5x speed: fast enough for demo, slow enough to read.
export const mockSportsProvider = new MockSportsProvider(0.5);
