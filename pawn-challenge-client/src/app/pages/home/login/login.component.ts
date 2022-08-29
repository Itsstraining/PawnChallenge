import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../../../actions/auth.action';
import { Auth } from '../../../states/auth.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
  constructor(
    private store: Store<{ auth: Auth }>,
    private AuthService: AuthService,
    public dialog: MatDialog
  ) {
    this.AuthService.getCurrentUser().then(
      (user) =>
        (this.photourl = user.photourl != null ? user.photourl : user.photo)
    );
    this.AuthService.getCurrentUser().then(
      (user) =>
        (this.displayName =
          user.displayName != null ? user.displayName : user.email)
    );
    this.AuthService.isUserLoggedIn.subscribe((value) => {
      if (value) {
        this.AuthService.getCurrentUser().then(
          (user) =>
            (this.displayName =
              user.displayName != null ? user.displayName : user.email)
        );
      } else {
        this.displayName = 'null';
      }
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  idToken$ = this.store.select((state) => state.auth.idToken);
  logIn() {
    this.store.dispatch(AuthActions.login());
  }
  logOut() {
    this.store.dispatch(AuthActions.logout());
    console.log('logout');
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'dialogLogin', 
      width: '70em',
      height: '68em',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
