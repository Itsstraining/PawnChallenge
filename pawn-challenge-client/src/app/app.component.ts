import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import * as AuthActions from './RxJs/actions/auth.action';
import { Auth } from './RxJs/states/auth.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/home/login/login.component';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formRegister!: FormGroup;
  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
  email: string = '';
  password: string = '';
  constructor(
    private store: Store<{ auth: Auth }>,
    private AuthService: AuthService,
    public dialog: MatDialog,
    private Http: HttpClient
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

  idToken$ = this.store.select((state) => state.auth.idToken);
  logOut() {
    this.store.dispatch(AuthActions.logout());
    console.log('logout');
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'dialogLogin', 
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  register(user: User): Observable<User[]> {
    return this.Http.post<User[]>(`${environment.endPoint}/user/register`, user);
  }
  loginWithUserNameAndPassword(user: User): Observable<User[]> {
    return this.Http.post<User[]>(`${environment.endPoint}/user/login`, user);
  }
  
  registerAccount() {
    let newForm = {
      ...this.formRegister.value,
    };
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    this.store.dispatch(AuthActions.register({ user: newForm }));
}
}
