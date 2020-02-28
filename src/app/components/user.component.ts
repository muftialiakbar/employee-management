import {Component, Input} from '@angular/core';
import {GetProfileService} from '../service/getProfile.service';
import {ProfileInterface} from '../interface/profile.interface';

@Component({
  selector : 'cs-user',
  templateUrl : './user.component.html',
  styleUrls : [
    '../styles/user.component.scss'
  ]
})
export class UserComponent {
  @Input() name: string;
  @Input() image_photo: string;
  // public datas: ProfileInterface = [] as any;
  public datas: ProfileInterface = [] as any;
  constructor(private service: GetProfileService) {}
  ngOnInit() {
    /*this.service.getProfile({})
      .subscribe(res => {
        this.datas = res.data
      });*/
  }
}
