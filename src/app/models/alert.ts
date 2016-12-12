export class Alert {
    type: string;
    message: string;

    constructor(alert) {
        this.type = alert.type;
        this.message = alert.message;
    }
}
