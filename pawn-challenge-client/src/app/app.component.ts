import { AuthService } from './services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as authAction$ from './RxJs/actions/auth.action';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/home/login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { Router } from '@angular/router';
import { AuthState } from './RxJs/states/auth.state';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
  constructor(
    private store: Store<{ auth: AuthState }>,
    private AuthService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private auth: Auth
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

        );console.log(this.displayName)
      } else {
        this.displayName = 'null';
      }
    });
  }
  ngOnInit(): void {
    console.log(this.displayName)
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.idToken$.subscribe((value) => {
          this.token = value;
          this.store.dispatch(authAction$.createUser({ idToken: this.token }));
        });
      }
    });
  }

  token: string = '';
  idToken$ = this.store.select((state) => state.auth.idToken);
  logIn() {
    this.store.dispatch(authAction$.login());
  }

  logOut() {
    this.store.dispatch(authAction$.logOut());
    this.router.navigate(['/']);
    console.log('logout');
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'dialogLogin',
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      panelClass: 'dialogLogin',
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
