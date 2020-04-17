import { Component } from '@angular/core';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  templateUrl : './login.component.html',
  styleUrls : [
    '../styles/login.component.scss'
  ]
})
export class LoginComponent {

  public dataLogin = {} as any;

  constructor(
      private router: Router,
    ) {}

    doLogin() {
      if(this.dataLogin.username == 'admin' && this.dataLogin.password == 'admin'){
        this.router.navigate(['home2']);
      }else{
        Swal(
          'Oops...',
          'login failed',
          'error'
        );
      }
    }
}
