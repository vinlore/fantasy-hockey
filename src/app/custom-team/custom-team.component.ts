import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomTeamService } from '../services/custom-team.service';

import { CustomTeam } from '../models/custom-team';

@Component({
    selector: 'app-custom-team',
    templateUrl: './custom-team.component.html',
    styleUrls: ['./custom-team.component.css'],
    providers: [CustomTeamService]
})
export class CustomTeamComponent implements OnInit {

    team: CustomTeam;
    errorMsg: string;

    constructor(
        private customTeamService: CustomTeamService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getTeam();
    }

    getTeam(): void {
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this.customTeamService.getTeam(id).subscribe(
                team => this.team = team,
                error => this.errorMsg = error
                )
        })
    }

}
