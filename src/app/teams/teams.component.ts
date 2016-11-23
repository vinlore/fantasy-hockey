import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TeamService } from '../services/team.service';

import { Team } from '../models/team';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css'],
    providers: [TeamService],
})
export class TeamsComponent implements OnInit {

    category: String = 'league';
    teams: Team[] = [];

    errorMsg: string;

    constructor(private teamService: TeamService, private router: Router) { }

    ngOnInit() {
        this.getTeams();
    }

    getTeams() {
        return this.teamService.getTeams()
            .subscribe(
            teams => this.teams = teams,
            error => this.errorMsg = error
            )
    }

    gotoTeam(id): void {
        this.router.navigate(['/teams', id]);
    }

}
