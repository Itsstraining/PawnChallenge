import { User } from "src/app/models/user.model";

export interface AuthState{
  isAuthenticated: boolean;
  idToken: string;
  error: string;
  _id: string;
  user: User;
}



