import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GetProfileService} from '../../service/getProfile.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './change-password.component.html',
  // styleUrls: ['../styles/change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit{
  constructor(private service: GetProfileService, private router: Router) {}

  changePassword:any = {};

  ngOnInit() {
  }

  doChange() {
    this.service.changePassword(this.changePassword).subscribe(res => {
      if(res.status == 1) {
        this.router.navigate(['dashboard'])
      } else {
        Swal('Warning!', 'Please check your form.', 'warning')
      }
    }, error1 => Swal('Server Error!', 'Please contact admin.', 'error'));

  }

  change() {
    this.service.changePassword(this.changePassword).subscribe(res => {
      if(res.status == 1) {
        this.router.navigate(['dashboard'])
      } else {
        Swal('Warning!', 'Please check your form.', 'warning')
      }
    }, error1 => Swal('Server Error!', 'Please contact admin.', 'error'));

  }
}
