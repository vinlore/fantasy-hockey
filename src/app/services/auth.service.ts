import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    isLoggedIn = new ReplaySubject<boolean>();
    isLoggedIn$ = this.isLoggedIn.asObservable();

    constructor(private http: Http) {
        this.loggedIn();
    }

    loggedIn() {
        this.isLoggedIn.next(tokenNotExpired());
        return tokenNotExpired();
    }

    register(username, password, passwordConf): Promise<any> {
        let user = {
            username: username,
            password: password,
            password_confirmation: passwordConf
        }
        return this.http.post('http://localhost:8000/api/auth/register', user).toPromise()
            .then(response => {
                let token = response.json().token;
                if (token) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('id_token', token);
                    this.loggedIn();
                    return response.status;
                } else {
                    console.log(response.json().error);
                    return response.json().error;
                }
            }).catch(error => {
                console.log(error.json().error);
                return Promise.reject(error.json().error);
            })
    }

    login(username, password): Promise<any> {
        let user = {
            username: username,
            password: password
        };
        return this.http.post('http://localhost:8000/api/auth/login', user).toPromise()
            .then(response => {
                let token = response.json().token;
                if (token) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('id_token', token);
                    this.loggedIn();
                    return response.status;
                } else {
                    console.log(response.json().error);
                    return response.status;
                }
            }).catch(error => {
                console.log(error.json().error);
                return Promise.reject(error.status || error.json().error);
            })
    }

    logout(): void {
        if (localStorage.getItem('id_token')) {
            localStorage.removeItem('id_token');
        }
        if (localStorage.getItem('username')) {
            localStorage.removeItem('username');
        }
        this.loggedIn();
    }

}
