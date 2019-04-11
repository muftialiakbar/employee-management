import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {ImageSizeService} from '../../service/image.size.service';
import {ImageSizeInterface} from '../../interface/image.size.interface';

@Component({
  templateUrl: './edit.image.size.component.html'
})

export class EditImageSizeComponent implements OnInit{
  // public editList: any = [];
  public editList: ImageSizeInterface = [] as any;
  public id: number;
  public dataCheckAlias;
  public dataCheckName;

  constructor(
    private service: ImageSizeService,
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
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkAlias(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
        this.dataCheckAlias = res.data;
      })
  }
}
