// ═══════════════════════════════════════════════════════════════
// PlayPal — Web Demo Application
// Live match simulation + AI Explain panel
// ═══════════════════════════════════════════════════════════════

(() => {
  'use strict';

  // ── Data: Cricket Match (India vs Australia T20) ─────────────

  const cricketEvents = [
    // Over 1: Starc to Rohit
    { delay: 2000, matchTime: '0.1', type: 'dot_ball', title: 'Dot Ball', description: 'Starc bowls a sharp bouncer, Rohit ducks under it. Good start from Starc.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 0, wickets: 0, overs: 0, balls: 1, extras: 0 } },
    { delay: 4000, matchTime: '0.2', type: 'boundary_four', title: 'FOUR!', description: 'Rohit punches through cover! Beautiful timing, racing to the boundary.', player: 'Rohit Sharma', team: 'India', isKeyMoment: true, significance: 2, scoreUpdate: { runs: 4, wickets: 0, overs: 0, balls: 2, extras: 0 }, stateUpdate: {} },
    { delay: 4000, matchTime: '0.3', type: 'single', title: 'Single', description: 'Tucked off the pads to midwicket for a quick single.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 5, wickets: 0, overs: 0, balls: 3, extras: 0 }, stateUpdate: { currentBatsman: 'Virat Kohli' } },
    { delay: 3500, matchTime: '0.4', type: 'dot_ball', title: 'Dot Ball', description: 'Starc fires a yorker, Kohli digs it out. Excellent delivery.', player: 'Virat Kohli', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 5, wickets: 0, overs: 0, balls: 4, extras: 0 } },
    { delay: 4500, matchTime: '0.5', type: 'boundary_four', title: 'FOUR!', description: 'Kohli drives elegantly through mid-off! Classic shot.', player: 'Virat Kohli', team: 'India', isKeyMoment: true, significance: 2, scoreUpdate: { runs: 9, wickets: 0, overs: 0, balls: 5, extras: 0 } },
    { delay: 3000, matchTime: '0.6', type: 'single', title: 'Single', description: 'Quick single to end the over. India off to a solid start.', player: 'Virat Kohli', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 10, wickets: 0, overs: 1, balls: 6, extras: 0 }, stateUpdate: { currentBatsman: 'Rohit Sharma', currentBowler: 'Josh Hazlewood' } },

    // Over 2: Hazlewood to Rohit
    { delay: 5000, matchTime: '1.1', type: 'boundary_six', title: 'SIX! 🚀', description: 'Rohit launches Hazlewood over long-on! Massive hit into the stands!', player: 'Rohit Sharma', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 16, wickets: 0, overs: 1, balls: 7, extras: 0 } },
    { delay: 4000, matchTime: '1.2', type: 'dot_ball', title: 'Dot Ball', description: 'Good length outside off, Rohit leaves it alone. Discipline.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 16, wickets: 0, overs: 1, balls: 8, extras: 0 } },
    { delay: 3500, matchTime: '1.3', type: 'wide', title: 'Wide!', description: 'Hazlewood strays down leg. Umpire signals wide.', player: 'Josh Hazlewood', team: 'Australia', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 17, wickets: 0, overs: 1, balls: 8, extras: 1 } },
    { delay: 4000, matchTime: '1.4', type: 'double', title: 'Two Runs', description: 'Driven to long-off, sharp running between the wickets for two.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 19, wickets: 0, overs: 1, balls: 9, extras: 1 } },
    { delay: 3000, matchTime: '1.5', type: 'single', title: 'Single', description: 'Dabbed to third man for one.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 20, wickets: 0, overs: 1, balls: 10, extras: 1 }, stateUpdate: { currentBatsman: 'Virat Kohli' } },
    { delay: 5000, matchTime: '1.6', type: 'wicket', title: 'WICKET! CAUGHT! 💥', description: 'Kohli edges Hazlewood to the keeper! Alex Carey takes a sharp catch. India lose their first wicket!', player: 'Virat Kohli', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 20, wickets: 1, overs: 2, balls: 11, extras: 1 }, stateUpdate: { currentBatsman: 'Suryakumar Yadav', currentBowler: 'Pat Cummins' } },

    // Over 3: Cummins to SKY
    { delay: 4000, matchTime: '2.1', type: 'dot_ball', title: 'Dot Ball', description: 'Cummins bowls a peach! Just outside off, SKY leaves it.', player: 'Suryakumar Yadav', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 20, wickets: 1, overs: 2, balls: 12, extras: 1 } },
    { delay: 5000, matchTime: '2.2', type: 'boundary_four', title: 'FOUR! 🏏', description: 'SKY plays the reverse scoop! Audacious shot over the keeper. The crowd goes wild!', player: 'Suryakumar Yadav', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 24, wickets: 1, overs: 2, balls: 13, extras: 1 } },
    { delay: 3500, matchTime: '2.3', type: 'single', title: 'Single', description: 'Pushed to mid-on for a quick single.', player: 'Suryakumar Yadav', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 25, wickets: 1, overs: 2, balls: 14, extras: 1 }, stateUpdate: { currentBatsman: 'Rohit Sharma' } },
    { delay: 4000, matchTime: '2.4', type: 'boundary_six', title: 'SIX! 🚀', description: 'Rohit goes big again! Pulls Cummins over deep square leg. Colossal!', player: 'Rohit Sharma', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 31, wickets: 1, overs: 2, balls: 15, extras: 1 } },
    { delay: 3000, matchTime: '2.5', type: 'single', title: 'Single', description: 'Quick single to keep the strike.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 32, wickets: 1, overs: 2, balls: 16, extras: 1 }, stateUpdate: { currentBatsman: 'Suryakumar Yadav' } },
    { delay: 4500, matchTime: '2.6', type: 'boundary_four', title: 'FOUR!', description: 'SKY flicks off the pads through midwicket! Racing away to the fence.', player: 'Suryakumar Yadav', team: 'India', isKeyMoment: true, significance: 2, scoreUpdate: { runs: 36, wickets: 1, overs: 3, balls: 17, extras: 1 }, stateUpdate: { currentBowler: 'Adam Zampa' } },

    // Over 4: Zampa to Rohit
    { delay: 5000, matchTime: '3.1', type: 'dot_ball', title: 'Dot Ball', description: 'Zampa flights it up, Rohit comes down the track but misses. Close!', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 36, wickets: 1, overs: 3, balls: 18, extras: 1 } },
    { delay: 3500, matchTime: '3.2', type: 'single', title: 'Single', description: 'Worked to square leg for one.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 37, wickets: 1, overs: 3, balls: 19, extras: 1 }, stateUpdate: { currentBatsman: 'Suryakumar Yadav' } },
    { delay: 4000, matchTime: '3.3', type: 'boundary_six', title: 'SIX! 🚀', description: 'SKY dances down the track and launches Zampa over long-off! What a player!', player: 'Suryakumar Yadav', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 43, wickets: 1, overs: 3, balls: 20, extras: 1 } },
    { delay: 4500, matchTime: '3.4', type: 'wicket', title: 'WICKET! STUMPED! 💥', description: 'SKY goes for another big shot but misses! Carey whips off the bails in a flash. Stumped!', player: 'Suryakumar Yadav', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 43, wickets: 2, overs: 3, balls: 21, extras: 1 }, stateUpdate: { currentBatsman: 'KL Rahul' } },
    { delay: 3000, matchTime: '3.5', type: 'dot_ball', title: 'Dot Ball', description: 'Rahul defends solidly on the front foot. Settling in.', player: 'KL Rahul', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 43, wickets: 2, overs: 3, balls: 22, extras: 1 } },
    { delay: 4000, matchTime: '3.6', type: 'single', title: 'Single', description: 'Nudged to midwicket. India 44/2 after 4 overs.', player: 'KL Rahul', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 44, wickets: 2, overs: 4, balls: 23, extras: 1 }, stateUpdate: { currentBatsman: 'Rohit Sharma', currentBowler: 'Mitchell Starc' } },

    // Over 5: Rohit's fifty
    { delay: 4000, matchTime: '4.1', type: 'boundary_four', title: 'FOUR! FIFTY! 🎯', description: 'Rohit cuts Starc past point! That brings up his FIFTY off just 20 balls!', player: 'Rohit Sharma', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 48, wickets: 2, overs: 4, balls: 24, extras: 1 } },
    { delay: 3500, matchTime: '4.2', type: 'single', title: 'Single', description: 'Single to deep cover.', player: 'Rohit Sharma', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 49, wickets: 2, overs: 4, balls: 25, extras: 1 }, stateUpdate: { currentBatsman: 'KL Rahul' } },
    { delay: 4000, matchTime: '4.3', type: 'boundary_four', title: 'FOUR!', description: 'Rahul gets off the mark with a crisp drive through extra cover!', player: 'KL Rahul', team: 'India', isKeyMoment: true, significance: 2, scoreUpdate: { runs: 53, wickets: 2, overs: 4, balls: 26, extras: 1 } },
    { delay: 3000, matchTime: '4.4', type: 'single', title: 'Single', description: 'Pushed to mid-off for a single.', player: 'KL Rahul', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 54, wickets: 2, overs: 4, balls: 27, extras: 1 }, stateUpdate: { currentBatsman: 'Rohit Sharma' } },
    { delay: 5000, matchTime: '4.5', type: 'wicket', title: 'WICKET! LBW! 💥', description: 'Starc nails the yorker and traps Rohit LBW! The captain has to go for a brilliant 52. What an innings!', player: 'Rohit Sharma', team: 'India', isKeyMoment: true, significance: 3, scoreUpdate: { runs: 54, wickets: 3, overs: 4, balls: 28, extras: 1 }, stateUpdate: { currentBatsman: 'Hardik Pandya' } },
    { delay: 3500, matchTime: '4.6', type: 'dot_ball', title: 'Dot Ball', description: 'Pandya blocks to end the powerplay. India 54/3 after 5 overs.', player: 'Hardik Pandya', team: 'India', isKeyMoment: false, significance: 1, scoreUpdate: { runs: 54, wickets: 3, overs: 5, balls: 29, extras: 1 }, stateUpdate: { currentBowler: 'Cameron Green' } },
    { delay: 3000, matchTime: '5.0', type: 'over_end', title: 'End of Powerplay', description: 'India finish the powerplay at 54/3. Explosive start but Australia fought back with 3 wickets. Run rate: 10.8.', player: '', team: '', isKeyMoment: true, significance: 2, scoreUpdate: { runs: 54, wickets: 3, overs: 5, balls: 30, extras: 1 } },
  ];

  // ── Data: Football Match (Arsenal vs Man City) ───────────────

  const footballEvents = [
    { delay: 2000, matchTime: "1'", type: 'kick_off', title: 'Kick Off!', description: 'Arsenal kick off at the Emirates Stadium. A packed house for the top-of-table clash!', player: '', team: 'Arsenal', isKeyMoment: true, significance: 2, stateUpdate: { minute: 1 }, scoreUpdate: { home: 0, away: 0, possessionHome: 50, possessionAway: 50, shotsHome: 0, shotsAway: 0 } },
    { delay: 5000, matchTime: "8'", type: 'foul', title: 'Foul', description: 'Rodri brings down Saka with a tactical foul. Free kick to Arsenal.', player: 'Rodri', team: 'Manchester City', isKeyMoment: false, significance: 1, stateUpdate: { minute: 8 }, scoreUpdate: { home: 0, away: 0, possessionHome: 55, possessionAway: 45, shotsHome: 1, shotsAway: 0 } },
    { delay: 4000, matchTime: "12'", type: 'corner', title: 'Corner', description: 'Arsenal win a corner. Ødegaard to deliver.', player: 'Martin Ødegaard', team: 'Arsenal', isKeyMoment: false, significance: 1, stateUpdate: { minute: 12 } },
    { delay: 5000, matchTime: "15'", type: 'goal', title: '⚽ GOAL! Arsenal 1-0', description: "SAKA SCORES! Brilliant curling shot from the edge of the box after Ødegaard's corner was cleared. Unstoppable!", player: 'Bukayo Saka', team: 'Arsenal', isKeyMoment: true, significance: 3, stateUpdate: { minute: 15 }, scoreUpdate: { home: 1, away: 0, shotsHome: 2, shotsAway: 0, possessionHome: 52, possessionAway: 48 } },
    { delay: 5000, matchTime: "23'", type: 'save', title: 'Great Save!', description: 'Haaland heads powerfully but Ramsdale makes a stunning diving save!', player: 'Aaron Ramsdale', team: 'Arsenal', isKeyMoment: true, significance: 2, stateUpdate: { minute: 23 }, scoreUpdate: { home: 1, away: 0, shotsHome: 2, shotsAway: 2, possessionHome: 48, possessionAway: 52 } },
    { delay: 4500, matchTime: "28'", type: 'yellow_card', title: '🟨 Yellow Card', description: 'Rice goes in late on De Bruyne. Referee shows the yellow card immediately.', player: 'Declan Rice', team: 'Arsenal', isKeyMoment: true, significance: 2, stateUpdate: { minute: 28 } },
    { delay: 5000, matchTime: "34'", type: 'goal', title: '⚽ GOAL! Arsenal 1-1', description: 'DE BRUYNE EQUALIZES! A stunning free kick curled over the wall and into the top corner. Ramsdale had no chance!', player: 'Kevin De Bruyne', team: 'Manchester City', isKeyMoment: true, significance: 3, stateUpdate: { minute: 34 }, scoreUpdate: { home: 1, away: 1, shotsHome: 3, shotsAway: 4, possessionHome: 45, possessionAway: 55 } },
    { delay: 4000, matchTime: "38'", type: 'offside', title: 'Offside', description: 'Haaland caught offside. He was a yard ahead of the last defender.', player: 'Erling Haaland', team: 'Manchester City', isKeyMoment: false, significance: 1, stateUpdate: { minute: 38 } },
    { delay: 5000, matchTime: "42'", type: 'foul', title: 'Foul — Penalty Area!', description: 'Stones brings down Jesus in the box! Referee points to the spot!', player: 'John Stones', team: 'Manchester City', isKeyMoment: true, significance: 3, stateUpdate: { minute: 42 }, scoreUpdate: { home: 1, away: 1, shotsHome: 4, shotsAway: 5, possessionHome: 46, possessionAway: 54 } },
    { delay: 6000, matchTime: "43'", type: 'penalty', title: '⚽ PENALTY GOAL! Arsenal 2-1', description: 'SAKA sends Ederson the wrong way! Cool as you like from the spot. Arsenal retake the lead!', player: 'Bukayo Saka', team: 'Arsenal', isKeyMoment: true, significance: 3, stateUpdate: { minute: 43 }, scoreUpdate: { home: 2, away: 1, shotsHome: 5, shotsAway: 5, possessionHome: 47, possessionAway: 53 } },
    { delay: 3000, matchTime: "45+2'", type: 'half_time', title: 'Half Time', description: 'The referee blows for half time. Arsenal 2-1 Manchester City. What a first half!', player: '', team: '', isKeyMoment: true, significance: 2, stateUpdate: { minute: 45, half: 1 } },

    // Second Half
    { delay: 5000, matchTime: "46'", type: 'kick_off', title: 'Second Half', description: 'City kick off the second half. They need a goal to get back into this.', player: '', team: 'Manchester City', isKeyMoment: false, significance: 1, stateUpdate: { half: 2, minute: 46 } },
    { delay: 5000, matchTime: "52'", type: 'substitution', title: 'Substitution', description: 'Pep brings on Álvarez for Grealish. More firepower up front.', player: 'Julián Álvarez', team: 'Manchester City', isKeyMoment: false, significance: 1, stateUpdate: { minute: 52 } },
    { delay: 5000, matchTime: "58'", type: 'goal', title: '⚽ GOAL! Arsenal 2-2', description: 'FODEN SCORES! Brilliant team move — De Bruyne to Haaland, layoff to Foden who smashes it in. All square!', player: 'Phil Foden', team: 'Manchester City', isKeyMoment: true, significance: 3, stateUpdate: { minute: 58 }, scoreUpdate: { home: 2, away: 2, shotsHome: 6, shotsAway: 8, possessionHome: 42, possessionAway: 58 } },
    { delay: 4500, matchTime: "65'", type: 'yellow_card', title: '🟨 Yellow Card', description: 'Walker pulls back Martinelli who was clean through. Takes one for the team.', player: 'Kyle Walker', team: 'Manchester City', isKeyMoment: true, significance: 2, stateUpdate: { minute: 65 } },
    { delay: 5000, matchTime: "72'", type: 'save', title: 'Double Save!', description: 'Ramsdale denies Haaland twice in quick succession! Outstanding goalkeeping!', player: 'Aaron Ramsdale', team: 'Arsenal', isKeyMoment: true, significance: 2, stateUpdate: { minute: 72 }, scoreUpdate: { home: 2, away: 2, shotsHome: 7, shotsAway: 11, possessionHome: 40, possessionAway: 60 } },
    { delay: 5000, matchTime: "78'", type: 'red_card', title: '🟥 RED CARD!', description: 'Walker gets a second yellow for a reckless challenge on Saka! City down to 10 men!', player: 'Kyle Walker', team: 'Manchester City', isKeyMoment: true, significance: 3, stateUpdate: { minute: 78 } },
    { delay: 6000, matchTime: "85'", type: 'goal', title: '⚽ GOAL! Arsenal 3-2', description: 'MARTINELLI SCORES! He beats Dias on the wing and fires across Ederson into the far corner! The Emirates ERUPTS!', player: 'Gabriel Martinelli', team: 'Arsenal', isKeyMoment: true, significance: 3, stateUpdate: { minute: 85 }, scoreUpdate: { home: 3, away: 2, shotsHome: 9, shotsAway: 12, possessionHome: 44, possessionAway: 56 } },
    { delay: 4000, matchTime: "90+3'", type: 'full_time', title: 'Full Time!', description: 'FULL TIME! Arsenal 3-2 Manchester City! What an incredible match! Arsenal go top of the table!', player: '', team: '', isKeyMoment: true, significance: 3, stateUpdate: { minute: 90 } },
  ];

  // ── Data: AI Demo Responses ──────────────────────────────────

  const demoExplainResponses = {
    cricket: {
      boundary_four: {
        beginner: { explanation: 'The batsman hit the ball along the ground and it crossed the boundary rope, scoring 4 runs automatically. This is a great scoring shot that puts pressure on the bowling team.', funFact: 'A well-timed cover drive is considered the most elegant shot in cricket!', confidence: 0.95 },
        kid: { explanation: 'The batter whacked the ball really hard and it rolled all the way to the edge of the field — that\'s called the boundary! Because it touched the ground before going out, the team gets 4 points. It\'s like hitting a home run in baseball, but a bit smaller!', funFact: 'Some batters can hit the ball so hard it travels faster than a car on the highway! 🚗💨', confidence: 0.95 },
        expert: { explanation: 'A classical boundary stroke, finding the gap in the field placement. The batsman used the pace of the delivery, maintaining a vertical bat angle with impeccable timing. The field captain may need to reassess the field settings.', confidence: 0.95 },
      },
      boundary_six: {
        beginner: { explanation: 'The batsman launched the ball over the boundary rope without it bouncing — that\'s a massive SIX! The ball cleared the field and landed in the stands. This is the maximum runs from a single delivery.', funFact: 'The longest six ever recorded in cricket traveled over 158 meters!', confidence: 0.95 },
        kid: { explanation: 'WOW! The batter hit the ball SO high and SO far that it flew right over everyone and into the seats where the fans are sitting! That\'s called a SIX — the most points you can get from one hit! Imagine throwing a ball over your house — it\'s kinda like that! 🏠', funFact: 'Some sixes have landed outside the entire stadium! Can you imagine?', confidence: 0.95 },
        expert: { explanation: 'An outstanding aerial stroke, clearing the boundary with significant margin. The batsman got underneath the length, generating exceptional bat speed through the hitting zone. The bowler was taken out of his length, and this kind of intent in the powerplay can be match-defining.', confidence: 0.95 },
      },
      wicket: {
        beginner: { explanation: 'A wicket has fallen! The batsman is out and has to leave the field. A new batsman will come in to replace them. This is a crucial moment — the batting team just lost one of their limited batsmen.', confidence: 0.95 },
        kid: { explanation: 'Oh no! The batter is OUT! That means they have to stop playing and walk back to the bench. It\'s like getting "tagged out" in tag. A new batter comes in to replace them. The bowling team is really happy right now because they got someone out!', funFact: 'Each team only gets 10 outs — so every wicket is super important!', confidence: 0.95 },
        expert: { explanation: 'A critical dismissal at this juncture of the innings. The bowling team has made a crucial breakthrough, and the batting team will need to rebuild. The new batsman faces the challenge of adapting to the conditions while maintaining the required scoring rate.', confidence: 0.95 },
      },
      dot_ball: {
        beginner: { explanation: 'That was a dot ball — no runs scored from this delivery. The bowler did their job well, keeping the batsman quiet. In limited-overs cricket, dot balls build pressure on the batting side.', confidence: 0.9 },
        kid: { explanation: 'The bowler threw a really good ball and the batter couldn\'t score any runs! It\'s called a "dot ball" because they put a little dot in the scorebook. It\'s like when a pitcher throws a strike in baseball!', confidence: 0.9 },
        expert: { explanation: 'A well-executed delivery in the channel. Building dot ball pressure in the powerplay is crucial — research shows that consecutive dot balls significantly increase the probability of a wicket in the next 6 deliveries.', confidence: 0.9 },
      },
      wide: {
        beginner: { explanation: 'The bowler bowled too far from the batsman, so the umpire called it a "wide." This gives the batting team 1 extra run, and the bowler has to bowl the ball again! It doesn\'t count as one of the 6 balls in the over.', funFact: 'In a T20, being strict with wides helps keep the match tight and exciting!', confidence: 0.9 },
        kid: { explanation: 'Oops! The bowler threw the ball too far away from the batter! The umpire held out both arms to signal "WIDE!" That means the batting team gets a free point, and the bowler has to try again!', confidence: 0.9 },
        expert: { explanation: 'A wide delivery conceding an extra — poor execution from the bowler. In T20 cricket, every extra is magnified given the limited number of deliveries. The bowling captain will be unhappy with the lack of discipline.', confidence: 0.9 },
      },
      single: {
        beginner: { explanation: 'The batsman hit the ball and ran to the other end of the pitch, scoring 1 run. The batsmen swapped ends, so a different batsman will face the next delivery. Singles are the bread and butter of cricket scoring.', confidence: 0.85 },
        kid: { explanation: 'The batter tapped the ball and ran to the other end — that\'s 1 run! The two batters swap places, like trading spots. It\'s not as exciting as a four or six, but these singles add up!', confidence: 0.85 },
        expert: { explanation: 'Good placement to rotate the strike. Strike rotation is essential for maintaining momentum in the powerplay — keeping both batsmen engaged and not allowing the bowler to settle into a rhythm against one batsman.', confidence: 0.85 },
      },
      double: {
        beginner: { explanation: 'The batsman hit the ball into a gap and both batsmen ran back and forth twice, scoring 2 runs. Quick running between the wickets is an important skill in cricket.', confidence: 0.85 },
        kid: { explanation: 'The batter hit the ball and then ran back and forth TWICE! That\'s 2 runs! They had to run really fast to make it before the other team threw the ball back!', confidence: 0.85 },
        expert: { explanation: 'Excellent running between the wickets, converting a single into a double. This kind of intent puts pressure on the fielding side and keeps the scoring rate healthy.', confidence: 0.85 },
      },
      over_end: {
        beginner: { explanation: 'An over has been completed — that\'s 6 legal deliveries bowled. A new bowler will now bowl from the other end of the pitch. The batsmen stay where they are.', confidence: 0.85 },
        kid: { explanation: 'That\'s the end of 6 balls from this bowler! Now a different bowler comes in to throw from the other end. It\'s like switching pitchers in baseball!', confidence: 0.85 },
        expert: { explanation: 'End of the over. Time for the captain to rotate his bowling options. The field placements will likely change based on which batsman is on strike and the new bowler\'s strengths.', confidence: 0.85 },
      },
      default: {
        beginner: { explanation: 'That was an interesting moment in the match! The game continues to develop with each delivery as both teams compete fiercely.', confidence: 0.7 },
        kid: { explanation: 'Something cool just happened in the game! Both teams are trying really hard to win. Let\'s see what happens next!', confidence: 0.7 },
        expert: { explanation: 'The match situation continues to evolve. Both teams are engaged in a tactical battle with every delivery carrying weight in the context of the game.', confidence: 0.7 },
      },
    },
    football: {
      goal: {
        beginner: { explanation: 'GOAL! The ball has crossed the goal line completely between the posts and under the crossbar. That counts as a goal, and the scoring team is now one step closer to winning the match!', funFact: 'The fastest goal in professional football was scored in just 2.1 seconds!', confidence: 0.95 },
        kid: { explanation: 'GOOOAAAAL! 🎉 The ball went all the way into the net! That means the team scored a point! Everyone is jumping and celebrating! Scoring a goal is the BEST feeling in football!', funFact: 'Some celebrations are so cool that fans copy them on the playground!', confidence: 0.95 },
        expert: { explanation: 'Clinical finishing in the final third. The build-up play and movement off the ball created the space needed. The goalkeeper had little chance given the placement and power of the shot. The tactical implications of this goal shift the dynamic significantly.', confidence: 0.95 },
      },
      yellow_card: {
        beginner: { explanation: 'The referee showed a yellow card — that\'s an official warning for a foul or unsporting behavior. If the same player gets a second yellow card in the same match, they receive a red card and are sent off.', confidence: 0.95 },
        kid: { explanation: 'The referee held up a yellow card — that\'s like getting a warning at school! If the same player gets TWO yellow cards, they turn into a red card and the player has to leave the game! So they better be careful! ⚠️', confidence: 0.95 },
        expert: { explanation: 'A cautionable offence. The player committed a tactical foul to break up a promising counter-attack. With a yellow card, they\'ll need to be more measured in their challenges for the remainder — a second booking would be a pivotal moment.', confidence: 0.95 },
      },
      red_card: {
        beginner: { explanation: 'RED CARD! The player is sent off and their team must play with one fewer player for the rest of the match. This is a huge blow — playing with 10 vs 11 is a massive disadvantage.', confidence: 0.95 },
        kid: { explanation: 'RED CARD! 🟥 That means the player broke the rules badly and has to leave the field! Now their team only has 10 players against 11 — that\'s really hard! It\'s like playing a video game on EXTRA HARD mode!', confidence: 0.95 },
        expert: { explanation: 'A decisive red card that fundamentally alters the tactical landscape. The team will need to reorganize defensively — likely switching to a more compact shape. Historically, teams reduced to 10 men in this context concede in approximately 60% of remaining match time.', confidence: 0.95 },
      },
      penalty: {
        beginner: { explanation: 'A penalty kick! A foul was committed inside the penalty area, so the attacking team gets a free shot at goal from just 12 yards out, with only the goalkeeper to beat. It\'s a high-pressure moment!', confidence: 0.95 },
        kid: { explanation: 'PENALTY! The player gets to kick the ball at the goal from really close, and only the goalkeeper can try to stop it! It\'s like a free throw in basketball — a chance to score without anyone blocking! Everyone holds their breath! 😬', confidence: 0.95 },
        expert: { explanation: 'Penalty awarded after a foul in the 18-yard box. Conversion rate at the top level sits around 75-80%. The taker\'s technique — placement vs. power — and the goalkeeper\'s research on preferred sides will be critical in this pressure moment.', confidence: 0.95 },
      },
      foul: {
        beginner: { explanation: 'The referee blew the whistle for a foul — an illegal challenge or unfair play. The other team gets a free kick from where the foul happened.', confidence: 0.9 },
        kid: { explanation: 'Foul! That means someone pushed or tripped another player, which isn\'t allowed! The other team gets to kick the ball for free. Play fair, everyone! 🤝', confidence: 0.9 },
        expert: { explanation: 'A foul conceded, potentially tactical in nature to disrupt the opposition\'s momentum. The location and type of foul will determine whether this is a routine restart or a dangerous set-piece opportunity.', confidence: 0.9 },
      },
      offside: {
        beginner: { explanation: 'Offside! The attacking player was ahead of the second-to-last defender when the ball was passed to them. It\'s a rule to prevent players from just camping near the goal waiting for the ball.', confidence: 0.95 },
        kid: { explanation: 'Offside! The player was standing too close to the goal before the ball was kicked to them. It\'s like being "too early" — you have to wait for the right moment! The other team gets a free kick. ⏰', confidence: 0.95 },
        expert: { explanation: 'Offside flag raised — the attacker was beyond the second-to-last defender at the moment the ball was played. Modern defensive lines are coached to hold a high line specifically to catch opponents offside, compressing the space.', confidence: 0.95 },
      },
      save: {
        beginner: { explanation: 'What a save! The goalkeeper stopped what looked like a certain goal. Great reflexes and positioning kept the ball out of the net.', confidence: 0.9 },
        kid: { explanation: 'AMAZING SAVE! The goalkeeper dived and caught/blocked the ball just in time! They\'re like a superhero standing in front of the goal, protecting it from the other team! 🦸‍♂️', confidence: 0.9 },
        expert: { explanation: 'Exceptional shot-stopping from the keeper. The initial positioning allowed them to get a strong hand to the shot. The reaction time and technique — whether parrying to safety or holding — was crucial in this situation.', confidence: 0.9 },
      },
      kick_off: {
        beginner: { explanation: 'The match has started! Both teams are ready and the ball has been kicked to begin play. Let\'s see what unfolds!', confidence: 0.85 },
        kid: { explanation: 'The game has started! ⚽ One team kicks the ball to the other and now everyone\'s running around trying to get it! Let\'s go!', confidence: 0.85 },
        expert: { explanation: 'Kick-off. Both teams will look to establish their tactical shape early. The opening minutes often set the tempo for the match — pressing intensity and territorial dominance are key indicators to watch.', confidence: 0.85 },
      },
      corner: {
        beginner: { explanation: 'A corner kick! The defending team last touched the ball before it went out behind their own goal. The attacking team now gets to kick the ball from the corner flag towards the goal.', confidence: 0.85 },
        kid: { explanation: 'Corner kick! The ball went out near the goal, so the attacking team gets to kick it in from the corner. They\'ll try to kick it near the goal so their teammates can head it in! ⚽', confidence: 0.85 },
        expert: { explanation: 'Corner awarded. Set pieces account for roughly 30% of goals in top-flight football. The delivery, movement in the box, and defensive organization at this corner will be crucial.', confidence: 0.85 },
      },
      substitution: {
        beginner: { explanation: 'A substitution — one player is coming off and a new player is coming on. Managers use this to bring fresh energy or change their tactical approach.', confidence: 0.85 },
        kid: { explanation: 'Player swap! One player is tired so the coach sends in a fresh player to take their place. It\'s like tagging in a new teammate! The new player is full of energy! 💪', confidence: 0.85 },
        expert: { explanation: 'Tactical substitution. The manager is looking to change the dynamic — whether for fresh legs, a different tactical profile, or to exploit a perceived weakness in the opposition. Timing of substitutions often correlates with match outcomes.', confidence: 0.85 },
      },
      half_time: {
        beginner: { explanation: 'Half time! The first 45 minutes are over and the players get a 15-minute break. The managers will give team talks and potentially change tactics for the second half.', confidence: 0.9 },
        kid: { explanation: 'HALF TIME! The players get to rest and drink water. The coaches will tell them what to do better in the second half. It\'s like a timeout! ⏱️', confidence: 0.9 },
        expert: { explanation: 'Half-time whistle. Both managers will be assessing tactical adjustments. The data from the first half — xG, progressive passes, pressing efficiency — will inform second-half approaches. Personnel changes are likely.', confidence: 0.9 },
      },
      full_time: {
        beginner: { explanation: 'Full time! The match is over! After 90 minutes of intense action, the final whistle has blown and we have our result.', confidence: 0.95 },
        kid: { explanation: 'THE GAME IS OVER! 🎉 The referee blew the whistle for the last time. What an exciting match! Time to celebrate or try harder next time!', confidence: 0.95 },
        expert: { explanation: 'Full time. The result is confirmed. Post-match analysis will focus on the key tactical battles, individual performances, and pivotal moments that shaped the outcome.', confidence: 0.95 },
      },
      default: {
        beginner: { explanation: 'The match continues with intense action. Both teams are competing for every ball.', confidence: 0.7 },
        kid: { explanation: 'The game keeps going! Everyone is running around trying their best. Let\'s see what happens next! 🏃‍♂️', confidence: 0.7 },
        expert: { explanation: 'Play continues. The tactical battle evolves with each phase of play.', confidence: 0.7 },
      },
    },
  };

  // ── State ────────────────────────────────────────────────────

  const state = {
    sport: 'cricket',          // 'cricket' | 'football'
    mode: 'beginner',          // 'beginner' | 'kid' | 'expert'
    isPlaying: false,
    isPaused: false,
    speed: 1,
    eventIndex: 0,
    events: [],                // fired events
    timeoutId: null,
    activeEventId: null,       // currently selected event card id
    explainHistory: [],        // recent AI explanations

    // Cricket state
    cricketState: {
      runs: 0, wickets: 0, overs: 0, balls: 0, extras: 0, runRate: 0,
      currentBatsman: 'Rohit Sharma',
      currentBowler: 'Mitchell Starc',
      partnership: { runs: 0, balls: 0 },
    },

    // Football state
    footballState: {
      home: 0, away: 0,
      possessionHome: 50, possessionAway: 50,
      shotsHome: 0, shotsAway: 0,
      minute: 0, half: 1,
    },
  };

  // ── DOM References ───────────────────────────────────────────

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    // Header
    sportBtns: $$('.sport-btn'),
    modePills: $$('.mode-pill'),
    aiModeLabel: $('#ai-mode-label'),

    // Scoreboard
    liveBadge: $('#live-badge'),
    matchVenue: $('#match-venue'),
    scoreboardCricket: $('#scoreboard-cricket'),
    scoreboardFootball: $('#scoreboard-football'),

    // Cricket
    battingFlag: $('#batting-flag'),
    bowlingFlag: $('#bowling-flag'),
    battingName: $('#batting-name'),
    bowlingName: $('#bowling-name'),
    cricketScore: $('#cricket-score'),
    cricketOvers: $('#cricket-overs'),
    cricketRunrate: $('#cricket-runrate'),
    currentBatsman: $('#current-batsman'),
    currentBowler: $('#current-bowler'),
    partnership: $('#partnership'),

    // Football
    homeFlag: $('#home-flag'),
    awayFlag: $('#away-flag'),
    homeName: $('#home-name'),
    awayName: $('#away-name'),
    footballScore: $('#football-score'),
    footballMinute: $('#football-minute'),
    footballHalf: $('#football-half'),
    possessionFill: $('#possession-fill'),
    possessionText: $('#possession-text'),
    shotsText: $('#shots-text'),

    // Controls
    btnStart: $('#btn-start'),
    btnPause: $('#btn-pause'),
    btnReset: $('#btn-reset'),
    speedSlider: $('#speed-slider'),
    speedValue: $('#speed-value'),

    // Events
    eventsTimeline: $('#events-timeline'),
    eventsEmpty: $('#events-empty'),

    // AI Panel
    aiPlaceholder: $('#ai-placeholder'),
    aiContent: $('#ai-content'),
    aiExplain: $('#ai-explain'),
    aiEventBadge: $('#ai-event-badge'),
    aiConfidence: $('#ai-confidence'),
    aiExplainText: $('#ai-explain-text'),
    aiFunfact: $('#ai-funfact'),
    aiFunfactText: $('#ai-funfact-text'),
    aiHistoryList: $('#ai-history-list'),

    // Toast
    toast: $('#toast'),
    toastIcon: $('#toast-icon'),
    toastText: $('#toast-text'),
  };

  // ── Helpers ──────────────────────────────────────────────────

  function showToast(icon, text) {
    dom.toastIcon.textContent = icon;
    dom.toastText.textContent = text;
    dom.toast.classList.remove('hidden');
    requestAnimationFrame(() => dom.toast.classList.add('toast--visible'));
    setTimeout(() => {
      dom.toast.classList.remove('toast--visible');
      setTimeout(() => dom.toast.classList.add('hidden'), 400);
    }, 3000);
  }

  function getEventIcon(type) {
    const icons = {
      goal: '⚽', penalty: '⚽', boundary_four: '4️⃣', boundary_six: '6️⃣',
      wicket: '🔴', caught: '🔴', bowled: '🔴', lbw: '🔴', stumped: '🔴', run_out: '🔴',
      dot_ball: '⚫', single: '1️⃣', double: '2️⃣', triple: '3️⃣',
      wide: '↔️', no_ball: '❌', yellow_card: '🟨', red_card: '🟥',
      foul: '⚠️', corner: '🚩', free_kick: '🦶', offside: '🏳️',
      save: '🧤', substitution: '🔄', kick_off: '⚽', half_time: '⏱️',
      full_time: '🏁', over_end: '🔄',
    };
    return icons[type] || '📌';
  }

  // ── Scoreboard Updates ───────────────────────────────────────

  function updateCricketScoreboard() {
    const s = state.cricketState;
    const ballsInOver = s.balls % 6;
    const oversDisplay = `${s.overs}.${ballsInOver}`;
    const runRate = s.overs > 0 ? (s.runs / (s.overs + ballsInOver / 6)).toFixed(2) : '0.00';

    dom.cricketScore.textContent = `${s.runs}/${s.wickets}`;
    dom.cricketOvers.textContent = `Overs: ${oversDisplay}`;
    dom.cricketRunrate.textContent = `RR: ${runRate}`;
    dom.currentBatsman.textContent = s.currentBatsman;
    dom.currentBowler.textContent = s.currentBowler;
    dom.partnership.textContent = `${s.partnership.runs} (${s.partnership.balls})`;

    // Pulse animation
    dom.cricketScore.classList.add('score-pulse');
    setTimeout(() => dom.cricketScore.classList.remove('score-pulse'), 600);
  }

  function updateFootballScoreboard() {
    const s = state.footballState;
    dom.footballScore.textContent = `${s.home} — ${s.away}`;
    dom.footballMinute.textContent = `${s.minute}'`;
    dom.footballHalf.textContent = s.half === 1 ? '1st Half' : '2nd Half';
    dom.possessionFill.style.width = `${s.possessionHome}%`;
    dom.possessionText.textContent = `${s.possessionHome}% — ${s.possessionAway}%`;
    dom.shotsText.textContent = `${s.shotsHome} — ${s.shotsAway}`;

    dom.footballScore.classList.add('score-pulse');
    setTimeout(() => dom.footballScore.classList.remove('score-pulse'), 600);
  }

  // ── AI Explain ───────────────────────────────────────────────

  function showExplanation(eventData) {
    const sport = state.sport;
    const mode = state.mode;
    const type = eventData.type;

    const sportResponses = demoExplainResponses[sport] || demoExplainResponses.cricket;
    const typeResponses = sportResponses[type] || sportResponses.default;
    const response = typeResponses[mode] || typeResponses.beginner;

    // Hide placeholder, show explanation
    dom.aiPlaceholder.classList.add('hidden');
    dom.aiContent.classList.add('hidden');
    dom.aiExplain.classList.remove('hidden');

    // Re-trigger animation
    dom.aiExplain.style.animation = 'none';
    dom.aiExplain.offsetHeight; // force reflow
    dom.aiExplain.style.animation = '';

    dom.aiEventBadge.textContent = eventData.title.replace(/[⚽🟨🟥💥🚀🏏🎯]/g, '').trim();
    dom.aiConfidence.textContent = `${Math.round(response.confidence * 100)}% confident`;
    dom.aiExplainText.textContent = response.explanation;

    if (response.funFact) {
      dom.aiFunfact.classList.remove('hidden');
      dom.aiFunfactText.textContent = response.funFact;
    } else {
      dom.aiFunfact.classList.add('hidden');
    }

    // Add to history
    addToHistory(eventData, response);
  }

  function addToHistory(eventData, response) {
    state.explainHistory.unshift({
      title: eventData.title,
      preview: response.explanation.substring(0, 80) + '...',
      eventData,
      response,
    });

    // Keep max 8
    if (state.explainHistory.length > 8) state.explainHistory.pop();

    renderHistory();
  }

  function renderHistory() {
    dom.aiHistoryList.innerHTML = '';
    state.explainHistory.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'ai-history-item';
      el.innerHTML = `
        <div class="ai-history-item__title">${getEventIcon(item.eventData.type)} ${item.title}</div>
        <div class="ai-history-item__preview">${item.preview}</div>
      `;
      el.addEventListener('click', () => {
        showExplanation(item.eventData);
      });
      dom.aiHistoryList.appendChild(el);
    });
  }

  // ── Event Card Creation ──────────────────────────────────────

  function createEventCard(eventData, index) {
    const card = document.createElement('div');
    card.className = `event-card event-card--${eventData.type}`;
    if (eventData.significance === 3) card.classList.add('event-card--significance-3');
    card.dataset.index = index;
    card.id = `event-${index}`;

    const icon = getEventIcon(eventData.type);

    card.innerHTML = `
      <div class="event-card__time">
        <span class="event-card__time-value">${eventData.matchTime}</span>
        <span class="event-card__time-label">${state.sport === 'cricket' ? 'Over' : 'Min'}</span>
      </div>
      <div class="event-card__body">
        <div class="event-card__title">${icon} ${eventData.title}</div>
        <div class="event-card__desc">${eventData.description}</div>
        <div class="event-card__meta">
          ${eventData.player ? `<span class="event-card__player">${eventData.player}</span>` : ''}
          ${eventData.team ? `<span class="event-card__team">${eventData.team}</span>` : ''}
        </div>
      </div>
      <div class="event-card__explain-hint">
        ✨ Explain
      </div>
    `;

    card.addEventListener('click', () => {
      // Deselect previous
      const prev = document.querySelector('.event-card--active');
      if (prev) prev.classList.remove('event-card--active');

      card.classList.add('event-card--active');
      state.activeEventId = index;
      showExplanation(eventData);
    });

    return card;
  }

  // ── Match Simulation ─────────────────────────────────────────

  function getActiveEvents() {
    return state.sport === 'cricket' ? cricketEvents : footballEvents;
  }

  function processEvent(eventData) {
    if (state.sport === 'cricket') {
      const su = eventData.scoreUpdate;
      if (su) {
        if (su.runs !== undefined) state.cricketState.runs = su.runs;
        if (su.wickets !== undefined) state.cricketState.wickets = su.wickets;
        if (su.overs !== undefined) state.cricketState.overs = su.overs;
        if (su.balls !== undefined) state.cricketState.balls = su.balls;
        if (su.extras !== undefined) state.cricketState.extras = su.extras;
      }
      const stUp = eventData.stateUpdate;
      if (stUp) {
        if (stUp.currentBatsman) state.cricketState.currentBatsman = stUp.currentBatsman;
        if (stUp.currentBowler) state.cricketState.currentBowler = stUp.currentBowler;
        if (stUp.partnership) state.cricketState.partnership = stUp.partnership;
      }
      updateCricketScoreboard();
    } else {
      const su = eventData.scoreUpdate;
      if (su) {
        if (su.home !== undefined) state.footballState.home = su.home;
        if (su.away !== undefined) state.footballState.away = su.away;
        if (su.possessionHome !== undefined) state.footballState.possessionHome = su.possessionHome;
        if (su.possessionAway !== undefined) state.footballState.possessionAway = su.possessionAway;
        if (su.shotsHome !== undefined) state.footballState.shotsHome = su.shotsHome;
        if (su.shotsAway !== undefined) state.footballState.shotsAway = su.shotsAway;
      }
      const stUp = eventData.stateUpdate;
      if (stUp) {
        if (stUp.minute !== undefined) state.footballState.minute = stUp.minute;
        if (stUp.half !== undefined) state.footballState.half = stUp.half;
      }
      updateFootballScoreboard();
    }

    // Add event card
    const card = createEventCard(eventData, state.eventIndex);
    dom.eventsEmpty.classList.add('hidden');
    dom.eventsTimeline.appendChild(card);

    // Scroll to bottom
    requestAnimationFrame(() => {
      dom.eventsTimeline.scrollTop = dom.eventsTimeline.scrollHeight;
    });

    // Auto-explain key moments
    if (eventData.isKeyMoment || eventData.significance >= 2) {
      setTimeout(() => {
        const prev = document.querySelector('.event-card--active');
        if (prev) prev.classList.remove('event-card--active');
        card.classList.add('event-card--active');
        showExplanation(eventData);
      }, 300);
    }

    // Toast for big moments
    if (eventData.significance === 3) {
      showToast(getEventIcon(eventData.type), eventData.title);
    }

    state.events.push(eventData);
    state.eventIndex++;
  }

  function scheduleNextEvent() {
    const events = getActiveEvents();
    if (state.eventIndex >= events.length) {
      // Match ended
      state.isPlaying = false;
      dom.btnStart.classList.add('hidden');
      dom.btnPause.classList.add('hidden');
      dom.btnReset.classList.remove('hidden');
      dom.liveBadge.classList.remove('live-badge--visible');
      showToast('🏁', 'Match simulation complete!');
      return;
    }

    const eventData = events[state.eventIndex];
    const delay = eventData.delay / state.speed;

    state.timeoutId = setTimeout(() => {
      if (!state.isPlaying || state.isPaused) return;
      processEvent(eventData);
      scheduleNextEvent();
    }, delay);
  }

  function startMatch() {
    state.isPlaying = true;
    state.isPaused = false;
    dom.btnStart.classList.add('hidden');
    dom.btnPause.classList.remove('hidden');
    dom.btnReset.classList.remove('hidden');
    dom.liveBadge.classList.add('live-badge--visible');

    if (state.sport === 'cricket') {
      dom.matchVenue.textContent = 'T20 International — MCG, Melbourne';
    } else {
      dom.matchVenue.textContent = 'Premier League — Emirates Stadium, London';
    }

    scheduleNextEvent();
  }

  function pauseMatch() {
    if (state.isPaused) {
      // Resume
      state.isPaused = false;
      dom.btnPause.innerHTML = '<span class="btn__icon">⏸</span> Pause';
      scheduleNextEvent();
    } else {
      // Pause
      state.isPaused = true;
      clearTimeout(state.timeoutId);
      dom.btnPause.innerHTML = '<span class="btn__icon">▶</span> Resume';
    }
  }

  function resetMatch() {
    clearTimeout(state.timeoutId);
    state.isPlaying = false;
    state.isPaused = false;
    state.eventIndex = 0;
    state.events = [];
    state.activeEventId = null;
    state.explainHistory = [];

    // Reset cricket state
    state.cricketState = {
      runs: 0, wickets: 0, overs: 0, balls: 0, extras: 0, runRate: 0,
      currentBatsman: 'Rohit Sharma',
      currentBowler: 'Mitchell Starc',
      partnership: { runs: 0, balls: 0 },
    };

    // Reset football state
    state.footballState = {
      home: 0, away: 0,
      possessionHome: 50, possessionAway: 50,
      shotsHome: 0, shotsAway: 0,
      minute: 0, half: 1,
    };

    // Reset UI
    dom.btnStart.classList.remove('hidden');
    dom.btnPause.classList.add('hidden');
    dom.btnReset.classList.add('hidden');
    dom.btnPause.innerHTML = '<span class="btn__icon">⏸</span> Pause';
    dom.liveBadge.classList.remove('live-badge--visible');

    dom.eventsTimeline.innerHTML = '';
    dom.eventsTimeline.appendChild(dom.eventsEmpty);
    dom.eventsEmpty.classList.remove('hidden');

    dom.aiExplain.classList.add('hidden');
    dom.aiContent.classList.remove('hidden');
    dom.aiPlaceholder.classList.remove('hidden');
    dom.aiHistoryList.innerHTML = '';

    updateCricketScoreboard();
    updateFootballScoreboard();
  }

  // ── Sport Switching ──────────────────────────────────────────

  function switchSport(sport) {
    if (state.isPlaying) {
      resetMatch();
    }

    state.sport = sport;

    dom.sportBtns.forEach(btn => {
      btn.classList.toggle('sport-btn--active', btn.dataset.sport === sport);
    });

    if (sport === 'cricket') {
      dom.scoreboardCricket.classList.remove('hidden');
      dom.scoreboardFootball.classList.add('hidden');
      dom.battingFlag.className = 'team__flag team__flag--ind';
      dom.bowlingFlag.className = 'team__flag team__flag--aus';
      updateCricketScoreboard();
    } else {
      dom.scoreboardCricket.classList.add('hidden');
      dom.scoreboardFootball.classList.remove('hidden');
      dom.homeFlag.className = 'team__flag team__flag--ars';
      dom.awayFlag.className = 'team__flag team__flag--mci';
      updateFootballScoreboard();
    }
  }

  // ── Mode Switching ───────────────────────────────────────────

  function switchMode(mode) {
    state.mode = mode;
    dom.modePills.forEach(pill => {
      pill.classList.toggle('mode-pill--active', pill.dataset.mode === mode);
    });
    const modeLabels = { beginner: '👶 Beginner', kid: '🧒 Kid', expert: '🎓 Expert' };
    dom.aiModeLabel.textContent = `Mode: ${modeLabels[mode] || mode}`;

    // Re-explain current event if one is active
    if (state.activeEventId !== null && state.events[state.activeEventId]) {
      showExplanation(state.events[state.activeEventId]);
    }
  }

  // ── Event Listeners ──────────────────────────────────────────

  dom.sportBtns.forEach(btn => {
    btn.addEventListener('click', () => switchSport(btn.dataset.sport));
  });

  dom.modePills.forEach(pill => {
    pill.addEventListener('click', () => switchMode(pill.dataset.mode));
  });

  dom.btnStart.addEventListener('click', startMatch);
  dom.btnPause.addEventListener('click', pauseMatch);
  dom.btnReset.addEventListener('click', resetMatch);

  dom.speedSlider.addEventListener('input', (e) => {
    state.speed = parseFloat(e.target.value);
    dom.speedValue.textContent = `${state.speed}×`;
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      if (!state.isPlaying) {
        startMatch();
      } else {
        pauseMatch();
      }
    }
    if (e.key === 'r' || e.key === 'R') {
      resetMatch();
    }
    if (e.key === '1') switchMode('beginner');
    if (e.key === '2') switchMode('kid');
    if (e.key === '3') switchMode('expert');
    if (e.key === 'c' || e.key === 'C') switchSport('cricket');
    if (e.key === 'f' || e.key === 'F') switchSport('football');
  });

  // ── Initialize ───────────────────────────────────────────────

  function init() {
    switchSport('cricket');
    switchMode('beginner');
    updateCricketScoreboard();
    updateFootballScoreboard();

    // Set initial flag colors
    dom.battingFlag.className = 'team__flag team__flag--ind';
    dom.bowlingFlag.className = 'team__flag team__flag--aus';
    dom.homeFlag.className = 'team__flag team__flag--ars';
    dom.awayFlag.className = 'team__flag team__flag--mci';
  }

  init();

})();
