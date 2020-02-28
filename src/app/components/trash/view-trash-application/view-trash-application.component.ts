import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApplicationService} from '../../../service/application.service';
import Swal from "sweetalert2";
import {ApplicationInterface} from '../../../interface/application.interface';

@Component({
  selector: 'app-view-trash-application',
  templateUrl: './view-trash-application.component.html',
  styleUrls: ['./view-trash-application.component.scss']
})
export class ViewTrashApplicationComponent implements OnInit {

  public datas: ApplicationInterface[] = [];
  public dataPage: any = {};
  public list: ApplicationInterface = [] as any;
  public page: number = 1;
  public searchKey: FormControl = new FormControl();
  public group: string;
  public filter : any = {};
  public perPage : number;
  public currentPage: number;
  public limit = 20;

  constructor(
    private service : ApplicationService
  ) {}

  ngOnInit(){

    this.service.getData({trashed: 1})
      .subscribe( res => {
        this.datas = res.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  getID(id){
    return this.service.getDataIDTrash({id: id,trashed: 1})
      .subscribe( res => {
        this.list = res.data;
      });
  }


  search(event){
    if(event.value == ''){
      this.service.getData({'keys' : 'name', 'keyword': this.searchKey.value})
        .subscribe( key => {
          this.datas = key.data.data;
          this.dataPage = key.data;
        });
    }
  }

  getData(){
    this.service.getData({trashed: 1})
      .subscribe( res => {
        this.datas = res.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }



  deletePermanent(id){
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete permanent!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deletePermanent(id)
          .subscribe(res => {
              if (res.status === 1) {
                Swal({
                  title: 'Delete',
                  text: 'Your file has been deleted',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK'
                }).then((hasil) => {
                  this.getData();
                });
              } else {
                Swal(
                  'Oops...',
                  res.status_message,
                  'error'
                );
              }
            },
            error => console.log(error)
          );
      }
    });
  }


  restore(id){
    Swal({
      title: 'Are you sure?',
      text: 'restore this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.restore(id)
          .subscribe(res => {
              if (res.status === 1) {
                Swal({
                  title: 'Restore',
                  text: 'Your file has been restore',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK'
                }).then((hasil) => {
                  this.getData();
                });
              } else {
                Swal(
                  'Oops...',
                  res.status_message,
                  'error'
                );
              }
            },
            error => console.log(error)
          );
      }
    });
  }
}
