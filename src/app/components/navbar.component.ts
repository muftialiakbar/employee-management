import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutService} from '../service/logout.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector : 'cs-navbar',
  templateUrl : './navbar.component.html',
  styleUrls : [
    '../styles/navbar.component.scss'
  ]
})
export class NavbarComponent {
  constructor(private router: Router, private logoutService: LogoutService, private Cookies: CookieService){}

  logout() {
    this.logoutService.getlogout()
      .subscribe(res => {
        this.Cookies.delete('pushads_gpx_session','/');
        this.router.navigate(['/']);
      });
  }

}
