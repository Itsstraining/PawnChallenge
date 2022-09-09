import { register } from './../../../RxJs/actions/auth.action';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../../../RxJs/actions/auth.action';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthState } from 'src/app/RxJs/states/auth.state';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
  user: User;
  email = '';
  password = '';
  userName = '';
  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.user = {
      id: '',
      createAt: '',
      email: '',
      password: '',
      userName: '',
    };
    this.authService.getCurrentUser().then(
      (user) =>
        (this.photourl = user.photourl != null ? user.photourl : user.photo)
    );
    this.authService.getCurrentUser().then(
      (user) =>
      (this.displayName =
        user.displayName != null ? user.displayName : user.email)
    );
    this.authService.isUserLoggedIn.subscribe((value) => {
      if (value) {
        this.authService.getCurrentUser().then(
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
    console.log(this.displayName)

    console.log(this.idToken$)
    throw new Error('Method not implemented.');
  }
  idToken$ = this.store.select((state) => state.auth.idToken);

  logIn() {
    this.store.dispatch(AuthActions.login());
    this.idToken$.subscribe(e => {
      if (e != '')
      alert('Login success')
        this.dialog.closeAll();
        this.router.navigateByUrl('/');
    })
  }


  loginWithAccount() {
    console.log('aaaaaaa')
    if (this.email == '') {
      alert('Please enter email');
      return;
    }
    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.authService.loginWithAccount(this.email, this.password);
    // this.store.dispatch(AuthActions.login());
    this.email = '';
    this.password = '';
    let x = this.authService.getIdToken();
    console.log(x.subscribe((value) => {
      console.log(value)
    }))
  }

}
