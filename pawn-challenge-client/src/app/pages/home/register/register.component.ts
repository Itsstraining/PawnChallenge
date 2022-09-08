import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../../../RxJs/actions/auth.action';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private store: Store<{ auth: Auth }>,
    private AuthService: AuthService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}
  ngOnInit(): void {}
  register() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }
   // alert('aaa');
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
