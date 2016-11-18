import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    public token: string;

    constructor(private http: Http) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.token = currentUser.token;
        }
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
                    this.token = token;
                    let storeUser = {
                        username: username,
                        token: token
                    }
                    localStorage.setItem('currentUser', JSON.stringify(storeUser));
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
                    this.token = token;
                    let storeUser = {
                        username: username,
                        token: token
                    }
                    localStorage.setItem('currentUser', JSON.stringify(storeUser));
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
        this.token = null;
        if (localStorage.getItem('currentUser')) {
            localStorage.removeItem('currentUser');
        }
    }

}
