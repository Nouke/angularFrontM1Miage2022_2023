import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor() { }

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
