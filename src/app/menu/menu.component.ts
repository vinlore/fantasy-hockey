import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    loggedIn: boolean;
    subscription: Subscription;
    username: string;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.subscription = this.authService.isLoggedIn$
            .subscribe( loggedIn => this.loggedIn = loggedIn );
    }

    logout(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
