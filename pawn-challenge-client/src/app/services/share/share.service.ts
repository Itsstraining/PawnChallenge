import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar) { }

  openSnackbar(content: string, button: string) {
    const snack = this.snackBar.open(content, button, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  cutString(str: string, max: number) {
    if (str.length <= max) return str
    return str.substring(0, max - 3) + '...';
  }

  getRandomIntAndIgno(min: number, max: number, igno: number) {
    let x = 0
    do {
      x = Math.floor(Math.random() * (max - min) + min);
    } while (x == igno)
    return x
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
