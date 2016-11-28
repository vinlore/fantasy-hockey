import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { CustomTeam } from '../models/custom-team';

@Injectable()
export class CustomTeamService {

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
            .map(response => {
                return response.json() as CustomTeam[];
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

}
