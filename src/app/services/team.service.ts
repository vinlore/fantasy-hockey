import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Team } from '../models/team';

@Injectable()
export class TeamService {

    teams: Team[] = [];

    constructor(private http: Http) { }

    getTeams(): Observable<Team[]> {
        return this.http.get('http://localhost:8000/api/teams')
            .map(response => {
                for (let team of response.json()) {
                    this.teams.push(new Team(team));
                }
                return this.teams;
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

    getTeamDetail(id): Observable<Team> {
        return this.http.get('http://localhost:8000/api/teams/' + id)
            .map(response => {
                return new Team(response.json());
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

}
