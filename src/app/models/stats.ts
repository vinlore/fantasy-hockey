export abstract class Stats {
    id: number;
    player_id: number;
    goals: number;
    assists: number;
    gamesPlayed: number;
    penaltyMins: number;

    constructor(stats) {
        this.id = stats.id;
        this.player_id = stats.player;
        this.goals = stats.goals;
        this.assists = stats.assists;
        this.gamesPlayed = stats.games_played;
        this.penaltyMins = stats.penalty_minutes;
    }
}

export class SkaterStats extends Stats {
    gwg: number;
    plusMinus: number;
    ppGoals: number;
    ppAssists: number;
    shGoals: number;
    shAssists: number;
    shots: number;
    penaltyMins: number;
    blocks: number;
    hits: number;
    takeaways: number;
    faceoffsWon: number;
    faceoffsLost: number;
    shotsPerGame: number;
    pointsPerGame: number;
    toiPerGame: number;
    shiftsPerGame: number;
    shootPct: number;
    faceoffPct: number;

    constructor(private stats) {
        super(stats);
        this.gwg = stats.gwg;
        this.plusMinus = stats.plus_minus;
        this.ppGoals = stats.pp_goals;
        this.ppAssists = stats.pp_assists;
        this.shGoals = stats.sh_goals;
        this.shAssists = stats.sh_assists;
        this.shots = stats.shots;
        this.blocks = stats.blocked_shots;
        this.hits = stats.hits;
        this.takeaways = stats.takeaways;
        this.faceoffsWon = stats.faceoffs_won;
        this.faceoffsLost = stats.faceoffs_lost;
        this.shotsPerGame = stats.shot_per_game;
        this.pointsPerGame = stats.points_per_game;
        this.toiPerGame = stats.toi_per_game;
        this.shiftsPerGame = stats.shifts_per_game;
        this.shootPct = stats.shoot_pct;
        this.faceoffPct = stats.faceoff_pct;
    }
}

export class GoalieStats extends Stats {
    gamesStarted: number;
    goalsAgainst: number;
    gaa: number;
    losses: number;
    otLosses: number;
    savePct: number;
    saves: number;
    shotsAgainst: number;
    shutouts: number;
    wins: number;

    constructor(private stats) {
        super(stats);
        this.gamesStarted = stats.games_started;
        this.goalsAgainst = stats.goals_against;
        this.gaa = stats.gaa;
        this.losses = stats.losses;
        this.otLosses = stats.ot_losses;
        this.savePct = stats.save_pct;
        this.saves = stats.saves;
        this.shotsAgainst = stats.shots_against;
        this.shutouts = stats.shutouts;
        this.wins = stats.wins;
    }
}