import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {GroupInterface} from '../../interface/group.interface';
import {GroupService} from '../../service/group.service';

@Component({
  templateUrl: './edit.group.component.html'
})

export class EditGroupComponent {
  public editList: GroupInterface = {} as any;
  public id: number;
  urlLogo = <any> [];
  urlBanner= <any> [];
  public dataCheckName;
  public dataCheckEmail;
  public dataCheckCode;
  public Editor = ClassicEditor;

  constructor(
    private service: GroupService,
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
        if(this.editList.image_logo != null){
          this.urlLogo = this.logo(this.editList.image_logo);
        }
        if(this.editList.image_banner != null){
          this.urlBanner = this.banner(this.editList.image_banner);
        }
        if(this.editList.phone == "null"){
          this.editList.phone = '';
        }
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
              this.router.navigate(['/dashboard/group']);
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

  processFileLogo(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.urlLogo = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.editList.image_logo =  <File>event.target.files[0];
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

  checkEmail(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckEmail = res.data;
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

  logo(data){
    return this.service.logo(data);
  }

  banner(data){
    return this.service.banner(data);
  }
}
