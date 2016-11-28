import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ReplaySubject, Observable, Subscription } from 'rxjs';

import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    refreshSubscription: any;
    isLoggedIn = new ReplaySubject<boolean>();
    isLoggedIn$ = this.isLoggedIn.asObservable();

    constructor(private http: Http, private authHttp: AuthHttp, private jwtHelper: JwtHelper) {
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
                    this.scheduleRefresh();
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
                    this.scheduleRefresh();
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
        this.unscheduleRefresh();
        this.loggedIn();
    }

    refresh() {
        let token = localStorage.getItem('id_token');
        let headers: Headers = new Headers;
        headers.set('Authorization', 'Bearer ' + token);
        let options: RequestOptions = new RequestOptions({ headers: headers });

        return this.http.get('http://localhost:8000/api/auth/refresh-token', options).toPromise()
            .then(response => {
                let token = response.headers.get('Authorization').replace('Bearer ', '');
                if (token) {
                    localStorage.setItem('id_token', token);
                    this.loggedIn();
                }
            })
    }

    // Returns an observable with an interval equal to the delay and subscribing it so that it calls refresh after the delay time
    scheduleRefresh() {
        let source = this.authHttp.tokenStream
            .flatMap(token => {
                let jwtIat = this.jwtHelper.decodeToken(token).iat;
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                let iat = new Date(0);
                let exp = new Date(0);
                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

                if (delay > 3600000) {
                    delay = 3600000;
                }

                return Observable.interval(delay);
            })

        this.refreshSubscription = source.subscribe(() => {
            this.refresh();
        })
    }

    // Return an observable with a timer equal to the time until token expiry and subscribing it to call refresh and schedule further refreshing
    startupTokenRefresh() {
        if (localStorage.getItem('id_token')) {
            let source = this.authHttp.tokenStream
                .flatMap(token => {
                    let now = new Date().valueOf();
                    let jwtExp = this.jwtHelper.decodeToken(token).exp;
                    let exp = new Date(0);
                    exp.setUTCSeconds(jwtExp);
                    let delay = exp.valueOf() - now;

                    if (!tokenNotExpired()) {
                        delay = 0;
                    }

                    return Observable.timer(delay);
                })

            source.subscribe(() => {
                this.refresh();
                this.scheduleRefresh();
            })
        }
    }

    // Unsubscribe from any refreshing after logout
    unscheduleRefresh() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

}
