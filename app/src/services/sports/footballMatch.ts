// ─────────────────────────────────────────────────────────────
// PlayPal — Scripted football match data
// A realistic EPL-style match: Arsenal vs Manchester City
// ─────────────────────────────────────────────────────────────

import { MatchEvent, FootballMatchState, TeamInfo, PlayerInfo } from '../../types';

// ── Team rosters ────────────────────────────────────────────

const arsenalPlayers: PlayerInfo[] = [
  { id: 'ars-1', name: 'Bukayo Saka', role: 'Forward', number: 7, stats: { goals: 0, assists: 0, shots: 0 } },
  { id: 'ars-2', name: 'Martin Ødegaard', role: 'Midfielder', number: 8, stats: { goals: 0, assists: 0, passes: 0 } },
  { id: 'ars-3', name: 'Gabriel Jesus', role: 'Forward', number: 9, stats: { goals: 0, assists: 0, shots: 0 } },
  { id: 'ars-4', name: 'William Saliba', role: 'Defender', number: 2, stats: { tackles: 0, interceptions: 0 } },
  { id: 'ars-5', name: 'Declan Rice', role: 'Midfielder', number: 41, stats: { passes: 0, tackles: 0 } },
  { id: 'ars-6', name: 'Aaron Ramsdale', role: 'Goalkeeper', number: 1, stats: { saves: 0 } },
  { id: 'ars-7', name: 'Gabriel Martinelli', role: 'Forward', number: 11, stats: { goals: 0, assists: 0, shots: 0 } },
  { id: 'ars-8', name: 'Ben White', role: 'Defender', number: 4, stats: { tackles: 0, interceptions: 0 } },
  { id: 'ars-9', name: 'Gabriel Magalhães', role: 'Defender', number: 6, stats: { tackles: 0, interceptions: 0 } },
  { id: 'ars-10', name: 'Oleksandr Zinchenko', role: 'Defender', number: 35, stats: { passes: 0, tackles: 0 } },
  { id: 'ars-11', name: 'Kai Havertz', role: 'Midfielder', number: 29, stats: { goals: 0, assists: 0, shots: 0 } },
];

const cityPlayers: PlayerInfo[] = [
  { id: 'mc-1', name: 'Erling Haaland', role: 'Forward', number: 9, stats: { goals: 0, assists: 0, shots: 0 } },
  { id: 'mc-2', name: 'Kevin De Bruyne', role: 'Midfielder', number: 17, stats: { goals: 0, assists: 0, passes: 0 } },
  { id: 'mc-3', name: 'Phil Foden', role: 'Midfielder', number: 47, stats: { goals: 0, assists: 0, shots: 0 } },
  { id: 'mc-4', name: 'Bernardo Silva', role: 'Midfielder', number: 20, stats: { goals: 0, assists: 0, passes: 0 } },
  { id: 'mc-5', name: 'Rodri', role: 'Midfielder', number: 16, stats: { passes: 0, tackles: 0 } },
  { id: 'mc-6', name: 'Ederson', role: 'Goalkeeper', number: 31, stats: { saves: 0 } },
  { id: 'mc-7', name: 'Jack Grealish', role: 'Forward', number: 10, stats: { goals: 0, assists: 0, shots: 0 } },
  { id: 'mc-8', name: 'Rúben Dias', role: 'Defender', number: 3, stats: { tackles: 0, interceptions: 0 } },
  { id: 'mc-9', name: 'John Stones', role: 'Defender', number: 5, stats: { tackles: 0, interceptions: 0 } },
  { id: 'mc-10', name: 'Kyle Walker', role: 'Defender', number: 2, stats: { tackles: 0, interceptions: 0 } },
  { id: 'mc-11', name: 'Julián Álvarez', role: 'Forward', number: 19, stats: { goals: 0, assists: 0, shots: 0 } },
];

export const arsenalTeam: TeamInfo = {
  name: 'Arsenal',
  shortName: 'ARS',
  color: '#EF0107',
  players: arsenalPlayers,
};

export const cityTeam: TeamInfo = {
  name: 'Manchester City',
  shortName: 'MCI',
  color: '#6CABDD',
  players: cityPlayers,
};

// ── Initial state ───────────────────────────────────────────

export const initialFootballState: FootballMatchState = {
  homeTeam: 'Arsenal',
  awayTeam: 'Manchester City',
  score: {
    home: 0,
    away: 0,
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
  },
  half: 1,
  minute: 0,
  addedTime: 0,
};

// ── Scripted events ─────────────────────────────────────────

export interface FootballScriptedEvent {
  delay: number;
  event: Omit<MatchEvent, 'id' | 'timestamp'>;
  stateUpdate: Partial<FootballMatchState>;
  scoreUpdate?: Partial<FootballMatchState['score']>;
}

const fev = (
  delay: number,
  matchTime: string,
  type: MatchEvent['type'],
  title: string,
  description: string,
  player: string,
  team: string,
  isKeyMoment: boolean,
  significance: 1 | 2 | 3,
  stateUpdate: Partial<FootballMatchState>,
  scoreUpdate?: Partial<FootballMatchState['score']>,
): FootballScriptedEvent => ({
  delay,
  event: {
    matchTime,
    sport: 'football',
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

export const footballEvents: FootballScriptedEvent[] = [
  fev(2000, "1'", 'kick_off', 'Kick Off!', 'Arsenal kick off at the Emirates Stadium. A packed house for the top-of-table clash!', '', 'Arsenal', true, 2,
    { minute: 1 }),
  fev(5000, "8'", 'foul', 'Foul', 'Rodri brings down Saka with a tactical foul. Free kick to Arsenal.', 'Rodri', 'Manchester City', false, 1,
    { minute: 8, score: { home: 0, away: 0, possession: { home: 55, away: 45 }, shots: { home: 1, away: 0 } } }),
  fev(4000, "12'", 'corner', 'Corner', 'Arsenal win a corner. Ødegaard to deliver.', 'Martin Ødegaard', 'Arsenal', false, 1,
    { minute: 12 }),
  fev(5000, "15'", 'goal', '⚽ GOAL! Arsenal 1-0', 'SAKA SCORES! Brilliant curling shot from the edge of the box after Ødegaard\'s corner was cleared. Unstoppable!', 'Bukayo Saka', 'Arsenal', true, 3,
    { minute: 15 },
    { home: 1, away: 0, shots: { home: 2, away: 0 }, possession: { home: 52, away: 48 } }),
  fev(3500, "15'", 'assist', 'Assist', 'The initial ball from Ødegaard set up the clearance that fell to Saka perfectly.', 'Martin Ødegaard', 'Arsenal', false, 1,
    {}),
  fev(5000, "23'", 'save', 'Great Save!', 'Haaland heads powerfully but Ramsdale makes a stunning diving save!', 'Aaron Ramsdale', 'Arsenal', true, 2,
    { minute: 23, score: { home: 1, away: 0, shots: { home: 2, away: 2 }, possession: { home: 48, away: 52 } } }),
  fev(4500, "28'", 'yellow_card', '🟨 Yellow Card', 'Rice goes in late on De Bruyne. Referee shows the yellow card immediately.', 'Declan Rice', 'Arsenal', true, 2,
    { minute: 28 }),
  fev(5000, "34'", 'goal', '⚽ GOAL! Arsenal 1-1', 'DE BRUYNE EQUALIZES! A stunning free kick curled over the wall and into the top corner. Ramsdale had no chance!', 'Kevin De Bruyne', 'Manchester City', true, 3,
    { minute: 34 },
    { home: 1, away: 1, shots: { home: 3, away: 4 }, possession: { home: 45, away: 55 } }),
  fev(4000, "38'", 'offside', 'Offside', 'Haaland caught offside. He was a yard ahead of the last defender.', 'Erling Haaland', 'Manchester City', false, 1,
    { minute: 38 }),
  fev(5000, "42'", 'foul', 'Foul — Penalty Area!', 'Stones brings down Jesus in the box! Referee points to the spot!', 'John Stones', 'Manchester City', true, 3,
    { minute: 42, score: { home: 1, away: 1, shots: { home: 4, away: 5 }, possession: { home: 46, away: 54 } } }),
  fev(6000, "43'", 'penalty', '⚽ PENALTY GOAL! Arsenal 2-1', 'SAKA sends Ederson the wrong way! Cool as you like from the spot. Arsenal retake the lead!', 'Bukayo Saka', 'Arsenal', true, 3,
    { minute: 43 },
    { home: 2, away: 1, shots: { home: 5, away: 5 }, possession: { home: 47, away: 53 } }),
  fev(3000, "45+2'", 'half_time', 'Half Time', 'The referee blows for half time. Arsenal 2-1 Manchester City. What a first half!', '', '', true, 2,
    { minute: 45, addedTime: 2, half: 1 }),

  // ── Second Half ───────────────────────────────────────────
  fev(5000, "46'", 'kick_off', 'Second Half', 'City kick off the second half. They need a goal to get back into this.', '', 'Manchester City', false, 1,
    { half: 2, minute: 46, addedTime: 0 }),
  fev(5000, "52'", 'substitution', 'Substitution', 'Pep brings on Álvarez for Grealish. More firepower up front.', 'Julián Álvarez', 'Manchester City', false, 1,
    { minute: 52 }),
  fev(5000, "58'", 'goal', '⚽ GOAL! Arsenal 2-2', 'FODEN SCORES! Brilliant team move — De Bruyne to Haaland, layoff to Foden who smashes it in. All square!', 'Phil Foden', 'Manchester City', true, 3,
    { minute: 58 },
    { home: 2, away: 2, shots: { home: 6, away: 8 }, possession: { home: 42, away: 58 } }),
  fev(4500, "65'", 'yellow_card', '🟨 Yellow Card', 'Walker pulls back Martinelli who was clean through. Takes one for the team.', 'Kyle Walker', 'Manchester City', true, 2,
    { minute: 65 }),
  fev(5000, "72'", 'save', 'Double Save!', 'Ramsdale denies Haaland twice in quick succession! Outstanding goalkeeping!', 'Aaron Ramsdale', 'Arsenal', true, 2,
    { minute: 72, score: { home: 2, away: 2, shots: { home: 7, away: 11 }, possession: { home: 40, away: 60 } } }),
  fev(5000, "78'", 'red_card', '🟥 RED CARD!', 'Walker gets a second yellow for a reckless challenge on Saka! City down to 10 men!', 'Kyle Walker', 'Manchester City', true, 3,
    { minute: 78 }),
  fev(6000, "85'", 'goal', '⚽ GOAL! Arsenal 3-2', 'MARTINELLI SCORES! He beats Dias on the wing and fires across Ederson into the far corner! The Emirates ERUPTS!', 'Gabriel Martinelli', 'Arsenal', true, 3,
    { minute: 85 },
    { home: 3, away: 2, shots: { home: 9, away: 12 }, possession: { home: 44, away: 56 } }),
  fev(4000, "90+3'", 'full_time', 'Full Time!', 'FULL TIME! Arsenal 3-2 Manchester City! What an incredible match! Arsenal go top of the table!', '', '', true, 3,
    { minute: 90, addedTime: 3 }),
];
