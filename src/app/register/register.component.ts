import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [AuthService],
})
export class RegisterComponent implements OnInit {

    user: any = {};
    error: any = {};

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    register(f: NgForm) {
        if (f.valid) {
            this.authService.register(this.user.username, this.user.password, this.user.passwordConf)
                .then(result => {
                    if (result === 200) {
                        this.router.navigate(['/']);
                    }
                }).catch(error => {
                    this.error = error;
                })
        }
    }

}
