import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './services/alert.service';

import { Alert } from './models/alert';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    subscription: Subscription;
    alert: Alert;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.subscription = this.alertService.alert$
            .subscribe(alert => {
                this.alert = alert;
            });
    }

}
