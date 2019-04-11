import {Component, OnInit} from '@angular/core';
import {GetProfileService} from '../../service/getProfile.service';

@Component({
  selector : 'p-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  public datas = [];
  constructor(private service: GetProfileService) {}
  ngOnInit() {
    this.service.getProfile()
      .subscribe(res => this.datas = res.data  );
  }
}
