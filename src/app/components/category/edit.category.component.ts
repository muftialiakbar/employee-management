import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import Swal from "sweetalert2";
import {CategoryInterface} from '../../interface/category.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  templateUrl: './edit.category.component.html'
})

export class EditCategoryComponent {
  public editList: CategoryInterface = {} as any;
  public id: number;
  public dataCheckName;
  public dataCheckCode;
  urlIcon = <any> [];
  urlBanner= <any> [];
  public Editor = ClassicEditor;
  dataParent: number;
  public datas: CategoryInterface[] = [];


  constructor(
    private service: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
  }

  ngOnInit(){
    this.editList.isActive = 0;
    this.editList.isFeatured = 0;
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

    this.service.getDataID(this.id)
      .subscribe( res => {
        this.editList = res.data;
        this.dataParent = this.editList.parent_id;
        if(this.editList.image_icon != null){
          this.urlIcon = this.icon(this.editList.image_icon);
        }
        if(this.editList.image_banner !=null){
          this.urlBanner = this.banner(this.editList.image_banner);
        }
        if (this.editList.sort == 0){
          this.editList.sort = null;
        }
        if (this.dataParent == null){
          this.dataParent = 0;
        }
      });

    this.service.getData({})
      .subscribe( res => {
        this.datas = res.data.data;
      });
  }

  edit(){
    if(this.editList.sort == null){
      this.editList.sort = 0;
    }
    if (this.editList.parent_id == null){
      this.editList.parent_id = 0;
    }
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
      });
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
    this.editList.image_icon =  <File>event.target.files[0];
  }

  processFileBanner(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlBanner = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.editList.image_banner =  <File>event.target.files[0];
  }

  checkName(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkCode(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckCode = res.data;
        }
      );
  }

  icon(data){
    return this.service.icon(data);
  }

  banner(data){
    return this.service.banner(data);
  }
}
