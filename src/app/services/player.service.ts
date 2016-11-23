import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Player } from '../models/player';

import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {

    players: Player[] = [];

    constructor(private http: Http) { }

    getPlayers(): Observable<Player[]> {
        return this.http.get('http://localhost:8000/api/players')
            .map(response => {
                for (let player of response.json()) {
                    this.players.push(new Player(player));
                }
                return this.players;
            }).catch(error => {
                console.log(error);
                return Observable.throw(error);
            })
    }

}
