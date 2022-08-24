import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Auth] Login",
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ idToken: string }>()
);

export const loginFail = createAction(
  "[Auth] Login Fail",
  props<{ error: string }>()
)

export const logout = createAction(
  "[Auth] Logout"
);

export const logoutSuccess = createAction(
  "[Auth] Logout Success"
);

export const logoutFail = createAction(
  "[Auth] Logout Fail",
  props<{ error: string }>()
);
