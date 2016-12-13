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
})
export class MenuComponent implements OnInit {

    loggedIn: boolean;
    loggedInSub: Subscription;
    username: string;
    errorMsg: string;
    teamName: string;
    customTeams: CustomTeam[];
    customTeamsSub: Subscription;

    constructor(
        private authService: AuthService,
        private customTeamService: CustomTeamService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loggedInSub = this.authService.isLoggedIn$
            .subscribe(loggedIn => {
                this.loggedIn = loggedIn;
            });
        this.customTeamsSub = this.customTeamService.customTeams$
            .subscribe(customTeams => {
                this.customTeams = customTeams;
            })
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.loggedInSub.unsubscribe();
        this.customTeamsSub.unsubscribe();
    }

    createTeam(f: NgForm) {
        if (f.valid && this.loggedIn) {
            this.customTeamService.createTeam(this.teamName)
                .subscribe(
                team => {
                    this.router.navigate(['/custom-teams', team.id])
                },
                error => this.errorMsg = error
                )
        }
    }

}
