import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as AuthActions from '../actions/auth.action';
import { AuthState } from '../states/auth.state';

const initialState: AuthState = {
  isAuthenticated: false,
  idToken: '',
  error: '',
  _id: '',
  user: <User>{}
};
export const authReducer = createReducer(
  initialState,
  /////////////////////////////////////////////////////////////
  on(AuthActions.login, (state,action) => {
    console.log(action.type);
    return state
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
      idToken: action.idToken,
    };
    console.log(action.type);
    return newState;
  }),

  on(AuthActions.loginFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error,
    };
    console.log(newState);
    return newState;
  }),

  ////////////////////////////////////////////////////////////////////
  on(AuthActions.register, (state, action) => {
    console.log(action.type);
    return state;
  }),
  on(AuthActions.registerSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
    };
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.registerFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error,
    };
    console.log(newState);
    return newState;
  }),

  ////////////////////////////////////////////////////////////////////
  on(AuthActions.logOut, (state,action) => {
    console.log(action.type);
    return state
  }),
  on(AuthActions.logOutSuccess, (state, action) => {
    let newState = {
      ...state,
      idToken: '',
      _id: '',
      isAuthenticated: false,
    };
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.logOutFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error,
    };
    console.log(action.error);
    return newState;
  }),

  ///////////////////////////////////////////////////////////////////
  on(AuthActions.createUser, (state, action) => {
    console.log(action.type);
    return state;
  }),
  on(AuthActions.createUserSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
      user: action.user
    }
    console.log(newState.user);
    return newState;
  }), on(AuthActions.createUserFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error
    }
    console.log(newState);
    return state;
  }),

  ///////////////////////////////////////////////////////////////////
  on(AuthActions.getIdToken, (state, action) => {
    console.log(action.type);
    return state;
  }),
  on(AuthActions.getIdTokenSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
      idToken: action.idToken,
    }
    console.log(action.idToken);
    return newState;
  }), on(AuthActions.getIdTokenFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error
    }
    console.log(newState);
    return state;
  }),

  /////////////////////////////////////////////////////////////
  on(AuthActions.getUserId, (state, action) => {
    let newState = {
      ...state,
    }
    console.log(action.type);
    return newState;
  }),
  // on(AuthActions.getUserIdSuccess, (state, action) => {
  //   let newState = {
  //     ...state,
  //     isAuthenticated: true,
  //     _id: action._id,
  //   }
  //   console.log(action._id);
  //   return newState;
  // }),
  on(AuthActions.getUserIdFailure, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: false,
      error: action.error
    }
    console.log(action.type);
    return newState;
  }),
)
