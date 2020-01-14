import {Component, OnInit} from '@angular/core';
import {GetProfileService} from '../../service/getProfile.service';
import {ProfileInterface} from '../../interface/profile.interface';

@Component({
  selector : 'p-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  public datas: ProfileInterface = [] as any;
  constructor(private service: GetProfileService) {}
  ngOnInit() {
    this.service.getProfile({})
      .subscribe(res => this.datas = res.data  );
  }
}
