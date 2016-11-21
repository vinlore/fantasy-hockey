import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PlayersService } from '../services/players.service';

import { Player } from '../models/player';

@Component({
    selector: 'players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css'],
    providers: [PlayersService],
})
export class PlayersComponent implements OnInit {

    playersSize: number = 0;
    pageSize: number = 30;
    page: number = 1;
    players: Player[] = [];
    errorMsg: string;

    constructor(private playersService: PlayersService) { }

    ngOnInit() {
        this.getPlayers();
    }

    getPlayers() {
        this.playersService.getPlayers()
            .subscribe(
                players => { this.players = players; this.playersSize = this.players.length },
                error => this.errorMsg = error
            );
    }

}
