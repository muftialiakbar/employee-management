import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApplicationService} from '../../../service/application.service';
import Swal from "sweetalert2";
import {ApplicationInterface} from '../../../interface/application.interface';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit {

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
  public cekAll : boolean;

  constructor(
    private service : ApplicationService
  ) {}

  ngOnInit(){
    this.service.getData({page: this.page})
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  getID(id){
    return this.service.getDataID(id)
      .subscribe( res => {
        this.list = res.data;
      });
  }


  checklist(){
    //merubah allcheck menjadi uncheck jika salah satu tidak di ceklis
    if(this.cekAll == true){
      this.cekAll = false;
    }
  }

  pageChange(page) {
    this.filter.page = page;
    this.filter['keys'] =  'name';
    this.filter.limit = this.limit;
    this.service.getData(this.filter)
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  perPageChange(count){
    this.limit = count;
    this.filter['keys'] =  'name';
    this.filter.limit = count;
    this.filter.page = this.page;
    this.service.getData(this.filter)
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  startsearch(){
    if(this.searchKey.value != null){
      this.filter['keyword'] = this.searchKey.value;
    }
    this.filter['keys'] =  'name';
    this.service.getData(this.filter)
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
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

  activate(id){
    this.service.activate(id)
      .subscribe(res => {
          if (res.status === 1) {
            Swal({
              title: 'ACTIVATE',
              text: 'Your file has been activate',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then((hasil) => {
              // this.pageChange(this.page);
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


  deactivate(id){
    this.service.deactivate([id])
      .subscribe(res => {
          if (res.status === 1) {
            Swal({
              title: 'DEACTIVATE',
              text: 'Your file has been deactivate',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then((hasil) => {
              // this.pageChange(this.page);
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

  getData(){
    this.service.getData({page: this.page})
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  delete(id){
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.delete(id)
          .subscribe(res => {
              if (res.status === 1) {
                Swal({
                  title: 'Delete',
                  text: 'Your file has been deleted',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK'
                }).then((hasil) => {
                  // this.pageChange(this.page);
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
                  // this.pageChange(this.page);
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
                  // this.pageChange(this.page);
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

  suspend(id){
    Swal({
      title: 'Are you sure?',
      text: 'Suspend this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.suspend(id)
          .subscribe(res => {
              if (res.status === 1) {
                Swal({
                  title: 'Suspend',
                  text: 'Your file has been suspend',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK'
                }).then((hasil) => {
                  // this.pageChange(this.page);
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


  unsuspend(id){
    Swal({
      title: 'Are you sure?',
      text: 'Unsuspend this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.unsuspend(id)
          .subscribe(res => {
              if (res.status === 1) {
                Swal({
                  title: 'Unsuspend',
                  text: 'Your file has been unsuspend',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK'
                }).then((hasil) => {
                  // this.pageChange(this.page);
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


  regenerateKey(id){
    Swal({
      title: 'Are you sure?',
      text: 'regenerate this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.regenerateKey(id)
          .subscribe(res => {
              if (res.status === 1) {
                Swal({
                  title: 'Regenerate',
                  text: 'Your file has been regenerate',
                  type: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'OK'
                }).then((hasil) => {
                  // this.pageChange(this.page);
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
