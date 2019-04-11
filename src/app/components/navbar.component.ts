import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {LogoutService} from '../service/logout.service';


@Component({
  selector : 'cs-navbar',
  templateUrl : './navbar.component.html',
  styleUrls : [
    '../styles/navbar.component.scss'
  ]
})
export class NavbarComponent {
  constructor(private router: Router, private logoutService: LogoutService){}

  logout() {
    /*    console.log('test');*/
    this.logoutService.getlogout();
  }

}
