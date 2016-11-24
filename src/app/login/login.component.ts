import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: any = {};
    error: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    login(f: NgForm) {
        if (f.valid) {
            this.authService.login(this.user.username, this.user.password)
                .then(result => {
                    if (result === 200) {
                        this.router.navigate(['/']);
                    }
                }).catch(error => {
                    if (error === 401) {
                        this.error = 'Username or Password is incorrect.';
                    } else {
                        this.error = 'An error occurred. Try again later.';
                    }
                })
        }
    }

}
