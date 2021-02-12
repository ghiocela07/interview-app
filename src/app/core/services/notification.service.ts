import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(private matSnackBar: MatSnackBar) { }

    public successNotification(message: string): void {
        setTimeout(() => {
            this.matSnackBar.open(message, 'OK', {
                duration: 5000,
                panelClass: ['success-snackbar']
            });
        }, 1000);
    }

    public infoNotification(message: string): void {
        setTimeout(() => {
            this.matSnackBar.open(message, 'OK', {
                duration: 5000,
                panelClass: ['info-snackbar']
            });
        }, 1000);
    }

    public errorNotification(message: string): void {
        this.matSnackBar.open(message, 'OK', {
            duration: 10000,
            panelClass: ['error-snackbar']
        });
    }

}
