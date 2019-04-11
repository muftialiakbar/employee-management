import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementImageService} from '../../../service/advertisement.image.service';
import Swal from "sweetalert2";
import {AdvertisementImageInterface} from '../../../interface/advertisement.image.interface';

@Component({
  templateUrl: './edit.advertisement.image.component.html'
})

export class EditAdvertisementImageComponent {
  public editList : AdvertisementImageInterface = {} as any;
  public id: number;
  public pid: number;
  public dataSize = [];
  public urlImage= <any> [];

  constructor(
    private service: AdvertisementImageService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.editList.isForce = 0;
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.pid = +params['pid'];
      }
    );

    this.service.getDataID(this.pid, this.id)
      .subscribe( res => {
        this.editList = res.data;
        if(this.editList.link != null){
          this.urlImage = this.img(this.editList.link);
        }
      });

    this.service.getDataSize({limit: 50})
      .subscribe( res => {
        this.dataSize = res.data;
      });
  }

  edit(){
    if (this.editList.action == "null"){
      this.editList.action = '';
    }
    if (this.editList.action == null){
      this.editList.action = '';
    }
    this.service.edit(this.editList, this.pid)
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
              this.router.navigate(['/dashboard/advertisement/',this.pid,'image']);
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

  processFile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlImage = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.editList.image =  <File>event.target.files[0];
  }

  img(data){
    return this.service.image(data);
  }
}
