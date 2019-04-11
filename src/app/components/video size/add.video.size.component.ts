import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {VideoSizeService} from '../../service/video.size.service';
import {VideoSizeInterface} from '../../interface/video.size.interface';


@Component({
  templateUrl: './add.video.size.component.html'
})

export class AddVideoSizeComponent implements OnInit{

  public dataAdd: VideoSizeInterface = {} as any;
  public dataCheckName;
  public dataCheckAlias;

  constructor(
    private service: VideoSizeService,
    private router: Router
  ){}

  ngOnInit(){
  }

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
                this.router.navigate(['/dashboard/video-size']);
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
        }
      );
  }
}
