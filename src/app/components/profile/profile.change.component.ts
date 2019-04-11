import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GetProfileService} from '../../service/getProfile.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './profile.change.component.html',
})
export class ProfileChangeComponent implements OnInit{
  constructor(private service: GetProfileService, private router: Router) {}

  date:any = {};
  profile:any = {};

  ngOnInit() {
    this.service.getProfile().subscribe(res => this.profile = res.data)
  }

  doChangeProfile() {
    this.service.changeProfile(this.profile).subscribe(res => {
      if(res.status == 1) {
        this.router.navigate(['dashboard/profile']);
      } else {
        Swal('Warning!', 'Please check your form.', 'warning')
      }
    }, error1 => Swal('Server Error!', 'Please contact admin.', 'error'));
  }

  dateConvert(name) {
    if(this.date[name] != null) {
      this.profile[name] = moment(this.date[name]).format('YYYY-MM-DD');
    }
  }
}
