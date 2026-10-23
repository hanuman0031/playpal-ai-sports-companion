// ─────────────────────────────────────────────────────────────
// PlayPal — Demo mode cached responses
// Used when offline or when DEMO_MODE=true.
// Keyed by event type / question pattern for deterministic demos.
// ─────────────────────────────────────────────────────────────

import { ExplainResponse, QAResponse, HighlightsResponse, StatInsight } from '../../types';

// ── Explain responses by event type ─────────────────────────

export const demoExplainResponses: Record<string, Record<string, ExplainResponse>> = {
  cricket: {
    boundary_four: {
      explanation: 'The batsman hit the ball along the ground and it crossed the boundary rope, scoring 4 runs automatically. This is a great scoring shot that puts pressure on the bowling team.',
      funFact: 'A well-timed cover drive is considered the most elegant shot in cricket!',
      confidence: 0.95,
    },
    boundary_six: {
      explanation: 'The batsman launched the ball over the boundary rope without it bouncing — that\'s a massive SIX! The ball cleared the field and landed in the stands. This is the maximum runs from a single delivery.',
      funFact: 'The longest six ever recorded in cricket traveled over 158 meters!',
      confidence: 0.95,
    },
    wicket: {
      explanation: 'A wicket has fallen! The batsman is out and has to leave the field. A new batsman will come in to replace them. This is a crucial moment — the batting team just lost one of their limited batsmen.',
      confidence: 0.95,
    },
    lbw: {
      explanation: 'LBW stands for "Leg Before Wicket." The ball hit the batsman\'s leg pad, and the umpire decided it would have gone on to hit the stumps. Since the batsman\'s leg blocked a ball that would have hit the wicket, the batsman is given out.',
      funFact: 'LBW decisions are among the most debated in cricket — even with technology!',
      confidence: 0.95,
    },
    caught: {
      explanation: 'The batsman hit the ball in the air and a fielder caught it before it bounced. That\'s a catch — the batsman is out! Good catches require sharp reflexes and safe hands.',
      confidence: 0.95,
    },
    stumped: {
      explanation: 'The batsman stepped out of their crease (safe zone) to hit the ball but missed it. The wicketkeeper quickly removed the bails while the batsman was still out of the crease. Stumped — out!',
      confidence: 0.95,
    },
    dot_ball: {
      explanation: 'That was a dot ball — no runs scored from this delivery. The bowler did their job well, keeping the batsman quiet. In limited-overs cricket, dot balls build pressure on the batting side.',
      confidence: 0.9,
    },
    default: {
      explanation: 'That was an interesting moment in the match! The game continues to develop with each delivery as both teams compete fiercely.',
      confidence: 0.7,
    },
  },
  football: {
    goal: {
      explanation: 'GOAL! The ball has crossed the goal line completely between the posts and under the crossbar. That counts as a goal, and the scoring team is now one step closer to winning the match!',
      funFact: 'The fastest goal in professional football was scored in just 2.1 seconds!',
      confidence: 0.95,
    },
    yellow_card: {
      explanation: 'The referee showed a yellow card — that\'s an official warning for a foul or unsporting behavior. If the same player gets a second yellow card in the same match, they receive a red card and are sent off.',
      confidence: 0.95,
    },
    red_card: {
      explanation: 'RED CARD! The player is sent off and their team must play with one fewer player for the rest of the match. This is a huge blow — playing with 10 vs 11 is a massive disadvantage.',
      confidence: 0.95,
    },
    penalty: {
      explanation: 'A penalty kick! A foul was committed inside the penalty area, so the attacking team gets a free shot at goal from just 12 yards out, with only the goalkeeper to beat. It\'s a high-pressure moment!',
      confidence: 0.95,
    },
    foul: {
      explanation: 'The referee blew the whistle for a foul — an illegal challenge or unfair play. The other team gets a free kick from where the foul happened.',
      confidence: 0.9,
    },
    offside: {
      explanation: 'Offside! The attacking player was ahead of the second-to-last defender when the ball was passed to them. It\'s like a chess rule — you can\'t just camp near the goal waiting for the ball.',
      confidence: 0.95,
    },
    save: {
      explanation: 'What a save! The goalkeeper stopped what looked like a certain goal. Great reflexes and positioning kept the ball out of the net.',
      confidence: 0.9,
    },
    default: {
      explanation: 'The match continues with intense action. Both teams are competing for every ball.',
      confidence: 0.7,
    },
  },
};

// ── Q&A demo responses (keyword matching) ───────────────────

interface DemoQA {
  keywords: string[];
  response: QAResponse;
}

export const demoQAResponses: DemoQA[] = [
  {
    keywords: ['winning', 'who is winning', 'score', 'ahead'],
    response: {
      answer: 'Based on the current score, let me check... I can see the live score on screen. The team with more runs/goals is currently in the lead, but there\'s still plenty of match left!',
      followUp: 'Would you like to know about any specific player\'s performance?',
      confidence: 0.85,
    },
  },
  {
    keywords: ['lbw', 'leg before'],
    response: {
      answer: 'LBW stands for "Leg Before Wicket." If the ball hits the batsman\'s pad and the umpire thinks it would have hit the stumps, the batsman is out. Think of it as blocking the goal with your body in football — it\'s not allowed!',
      followUp: 'Want to know about other ways a batsman can get out?',
      confidence: 0.95,
    },
  },
  {
    keywords: ['foul', 'why was that a foul'],
    response: {
      answer: 'A foul is called when a player makes illegal physical contact or plays unfairly. Common fouls include tripping, pushing, or tackling from behind. The fouled team gets a free kick from where it happened.',
      followUp: 'Would you like to know the difference between a yellow and red card?',
      confidence: 0.9,
    },
  },
  {
    keywords: ['offside', 'what is offside'],
    response: {
      answer: 'Offside means the attacker was closer to the goal than the second-to-last defender when the ball was passed to them. It prevents players from just standing near the goal waiting for a pass. The other team gets a free kick.',
      followUp: 'Should I explain what happens after an offside is called?',
      confidence: 0.95,
    },
  },
  {
    keywords: ['wicket', 'out', 'how many ways'],
    response: {
      answer: 'In cricket, a batsman can get out in 10 different ways! The most common are: caught, bowled, LBW, run out, and stumped. Each has its own rules, but they all mean the batsman has to leave the field.',
      followUp: 'Want me to explain any specific type of dismissal?',
      confidence: 0.9,
    },
  },
  {
    keywords: ['boundary', 'four', 'six', 'difference'],
    response: {
      answer: 'A Four means the ball reached the boundary by rolling or bouncing along the ground — 4 runs! A Six means the ball cleared the boundary without bouncing — 6 runs! Sixes are harder to hit and much more exciting.',
      confidence: 0.95,
    },
  },
  {
    keywords: ['penalty', 'spot kick'],
    response: {
      answer: 'A penalty kick is awarded when a foul happens inside the 18-yard penalty box. The ball is placed on the penalty spot, 12 yards from goal. Only the goalkeeper can try to stop it — everyone else must stay outside the box until the kick is taken.',
      confidence: 0.95,
    },
  },
  {
    keywords: ['substitution', 'sub', 'replace'],
    response: {
      answer: 'A substitution is when a manager replaces one player with another during the match. In most leagues, each team gets 5 substitutions. Managers use them tactically — to bring on fresh legs, change formation, or protect a player from injury.',
      confidence: 0.9,
    },
  },
];

/**
 * Find the best matching demo Q&A response for a question.
 */
export function findDemoQAResponse(question: string): QAResponse {
  const lowerQ = question.toLowerCase();
  for (const dqa of demoQAResponses) {
    if (dqa.keywords.some((k) => lowerQ.includes(k))) {
      return dqa.response;
    }
  }
  return {
    answer: `That's a great question! In the context of this match, I'd say things are looking very competitive. Both teams are giving their all and every moment counts.`,
    followUp: 'Try asking about a specific rule or player!',
    confidence: 0.6,
  };
}

// ── Demo highlights ─────────────────────────────────────────

export const demoCricketHighlights: HighlightsResponse = {
  summary: 'An explosive powerplay saw India race to 54/3 in 5 overs. Rohit Sharma blazed a stunning 52 off 24 balls with 3 fours and 2 sixes before falling LBW. Australia fought back with 3 wickets, keeping the contest alive.',
  highlights: [
    { eventId: 'evt-2', timestamp: '0.2', title: 'Rohit Opens Up', description: 'Rohit Sharma punches Starc through cover for the first boundary of the match.', significance: 2 },
    { eventId: 'evt-7', timestamp: '1.1', title: 'Massive Six!', description: 'Rohit launches Hazlewood over long-on for a colossal six into the stands.', significance: 3 },
    { eventId: 'evt-12', timestamp: '1.6', title: 'Kohli Falls!', description: 'Virat Kohli edges Hazlewood to keeper Carey. India lose their first wicket at 20.', significance: 3 },
    { eventId: 'evt-22', timestamp: '3.3', title: 'SKY Goes Big', description: 'Suryakumar Yadav dances down the track and launches Zampa for six over long-off.', significance: 3 },
    { eventId: 'evt-27', timestamp: '4.5', title: 'Captain Departs', description: 'Starc nails a yorker to trap Rohit LBW for a brilliant 52. End of a superb innings.', significance: 3 },
  ],
};

export const demoFootballHighlights: HighlightsResponse = {
  summary: 'A thrilling encounter at the Emirates! Arsenal beat Manchester City 3-2 in a match that had everything — stunning goals, a red card, and a dramatic late winner from Martinelli. Saka scored twice to lead the Gunners.',
  highlights: [
    { eventId: 'evt-4', timestamp: "15'", title: 'Saka Strikes First', description: 'Bukayo Saka curls a beauty from the edge of the box to give Arsenal the lead.', significance: 3 },
    { eventId: 'evt-8', timestamp: "34'", title: 'De Bruyne Equalizes', description: 'Kevin De Bruyne bends a free kick over the wall and into the top corner. 1-1.', significance: 3 },
    { eventId: 'evt-11', timestamp: "43'", title: 'Saka From the Spot', description: 'Saka coolly converts the penalty to restore Arsenal\'s lead before half time.', significance: 3 },
    { eventId: 'evt-18', timestamp: "78'", title: 'Walker Sees Red', description: 'Kyle Walker gets a second yellow — City reduced to 10 men in a crucial moment.', significance: 3 },
    { eventId: 'evt-19', timestamp: "85'", title: 'Martinelli Wins It!', description: 'Gabriel Martinelli fires across Ederson to make it 3-2. The Emirates erupts!', significance: 3 },
  ],
};

// ── Demo stat insights ──────────────────────────────────────

export const demoStatInsights: Record<string, StatInsight> = {
  'ind-1': {
    playerId: 'ind-1',
    playerName: 'Rohit Sharma',
    insight: 'Rohit is in devastating form, striking at 216.67 with 3 fours and 2 sixes — his aggressive intent has set the tone for India\'s powerplay.',
    statLine: '52 runs off 24 balls, SR 216.67',
  },
  'ind-2': {
    playerId: 'ind-2',
    playerName: 'Virat Kohli',
    insight: 'Kohli looked elegant in his brief stay, but Hazlewood found the edge — a rare early dismissal for the maestro.',
    statLine: '5 runs off 4 balls',
  },
  'ind-3': {
    playerId: 'ind-3',
    playerName: 'Suryakumar Yadav',
    insight: 'SKY played his trademark audacious shots including a reverse scoop, but his aggressive approach cost him when he was stumped going for another big hit.',
    statLine: '11 runs off 5 balls',
  },
  'ars-1': {
    playerId: 'ars-1',
    playerName: 'Bukayo Saka',
    insight: 'Saka has been Arsenal\'s match-winner with two clinical finishes — a curling long-range effort and a composed penalty. He\'s been unplayable on the right wing.',
    statLine: '2 goals, 3 shots on target',
  },
  'mc-2': {
    playerId: 'mc-2',
    playerName: 'Kevin De Bruyne',
    insight: 'De Bruyne produced a moment of magic with his free kick but City couldn\'t build on his equalizer. His passing range has been the main creative threat.',
    statLine: '1 goal, 87% pass accuracy',
  },
};
