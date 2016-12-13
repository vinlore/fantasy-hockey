import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { CustomTeam } from '../models/custom-team';
import { Player } from '../models/player';

@Injectable()
export class CustomTeamService {

    customTeams = new ReplaySubject<CustomTeam[]>();
    customTeams$ = this.customTeams.asObservable();

    constructor(
        private router: Router,
        private http: AuthHttp,
        private authService: AuthService,
    ) { }

    createTeam(team) {
        return this.http.post('http://localhost:8000/api/custom-teams', JSON.stringify({ name: team }))
            .map(response => {
                return new CustomTeam(response.json());
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

    getTeams() {
        return this.http.get('http://localhost:8000/api/custom-teams')
            .toPromise().then(response => {
                this.customTeams.next(response.json() as CustomTeam[]);
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

    getTeam(id) {
        return this.http.get('http://localhost:8000/api/custom-teams/' + id)
            .map(response => {
                return new CustomTeam(response.json());
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

    addPlayer(team: CustomTeam, player: Player) {
        let url = 'http://localhost:8000/api/custom-teams/' + team.id + '/players/' + player.id;
        return this.http.post(url, {})
            .map(response => {
                return response.json().data;
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

}
