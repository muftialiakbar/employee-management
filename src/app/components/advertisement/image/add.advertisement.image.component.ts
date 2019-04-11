import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementImageService} from '../../../service/advertisement.image.service';
import Swal from "sweetalert2";
import {AdvertisementImageInterface} from '../../../interface/advertisement.image.interface';

@Component({
  templateUrl: './add.advertisement.image.component.html'
})

export class AddAdvertisementImageComponent {
  public dataAdd : AdvertisementImageInterface = {} as any;
  public dataCheckName;
  public dataCheckEmail;
  public dataSize = [];
  urlImage= <any> [];
  public pid: number;

  constructor(
    private service: AdvertisementImageService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}


  ngOnInit(){
    this.dataAdd.isForce = 0;
    this.activatedRoute.params.subscribe(
      params => {
        this.pid = +params['pid'];
      }
    );

    this.service.getDataSize({limit: 50})
      .subscribe( res => {
        this.dataSize = res.data;
        // console.log(this.dataSize);
        this.dataAdd.image_size_id = this.dataSize[0].id;
      });
  }

  add(e){
    this.dataAdd.advertisement_id = this.pid;
    this.service.add(this.dataAdd, this.pid) .subscribe(res => {
        if (res.status === 1){
          Swal({
            title: 'Insert',
            text: 'Insert Success',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((hasil) => {
            if (hasil.value) {
              /*window.location.reload();*/
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
      }
    );
  }

  processFileImage(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlImage = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.dataAdd.image =  <File>event.target.files[0];
  }

}
