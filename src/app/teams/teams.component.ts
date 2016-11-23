import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TeamsService } from '../services/teams.service';

import { Team } from '../models/team';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css'],
    providers: [TeamsService],
})
export class TeamsComponent implements OnInit {

    category: String = 'league';
    teams: Team[] = [];

    errorMsg: string;

    constructor(private teamsService: TeamsService) { }

    ngOnInit() {
        this.getTeams();
    }

    getTeams() {
        return this.teamsService.getTeams()
            .subscribe(
            teams => this.teams = teams,
            error => this.errorMsg = error
            )
    }

}
