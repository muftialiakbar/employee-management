import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {CategoryInterface} from '../../interface/category.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  templateUrl: './add.category.component.html'
})

export class AddCategoryComponent implements OnInit{

  public dataAdd: CategoryInterface = {} as any;
  public dataCheckName;
  public dataCheckCode;
  urlIcon = <any> [];
  urlBanner= <any> [];
  public Editor = ClassicEditor;
  public datas: CategoryInterface[] = [];

  constructor(
    private service: CategoryService,
    private router: Router
  ){}

  ngOnInit(){
    this.dataAdd.isActive = 0;
    this.dataAdd.isFeatured = 0;
    this.dataAdd.description = '';
    this.service.getData({limit: 50})
      .subscribe( res => {
        this.datas = res.data.data;
        if(this.datas.length >0){
          this.dataAdd.parent_id = this.datas[0].id;
        }
      });
  }

  add(e){
    if(this.dataAdd.sort == null){
      this.dataAdd.sort = 0;
    }
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
                this.router.navigate(['/dashboard/category']);
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

  processFileIcon(event){
    console.log(this.urlIcon);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlIcon = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
      this.dataAdd.image_icon =  <File>event.target.files[0];
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

  checkCode(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckCode = res.data;
        }
      );
  }
}
