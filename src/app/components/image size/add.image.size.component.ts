import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {ImageSizeService} from '../../service/image.size.service';
import {ImageSizeInterface} from '../../interface/image.size.interface';

@Component({
  templateUrl: './add.image.size.component.html'
})
export class AddImageSizeComponent {
  // public dataAdd = <any> {};
  public dataAdd : ImageSizeInterface = {} as any;
  public dataCheckAlias;
  public dataCheckName;

  constructor(
    private service: ImageSizeService,
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
                this.router.navigate(['/dashboard/image-size']);
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

  checkName(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkAlias(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
        this.dataCheckAlias = res.data;
      })
  }

}
