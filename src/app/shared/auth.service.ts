import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from './auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loggedIn = false;

  constructor(private http: HttpClient) { }

  signupUser(username: string, password: string) {

    const authData: AuthModel = { username: username, password: password };

    this.http.post('http://localhost:8010/sign-up/', authData).subscribe(res => {
      console.log(res);
    })
  }


  logIn() {
    // devrait prendre un login et un password en parametre
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {

    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    })
    return isUserAdmin;
    // return this.loggedIn
  }
  /*

  */



}
