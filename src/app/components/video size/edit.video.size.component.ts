import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {VideoSizeService} from '../../service/video.size.service';
import {VideoSizeInterface} from '../../interface/video.size.interface';

@Component({
  templateUrl: './edit.video.size.component.html'
})

export class EditVideoSizeComponent {
  public editList: VideoSizeInterface = {} as any;
  public id: number;
  public dataCheckName;
  public dataCheckAlias;

  constructor(
    private service: VideoSizeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

    this.service.getDataID(this.id)
      .subscribe( res => {
        this.editList = res.data;
      });
  }

  edit(){
    this.service.edit(this.editList)
      .subscribe( res => {
        if (res.status === 1){
          Swal({
            title: 'Update',
            text: 'Your file has been update',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then( (hasil) => {
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
      });
  }


  checkName(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkAlias(field, event){
    this.service.exist(field, { except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckAlias = res.data;
        }
      );
  }
}
