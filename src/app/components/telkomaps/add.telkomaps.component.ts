import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {TelkomapsInterface} from '../../interface/telkomaps.interface';
import {TelkomapsService} from '../../service/telkomaps.service';

@Component({
  templateUrl: './add.telkomaps.component.html'
})
export class AddTelkomapsComponent {
  public dataAdd : TelkomapsInterface = {} as any;
  public dataCheckAp_name;
  public dataCheckLoc_id;

  constructor(
    private service: TelkomapsService,
    private router : Router
  ){}

  add(e){
    this.service.add(this.dataAdd)
      .subscribe(res => {
          if (res.status === 1){
            Swal({
              title: 'Insert',
              text: 'Insert Success',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then((hasil) => {
              if (hasil.value) {
                this.router.navigate(['/dashboard/telkom-aps']);
              }
            });
          }else{
            Swal(
              'Oops...',
              res.status_message,
              'error'
            );
          }
        }
      );
  }

  checkLoc_id(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckLoc_id = res.data;
        }
      );
  }

  checkAp_name(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
        this.dataCheckAp_name = res.data;
      });
  }

}
