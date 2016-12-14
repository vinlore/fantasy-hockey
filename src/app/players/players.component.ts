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
    providers: [PlayerService],
})
export class PlayersComponent implements OnInit {

    loggedIn: boolean;
    loggedInSub: Subscription;
    customTeams: CustomTeam[];
    customTeamsSub: Subscription;
    customAvailTeams: CustomTeam[];
    playersSize: number = 0;
    pageSize: number = 30;
    page: number = 1;
    players: Player[] = [];
    errorMsg: string;

    constructor(
        private playerService: PlayerService,
        private customTeamService: CustomTeamService,
        private authService: AuthService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        this.getPlayers();
        this.loggedInSub = this.authService.isLoggedIn$
            .subscribe(loggedIn => {
                this.loggedIn = loggedIn;
            });
        this.customTeamsSub = this.customTeamService.customTeams$
            .subscribe(customTeams => {
                this.customTeams = customTeams;
            })
    }

    ngOnDestroy() {
        this.loggedInSub.unsubscribe();
        this.customTeamsSub.unsubscribe();
    }

    getPlayers() {
        this.playerService.getPlayers()
            .subscribe(
            players => { this.players = players; this.playersSize = this.players.length },
            error => this.errorMsg = error
            );
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

    getAvailTeams(playerId) {
        this.customAvailTeams = [];
        this.customTeamService.getAvailTeams(playerId)
            .subscribe(
                teams => this.customAvailTeams = teams,
                error => {

                }
            )
    }

}
