import { getIdToken } from './../actions/auth.action';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from '../actions/auth.action';
import { catchError, from, map, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/auth/api.service';
import { idToken } from '@angular/fire/auth';
@Injectable()
export class authEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private api: ApiService
  ) {}

  authEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => this.authService.login()),
      map((idToken) => AuthActions.loginSuccess({ idToken: idToken })),
      catchError((error) => of(AuthActions.loginFailure({ error: error })))
    )
  );

  logOutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() => this.authService.logOut()),
      map(() => AuthActions.logOutSuccess()),
      catchError((error) => of(AuthActions.logOutFailure({ error: error })))
    )
  );

  getIdTokenEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getIdToken),
      switchMap(() => this.authService.getIdToken()),
      map((idToken) => AuthActions.getIdTokenSuccess({ idToken })),
      catchError((error) => of(AuthActions.getIdTokenFailure({ error: error })))
    )
  );

  createUserEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      switchMap((state) => this.api.createUserFromFirebase(state.idToken)),
      map((user) => {
        if (!user) {
          return AuthActions.createUserSuccess({
            user: 'User is already exsited',
          });
        } else {
          return AuthActions.createUserSuccess({ user });
        }
      }),
      catchError((error) => of(AuthActions.createUserFailure({ error: error })))
    )
  );

}
