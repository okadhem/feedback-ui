import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthgardGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    let authenticated = false;
    var date = new Date();
    var milliseconds = date.getTime();
    if ((localStorage.getItem('id_token') != null) && (localStorage.getItem('expires_at') >= milliseconds.toString())) {
      authenticated = true;
    } else {
      this.router.navigate(['/login']);
    }
    return authenticated;
  }
}
