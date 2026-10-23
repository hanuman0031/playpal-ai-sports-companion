// ─────────────────────────────────────────────────────────────
// PlayPal — Scripted cricket match data
// A realistic T20 match: India vs Australia, 20 overs each.
// Each event fires on a timer during the demo.
// ─────────────────────────────────────────────────────────────

import { MatchEvent, CricketMatchState, TeamInfo, PlayerInfo } from '../../types';

// ── Team rosters ────────────────────────────────────────────

const indiaPlayers: PlayerInfo[] = [
  { id: 'ind-1', name: 'Rohit Sharma', role: 'Batsman', number: 45, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'ind-2', name: 'Virat Kohli', role: 'Batsman', number: 18, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'ind-3', name: 'Suryakumar Yadav', role: 'Batsman', number: 63, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'ind-4', name: 'KL Rahul', role: 'Batsman/WK', number: 1, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'ind-5', name: 'Hardik Pandya', role: 'All-rounder', number: 33, stats: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0 } },
  { id: 'ind-6', name: 'Ravindra Jadeja', role: 'All-rounder', number: 8, stats: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0 } },
  { id: 'ind-7', name: 'Jasprit Bumrah', role: 'Bowler', number: 93, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'ind-8', name: 'Mohammed Shami', role: 'Bowler', number: 11, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'ind-9', name: 'Yuzvendra Chahal', role: 'Bowler', number: 3, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'ind-10', name: 'Kuldeep Yadav', role: 'Bowler', number: 23, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'ind-11', name: 'Arshdeep Singh', role: 'Bowler', number: 2, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
];

const ausPlayers: PlayerInfo[] = [
  { id: 'aus-1', name: 'David Warner', role: 'Batsman', number: 31, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'aus-2', name: 'Travis Head', role: 'Batsman', number: 48, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'aus-3', name: 'Steve Smith', role: 'Batsman', number: 49, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'aus-4', name: 'Glenn Maxwell', role: 'All-rounder', number: 32, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'aus-5', name: 'Marcus Stoinis', role: 'All-rounder', number: 13, stats: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0 } },
  { id: 'aus-6', name: 'Alex Carey', role: 'WK/Batsman', number: 5, stats: { runs: 0, balls: 0, fours: 0, sixes: 0 } },
  { id: 'aus-7', name: 'Pat Cummins', role: 'Bowler', number: 30, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'aus-8', name: 'Mitchell Starc', role: 'Bowler', number: 56, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'aus-9', name: 'Josh Hazlewood', role: 'Bowler', number: 38, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'aus-10', name: 'Adam Zampa', role: 'Bowler', number: 63, stats: { overs: 0, wickets: 0, runsConceded: 0, economy: 0 } },
  { id: 'aus-11', name: 'Cameron Green', role: 'All-rounder', number: 28, stats: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0 } },
];

export const indiaTeam: TeamInfo = {
  name: 'India',
  shortName: 'IND',
  color: '#138808',
  players: indiaPlayers,
};

export const australiaTeam: TeamInfo = {
  name: 'Australia',
  shortName: 'AUS',
  color: '#FFCD00',
  players: ausPlayers,
};

// ── Initial state ───────────────────────────────────────────

export const initialCricketState: CricketMatchState = {
  battingTeam: 'India',
  bowlingTeam: 'Australia',
  score: { runs: 0, wickets: 0, overs: 0, balls: 0, runRate: 0, extras: 0 },
  currentBatsman: 'Rohit Sharma',
  currentBowler: 'Mitchell Starc',
  partnership: { runs: 0, balls: 0 },
};

// ── Scripted events ─────────────────────────────────────────
// Each event includes a delay (ms) before it fires relative to the previous one.
// This creates a realistic pacing: ~3-6 seconds per ball in demo mode.

export interface ScriptedEvent {
  delay: number;     // ms after previous event
  event: Omit<MatchEvent, 'id' | 'timestamp'>;
  stateUpdate: Partial<CricketMatchState>;
  scoreUpdate: Partial<CricketMatchState['score']>;
}

let eventSeq = 0;
const ev = (
  delay: number,
  matchTime: string,
  type: MatchEvent['type'],
  title: string,
  description: string,
  player: string,
  team: string,
  isKeyMoment: boolean,
  significance: 1 | 2 | 3,
  stateUpdate: Partial<CricketMatchState>,
  scoreUpdate: Partial<CricketMatchState['score']>,
): ScriptedEvent => ({
  delay,
  event: {
    matchTime,
    sport: 'cricket',
    type,
    title,
    description,
    player,
    team,
    isKeyMoment,
    significance,
  },
  stateUpdate,
  scoreUpdate,
});

export const cricketEvents: ScriptedEvent[] = [
  // ── Over 1: Starc to Rohit ────────────────────────────────
  ev(2000, '0.1', 'dot_ball', 'Dot Ball', 'Starc bowls a sharp bouncer, Rohit ducks under it. Good start from Starc.', 'Rohit Sharma', 'India', false, 1,
    {}, { balls: 1 }),
  ev(4000, '0.2', 'boundary_four', 'FOUR!', 'Rohit punches through cover! Beautiful timing, racing to the boundary.', 'Rohit Sharma', 'India', true, 2,
    {}, { runs: 4, balls: 2 }),
  ev(4000, '0.3', 'single', 'Single', 'Tucked off the pads to midwicket for a quick single.', 'Rohit Sharma', 'India', false, 1,
    { currentBatsman: 'Virat Kohli' }, { runs: 5, balls: 3 }),
  ev(3500, '0.4', 'dot_ball', 'Dot Ball', 'Starc fires a yorker, Kohli digs it out. Excellent delivery.', 'Virat Kohli', 'India', false, 1,
    {}, { balls: 4 }),
  ev(4500, '0.5', 'boundary_four', 'FOUR!', 'Kohli drives elegantly through mid-off! Classic shot.', 'Virat Kohli', 'India', true, 2,
    {}, { runs: 9, balls: 5 }),
  ev(3000, '0.6', 'single', 'Single', 'Quick single to end the over. India off to a solid start.', 'Virat Kohli', 'India', false, 1,
    { currentBatsman: 'Rohit Sharma', currentBowler: 'Josh Hazlewood' }, { runs: 10, balls: 6, overs: 1 }),

  // ── Over 2: Hazlewood to Rohit ────────────────────────────
  ev(5000, '1.1', 'boundary_six', 'SIX!', 'Rohit launches Hazlewood over long-on! Massive hit into the stands!', 'Rohit Sharma', 'India', true, 3,
    {}, { runs: 16, balls: 7 }),
  ev(4000, '1.2', 'dot_ball', 'Dot Ball', 'Good length outside off, Rohit leaves it alone. Discipline.', 'Rohit Sharma', 'India', false, 1,
    {}, { balls: 8 }),
  ev(3500, '1.3', 'wide', 'Wide!', 'Hazlewood strays down leg. Umpire signals wide.', 'Josh Hazlewood', 'Australia', false, 1,
    {}, { runs: 17, extras: 1 }),
  ev(4000, '1.4', 'double', 'Two Runs', 'Driven to long-off, sharp running between the wickets for two.', 'Rohit Sharma', 'India', false, 1,
    {}, { runs: 19, balls: 9 }),
  ev(3000, '1.5', 'single', 'Single', 'Dabbed to third man for one.', 'Rohit Sharma', 'India', false, 1,
    { currentBatsman: 'Virat Kohli' }, { runs: 20, balls: 10 }),
  ev(5000, '1.6', 'wicket', 'WICKET! CAUGHT!', 'Kohli edges Hazlewood to the keeper! Alex Carey takes a sharp catch. India lose their first wicket!', 'Virat Kohli', 'India', true, 3,
    { currentBatsman: 'Suryakumar Yadav', currentBowler: 'Pat Cummins' }, { runs: 20, wickets: 1, balls: 11, overs: 2 }),
  ev(3000, '2.0', 'over_end', 'End of Over 2', 'India 20/1 after 2 overs. Run rate: 10.0. Kohli departs for 5.', 'Virat Kohli', 'India', false, 1,
    { partnership: { runs: 0, balls: 0 } }, {}),

  // ── Over 3: Cummins to Suryakumar ─────────────────────────
  ev(4000, '2.1', 'dot_ball', 'Dot Ball', 'Cummins bowls a peach! Just outside off, SKY leaves it.', 'Suryakumar Yadav', 'India', false, 1,
    {}, { balls: 12 }),
  ev(5000, '2.2', 'boundary_four', 'FOUR!', 'SKY plays the reverse scoop! Audacious shot over the keeper. The crowd goes wild!', 'Suryakumar Yadav', 'India', true, 3,
    {}, { runs: 24, balls: 13 }),
  ev(3500, '2.3', 'single', 'Single', 'Pushed to mid-on for a quick single.', 'Suryakumar Yadav', 'India', false, 1,
    { currentBatsman: 'Rohit Sharma' }, { runs: 25, balls: 14 }),
  ev(4000, '2.4', 'boundary_six', 'SIX!', 'Rohit goes big again! Pulls Cummins over deep square leg. Colossal!', 'Rohit Sharma', 'India', true, 3,
    {}, { runs: 31, balls: 15 }),
  ev(3000, '2.5', 'single', 'Single', 'Quick single to keep the strike.', 'Rohit Sharma', 'India', false, 1,
    { currentBatsman: 'Suryakumar Yadav' }, { runs: 32, balls: 16 }),
  ev(4500, '2.6', 'boundary_four', 'FOUR!', 'SKY flicks off the pads through midwicket! Racing away to the fence.', 'Suryakumar Yadav', 'India', true, 2,
    { currentBowler: 'Adam Zampa' }, { runs: 36, balls: 17, overs: 3 }),

  // ── Over 4: Zampa to Rohit ────────────────────────────────
  ev(5000, '3.1', 'dot_ball', 'Dot Ball', 'Zampa flights it up, Rohit comes down the track but misses. Close!', 'Rohit Sharma', 'India', false, 1,
    {}, { balls: 18 }),
  ev(3500, '3.2', 'single', 'Single', 'Worked to square leg for one.', 'Rohit Sharma', 'India', false, 1,
    { currentBatsman: 'Suryakumar Yadav' }, { runs: 37, balls: 19 }),
  ev(4000, '3.3', 'boundary_six', 'SIX!', 'SKY dances down the track and launches Zampa over long-off! What a player!', 'Suryakumar Yadav', 'India', true, 3,
    {}, { runs: 43, balls: 20 }),
  ev(4500, '3.4', 'wicket', 'WICKET! STUMPED!', 'SKY goes for another big shot but misses! Carey whips off the bails in a flash. Stumped!', 'Suryakumar Yadav', 'India', true, 3,
    { currentBatsman: 'KL Rahul' }, { runs: 43, wickets: 2, balls: 21 }),
  ev(3000, '3.5', 'dot_ball', 'Dot Ball', 'Rahul defends solidly on the front foot. Settling in.', 'KL Rahul', 'India', false, 1,
    {}, { balls: 22 }),
  ev(4000, '3.6', 'single', 'Single', 'Nudged to midwicket. India 44/2 after 4 overs.', 'KL Rahul', 'India', false, 1,
    { currentBatsman: 'Rohit Sharma', currentBowler: 'Mitchell Starc' }, { runs: 44, balls: 23, overs: 4 }),

  // ── Over 5: Key moment — Rohit reaches fifty ─────────────
  ev(4000, '4.1', 'boundary_four', 'FOUR!', 'Rohit cuts Starc past point! That brings up his FIFTY off just 20 balls!', 'Rohit Sharma', 'India', true, 3,
    {}, { runs: 48, balls: 24 }),
  ev(3500, '4.2', 'single', 'Single', 'Single to deep cover.', 'Rohit Sharma', 'India', false, 1,
    { currentBatsman: 'KL Rahul' }, { runs: 49, balls: 25 }),
  ev(4000, '4.3', 'boundary_four', 'FOUR!', 'Rahul gets off the mark with a crisp drive through extra cover!', 'KL Rahul', 'India', true, 2,
    {}, { runs: 53, balls: 26 }),
  ev(3000, '4.4', 'single', 'Single', 'Pushed to mid-off for a single.', 'KL Rahul', 'India', false, 1,
    { currentBatsman: 'Rohit Sharma' }, { runs: 54, balls: 27 }),
  ev(5000, '4.5', 'wicket', 'WICKET! LBW!', 'Starc nails the yorker and traps Rohit LBW! The captain has to go for a brilliant 52. What an innings!', 'Rohit Sharma', 'India', true, 3,
    { currentBatsman: 'Hardik Pandya' }, { runs: 54, wickets: 3, balls: 28 }),
  ev(3500, '4.6', 'dot_ball', 'Dot Ball', 'Pandya blocks to end the powerplay. India 54/3 after 5 overs.', 'Hardik Pandya', 'India', false, 1,
    { currentBowler: 'Cameron Green' }, { balls: 29, overs: 5 }),

  // ── Signal end of demo segment ────────────────────────────
  ev(3000, '5.0', 'over_end', 'End of Powerplay', 'India finish the powerplay at 54/3. Explosive start but Australia fought back with 3 wickets. Run rate: 10.8.', '', '', true, 2,
    {}, {}),
];

/**
 * Compute the cumulative score at each event index.
 * Used by the match state reducer.
 */
export function computeScoreAtIndex(index: number): CricketMatchState['score'] {
  let score = { ...initialCricketState.score };
  for (let i = 0; i <= Math.min(index, cricketEvents.length - 1); i++) {
    const update = cricketEvents[i].scoreUpdate;
    score = {
      runs: update.runs ?? score.runs,
      wickets: update.wickets ?? score.wickets,
      overs: update.overs ?? score.overs,
      balls: update.balls ?? score.balls,
      extras: update.extras ?? score.extras,
      runRate: score.overs > 0
        ? Math.round(((update.runs ?? score.runs) / (update.overs ?? score.overs || 1)) * 10) / 10
        : 0,
    };
  }
  return score;
}
