import { Player } from './player';

export class CustomTeam {
    id: number;
    userId: number;
    name: string;
    players: Player[];

    constructor(team) {
        this.id = team.id;
        this.userId = team.user_id;
        this.name = team.name;
        this.players = [];
        if (team.players) {
            for (let player of team.players) {
                this.players.push(new Player(player));
            }
        }
    }
}
