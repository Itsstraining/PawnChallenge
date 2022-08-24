import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth/auth.service';
import * as AuthActions from '../actions/auth.action';
import { catchError, map, switchMap } from 'rxjs';
import { of } from 'rxjs';
@Injectable()
export class authEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => this.authService.login()),
      map((idToken) => AuthActions.loginSuccess({ idToken: idToken })),
      catchError((error) => of(AuthActions.loginFail({ error: error })))
    )
  );
  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => this.authService.logOut()),
      map(() => AuthActions.logoutSuccess()),
      catchError((error) => of(AuthActions.logoutFail({ error: error })))
    )
  );
}
