import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GetProfileService} from '../../service/getProfile.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './profile.change.component.html',
})
export class ProfileChangeComponent implements OnInit{

  public dataDate = {} as any;
  public date:any = {};
  public profile:any = {};


  constructor(private service: GetProfileService, private router: Router) {}

  ngOnInit() {
    this.service.getProfile()
      .subscribe(res => {
        this.profile = res.data;
        this.dataDate.birthdate = this.profile.birthdate;
      });
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

  change() {
    if(this.dataDate.birthdate != null){
      this.profile.birthdate = moment(this.dataDate.birthdate).format('YYYY-MM_DD');
    }
    this.service.changeProfile(this.profile).subscribe(res => {
      if(res.status == 1) {
        Swal({
          title: 'Insert',
          text: 'Success',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then((hasil) => {
          if (hasil.value) {
            this.router.navigate(['dashboard/profile']);
          }
        });
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
