import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return false;

    // Ici, on utilise le service qui renvoie une promesse qui dit si on est admin ou pas
    /*return this.authService.isAdmin()
     .then((authentifie): boolean => {
      if (authentifie) {
        console.log("j'autorise la navigation");
        return true;
      } else {
        console.log("je n'autorise pas");
        this.router.navigate(["/home"]);
        return false;
      }
    })*/

    return (this.authService.checkIsLoggedIn() || this.authService.checkIsAdmin())
      .then(authentifie => {
        if (authentifie) {
          return true;
        }
        else {
          return false;
        }
      })
  }

}
