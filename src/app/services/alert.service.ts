import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Alert } from '../models/alert';

@Injectable()
export class AlertService {

    alert = new ReplaySubject<Alert>();
    alert$ = this.alert.asObservable();

    constructor() { }

    addAlert(type, message) {
        let alert = {type: type, message: message};
        this.alert.next(new Alert(alert));
        this.alert.debounceTime(5000).subscribe(() => this.alert.next(null));
    }

}
