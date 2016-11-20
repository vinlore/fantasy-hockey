import { Stats, SkaterStats, GoalieStats } from './stats';

export class Player {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    position: string;
    shoots: string;
    number: number;
    teamId: number;
    team: string;
    age: number;
    weight: number;
    height: number;
    birthplace: string;
    birthdate: string;
    draftYear: number;
    draftNo: number;
    draftRound: number;
    stats: Stats;

    constructor(private player) {
        this.id = player.id;
        this.name = player.name;
        this.firstName = player.first_name;
        this.lastName = player.last_name;
        this.position = player.position;
        this.shoots = player.shoots;
        this.number = player.number;
        this.teamId = player.team_id;
        this.team = player.team_abbr;
        this.age = player.age;
        this.weight = player.weight;
        this.height = player.height;
        this.birthplace = player.birthplace;
        this.birthdate = player.birthdate;
        this.draftYear = player.draftYear;
        this.draftNo = player.draftNo;
        this.draftRound = player.draftRound;
        if (player.stats_year[0]) {
            if (player.position === 'G') {
                this.stats = new GoalieStats(player.stats_year[0]);
            } else {
                this.stats = new SkaterStats(player.stats_year[0]);
            }
        } else {
            this.stats = {} as Stats;
        }
    }
}