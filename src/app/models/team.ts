import { Player } from './player';

export class Team {
    id: number;
    abbr: string;
    name: string;
    division: string;
    conference: string;
    goalsAgainst: number;
    goalsFor: number;
    points: number;
    divisionRank: number;
    conferenceRank: number;
    leagueRank: number;
    wins: number;
    losses: number;
    otLosses: number;
    gamesPlayed: number;
    streak: string;
    homeRecord: string;
    awayRecord: string;
    lastTenRecord: string;
    atlanticRecord: string;
    pacificRecord: string;
    centralRecord: string;
    eastRecord: string;
    westRecord: string;
    imgUrl: string;
    players: Player[];

    constructor(private team) {
        this.id = team.id;
        this.abbr = team.team_abbr;
        this.name = team.name;
        this.division = team.division;
        this.conference = team.conference;
        this.goalsAgainst = team.goals_against;
        this.goalsFor = team.goals_for;
        this.points = team.points;
        this.divisionRank = team.division_rank;
        this.conferenceRank = team.conference_rank;
        this.leagueRank = team.league_rank;
        this.wins = team.wins;
        this.losses = team.losses;
        this.otLosses = team.ot_losses;
        this.gamesPlayed = team.games_played;
        this.streak = team.streak;
        this.homeRecord = team.home_record;
        this.awayRecord = team.away_record;
        this.lastTenRecord = team.last_ten_record;
        this.atlanticRecord = team.atlantic_record;
        this.pacificRecord = team.pacific_record;
        this.centralRecord = team.central_record;
        this.eastRecord = team.east_record;
        this.westRecord = team.west_record;
        this.imgUrl = 'https://www-league.nhlstatic.com/builds/site-core/df9488943d10a2f8ee1599b5190c7c84e8b21fb6_1478183431/images/team/logo/current/' + team.id + '_dark.svg';
        this.players = [];
        if (team.players) {
            for (let player of team.players) {
                this.players.push(new Player(player));
            }
        }
    }
}
