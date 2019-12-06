import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {CookieService} from 'ngx-cookie-service';
import Swal from "sweetalert2";

@Component({
  templateUrl : './login.component.html',
  styleUrls : [
    '../styles/login.component.scss'
  ]
})
export class LoginComponent {
 /* data = {
    email: '',
    password: ''
  };*/
  public dataLogin = {} as any;

  constructor(
      private router: Router,
      private service: LoginService,
      private Cookies: CookieService
    ){
      if(Cookies.check('pushads_gpx_session')){
        router.navigate(['/dashboard']);
      }
    }

    doLogin() {
      this.service.login(this.dataLogin)
        .subscribe(res => {
        if (res.status == 1) {
          this.Cookies.set('pushads_gpx_session', res.data.id, new Date(res.data.expired_at));
          this.router.navigate(['dashboard']);
        } else {
          Swal(
            'Oops...',
            'login failed',
            'error'
          );
        }
      }, error1 => Swal('Server Error!', 'Please contact admin.', 'error'));
    }
}
