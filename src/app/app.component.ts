import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { CustomTeamService } from './services/custom-team.service';

import { Alert } from './models/alert';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CustomTeamService]
})
export class AppComponent implements OnInit {

    loggedInSub: Subscription;
    alertSub: Subscription;
    alert: Alert;

    constructor(
        private alertService: AlertService,
        private authService: AuthService,
        private customTeamService: CustomTeamService,
    ) {}

    ngOnInit() {
        this.authService.startupTokenRefresh();
        this.alertSub = this.alertService.alert$
            .subscribe(alert => {
                this.alert = alert;
            });
        this.loggedInSub = this.authService.isLoggedIn$
            .subscribe(loggedIn => {
                if (loggedIn) this.customTeamService.getTeams();
                else this.customTeamService.clearTeams();
            });
    }

    ngOnDestroy() {
        this.loggedInSub.unsubscribe();
        this.alertSub.unsubscribe();
    }

}
