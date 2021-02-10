import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(private matSnackBar: MatSnackBar) { }

    successNotification(message: string): void {
        this.matSnackBar.open(message, 'OK', {
            duration: 2000,
            panelClass: ['success-snackbar']
        });
    }

    infoNotification(message: string): void {
        this.matSnackBar.open(message, 'OK', {
            duration: 5000,
            panelClass: ['info-snackbar']
        });
    }

    errorNotification(message: string): void {
        this.matSnackBar.open(message, 'OK', {
            duration: 10000,
            panelClass: ['error-snackbar']
        });
    }

}
