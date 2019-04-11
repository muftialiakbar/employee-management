import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementVideoService} from '../../../service/advertisement.video.service';
import Swal from "sweetalert2";
import {AdvertisementVideoInterface} from '../../../interface/advertisement.video.interface';

@Component({
  templateUrl: './add.advertisement.video.component.html'
})

export class AddAdvertisementVideoComponent {
  public dataAdd : AdvertisementVideoInterface = {} as any;
  public dataCheckName;
  public dataCheckEmail;
  public dataSize = [];
  public pid: number;
  urlImage = <any> [];

  constructor(
    private service: AdvertisementVideoService,
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
        this.dataAdd.video_size_id = this.dataSize[0].id;
      });
  }

  add(e){
    this.dataAdd.advertisement_id = this.pid;
    this.service.add(this.dataAdd, this.pid)
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
              /*window.location.reload();*/
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
      }
    );
  }

  checkEmail(check){
    this.service.exist(check, this.dataAdd.email)
      .subscribe( res => {
        this.dataCheckEmail = res.data;
      })
  }


  processFile(event){
    console.log(this.urlImage);
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
