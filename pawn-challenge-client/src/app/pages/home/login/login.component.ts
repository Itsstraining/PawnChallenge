import { register } from './../../../RxJs/actions/auth.action';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../../../RxJs/actions/auth.action';
import { Auth } from '../../../RxJs/states/auth.state';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'PawnChallengeClient';

  constructor(
    private store: Store<{ auth: Auth, user:User }>,
    private Http: HttpClient,
    private AuthService: AuthService,
    public dialog: MatDialog
  ) {
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  idToken$ = this.store.select((state) => state.auth.idToken);
 
  
  logIn() {
    this.store.dispatch(AuthActions.login());
    // console.log(this.user)
  }
  logOut() {
    this.store.dispatch(AuthActions.logout());
    console.log('logout');
  }

  // openDialogLogin() {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     panelClass: 'dialogLogin',
  //     width: '70em',
  //     height: '68em',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
