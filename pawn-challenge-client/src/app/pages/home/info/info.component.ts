import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthState } from 'src/app/RxJs/states/auth.state';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  title = 'PawnChallengeClient';
  displayName = '';
  photourl = '';
  user: User;
  email = '';
  password = '';
  userName = '';
  constructor(
    private store: Store<{ auth: AuthState }>,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    this.user = {
      id: '',
      createAt: '',
      email: '',
      password: '',
      userName: '',
    };
    this.authService
      .getCurrentUser()
      .then(
        (user) =>
          (this.displayName =
            user.displayName != null ? user.displayName : user.email)
      );
    this.authService.isUserLoggedIn.subscribe((value) => {
      if (value) {
        this.authService
          .getCurrentUser()
          .then(
            (user) =>
              (this.displayName =
                user.displayName != null ? user.displayName : user.email)
          );
      } else {
        this.displayName = '';
      }
    });

    this.authService.getCurrentUser().then(
      (user) =>
        (this.photourl = user.photoURL != null ? user.photoURL : user.photo)
    );


  }
  ngOnInit(): void {
    console.log(this.displayName);
    console.log();
    console.log(this.idToken$);
    throw new Error('Method not implemented.');
  }
  idToken$ = this.store.select((state) => state.auth.idToken);
}
