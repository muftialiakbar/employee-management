import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private Cookies: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.Cookies.check('pushads_session')) {
       this.router.navigate(['/']);
       return false;
    }
    return true;
  }
}
