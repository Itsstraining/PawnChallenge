import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private Http: HttpClient) {}

  public createUserFromFirebase(idToken:string){
    return this.Http.post(`${environment.endPoint}user/send`, '', {headers: new HttpHeaders({'Authorization': `${idToken}`})});
  }

  public getUserFromFirebase(idToken:string){
    return this.Http.get(`${environment.endPoint}user/id`, {headers: new HttpHeaders({'Authorization': `${idToken}`})});
  }

  public registerAccount(email: string, password: string) {
    return this.Http.post(`${environment.endPoint}user/register`, {
      email: email,
      password: password,
    });
  }

  public loginWithEmailAndPassword(email: string, password: string) {
    return this.Http.post(`${environment.endPoint}user/login`, {
      email: email,
      password: password,
    });
  }

}
