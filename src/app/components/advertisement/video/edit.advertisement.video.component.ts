import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementVideoService} from '../../../service/advertisement.video.service';
import Swal from "sweetalert2";
import {AdvertisementVideoInterface} from '../../../interface/advertisement.video.interface';

@Component({
  templateUrl: './edit.advertisement.video.component.html'
})

export class EditAdvertisementVideoComponent {
  public editList : AdvertisementVideoInterface = [] as any;
  public dataID: any = {};
  public pid: any = {};
  public dataSize = [];
  public urlImage = <any> [];

  constructor(
    private service: AdvertisementVideoService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.dataID = +params['id'];
        this.pid = +params['pid'];
      }
    );

    this.service.getDataID(this.pid, this.dataID)
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
              this.router.navigate(['/dashboard/advertisement/',this.pid,'video']);
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
