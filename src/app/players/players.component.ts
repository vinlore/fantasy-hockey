import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { PlayerService } from '../services/player.service';
import { CustomTeamService } from '../services/custom-team.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

import { Player } from '../models/player';
import { CustomTeam } from '../models/custom-team';

@Component({
    selector: 'players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css'],
    providers: [PlayerService, CustomTeamService],
})
export class PlayersComponent implements OnInit {

    loggedIn: boolean;
    subscription: Subscription;
    playersSize: number = 0;
    pageSize: number = 30;
    page: number = 1;
    players: Player[] = [];
    errorMsg: string;
    teams: CustomTeam[];

    constructor(
        private playerService: PlayerService,
        private customTeamService: CustomTeamService,
        private authService: AuthService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        this.getPlayers();
        this.subscription = this.authService.isLoggedIn$
            .subscribe(loggedIn => {
                this.loggedIn = loggedIn;
                if (loggedIn) {
                    this.getTeams();
                }
            });
        if (this.loggedIn) {
            this.getTeams();
        }
    }

    getPlayers() {
        this.playerService.getPlayers()
            .subscribe(
            players => { this.players = players; this.playersSize = this.players.length },
            error => this.errorMsg = error
            );
    }

    getTeams() {
        this.customTeamService.getTeams()
            .subscribe(
            teams => this.teams = teams,
            error => this.errorMsg = error
            )
    }

    addPlayer(team: CustomTeam, player: Player) {
        this.customTeamService.addPlayer(team, player)
            .subscribe(
                result => {
                    if (result === 'OK')
                        this.alertService.addAlert('success', player.name + ' was added to ' + team.name + '.');
                },
                error => {
                    if (error._body === 'duplicate_player') {
                        this.alertService.addAlert('danger', player.name + ' is already on ' + team.name + '.');
                    } else {
                        this.alertService.addAlert('danger', 'An error had occurred.');
                    }
                }
            )
    }

}
