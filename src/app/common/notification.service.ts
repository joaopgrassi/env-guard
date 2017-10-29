import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

const DURATION = 2000;

@Injectable()
export class NotificationService {

  constructor(public snackBar: MatSnackBar) {
  }

  /**
   * Show a notification for success
   * @param {string} message
   */
  notifySuccess(message: string) {
    this.snackBar.open(message, '', {
      duration: DURATION,
      extraClasses: ['success']
    });
  }

  /**
   * Show a notification for errors
   * @param {string} message
   */
  notifyError(message: string) {
    this.snackBar.open(message, '', {
      duration: DURATION,
      extraClasses: ['error']
    });
  }

  /**
   * Show a notification for alerts
   * @param {string} message
   */
  notifyAlert(message: string) {
    this.snackBar.open(message, '', {
      duration: DURATION,
      extraClasses: ['warn']
    });
  }
}
