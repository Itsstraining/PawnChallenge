import { Component, OnInit } from '@angular/core';
import { register } from 'src/app/RxJs/actions/auth.action';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from 'src/app/RxJs/actions/auth.action';
import { Auth } from 'src/app/RxJs/states/auth.state';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  displayName = '';
  photourl = '';
  user: User;
  email = '';
  password = '';
  userName = '';

  constructor(    private store: Store<{ user:User }>,
    private Http: HttpClient,
    private AuthService: AuthService,
    public dialog: MatDialog) {
      this.user = {
        id: '',
        createAt: '',
        email: '',
        password: '',
        userName: '',
      };
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

  register() {
    console.log(this.user);
    this.store.dispatch(AuthActions.register({ user: this.user }));
  }

  users$ = this.store.select((state) => state.user);

  registerAccount() {
    if (this.userName == '') {
      alert('Please enter your username');
      return;
    }
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    this.store.dispatch((register({ user: this.user })));
  }

  

}
