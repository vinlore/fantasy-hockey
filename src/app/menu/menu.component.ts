import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CustomTeamService } from '../services/custom-team.service';

import { CustomTeam } from '../models/custom-team';

@Component({
    selector: 'nav-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [CustomTeamService]
})
export class MenuComponent implements OnInit {

    loggedIn: boolean;
    subscription: Subscription;
    username: string;
    errorMsg: string;
    teamName: string;
    teams: CustomTeam[];

    constructor(
        private authService: AuthService,
        private customTeamService: CustomTeamService,
        private router: Router
    ) { }

    ngOnInit() {
        this.subscription = this.authService.isLoggedIn$
            .subscribe(loggedIn => {
                this.loggedIn = loggedIn;
                if (loggedIn) {
                    this.getTeams();
                }
            });
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    createTeam(f: NgForm) {
        if (f.valid && this.loggedIn) {
            this.customTeamService.createTeam(this.teamName)
                .subscribe(
                team => this.router.navigate(['/custom-teams', team.id]),
                error => this.errorMsg = error
                )
        }
    }

    getTeams() {
        if (this.loggedIn) {
            this.customTeamService.getTeams()
                .subscribe(
                teams => this.teams = teams,
                error => this.errorMsg = error
                )
        }
    }

}
