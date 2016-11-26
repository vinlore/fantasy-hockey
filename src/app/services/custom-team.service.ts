import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { CustomTeam } from '../models/custom-team';

@Injectable()
export class CustomTeamService {

    constructor(private router: Router, private http: AuthHttp) { }

    createTeam(team) {
        return this.http.post('http://localhost:8000/api/custom-teams', JSON.stringify({name: team}))
            .map(response => {
                let token =response.headers.get('Authorization').replace('Bearer ', '');
                if (token)
                    localStorage.setItem('id_token', token);
                return new CustomTeam(response.json());
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

}
