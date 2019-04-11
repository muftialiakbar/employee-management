import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../service/group.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {GroupInterface} from '../../../interface/group.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  templateUrl: './add.group.component.html'
})

export class AddGroupComponent implements OnInit{
  public dataAdd: GroupInterface = {} as any;
  public dataCheckName;
  public dataCheckEmail;
  public dataCheckCode;
  public ppid: number;
  public Editor = ClassicEditor;
  urlLogo = <any> [];
  urlBanner= <any> [];

  constructor(
    private service: GroupService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.dataAdd.isSuspend = 0;
    this.dataAdd.isActive = 0;
    this.dataAdd.description = '';
    this.dataAdd.phone = '';
    this.activatedRoute.params.subscribe(
      params => {
        this.ppid = +params['ppid'];
      }
    );
  }

  /*add(e){
    this.dataAdd.account_id = this.ppid;
    this.service.add(this.dataAdd, this.ppid)
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
                this.router.navigate(['/dashboard/account/',this.ppid,'group']);
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
  }*/

  processFileLogo(event){
    console.log(this.urlLogo);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlLogo = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.dataAdd.image_logo =  <File>event.target.files[0];
  }

  processFileBanner(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlBanner = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.dataAdd.image_banner =  <File>event.target.files[0];
  }

  checkName(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkEmail(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckEmail = res.data;
        }
      );
  }

  checkCode(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckCode = res.data;
        }
      );
  }
}
