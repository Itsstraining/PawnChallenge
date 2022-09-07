import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as RegisterActions from '../actions/register.action';
import { catchError, from, map, switchMap } from 'rxjs';
import { of } from 'rxjs';
@Injectable()
export class registerEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      switchMap((action) => from(this.authService.register(action.user))),
      map(() => RegisterActions.registerSuccess()),
      catchError((error) => of(RegisterActions.registerFail({ error: error })))
    )
  );
}
