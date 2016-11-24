import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TeamService } from '../services/team.service';

import { Team } from '../models/team';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.css'],
    providers: [TeamService],
})
export class TeamDetailComponent implements OnInit {

    team: Team;
    errorMsg: string;

    constructor(
        private teamService: TeamService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getTeam();
    }

    getTeam(): void {
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this.teamService.getTeamDetail(id).subscribe(
                team => this.team = team,
                error => this.errorMsg = error
                )
        })
    }

}
