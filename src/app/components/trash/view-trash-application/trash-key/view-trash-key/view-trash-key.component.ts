import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApplicationKeyService} from '../../../../../service/application-key.service';
import {ActivatedRoute} from '@angular/router';
import Swal from "sweetalert2";
import {ApplicationInterface} from '../../../../../interface/application.interface';

@Component({
  selector: 'app-view-trash-key',
  templateUrl: './view-trash-key.component.html',
  styleUrls: ['./view-trash-key.component.scss']
})
export class ViewTrashKeyComponent implements OnInit {

  public datas: ApplicationInterface[] = [];
  public dataPage: any = {};
  public list: ApplicationInterface = [] as any;
  public page: number = 1;
  public searchKey: FormControl = new FormControl();
  public group: string;
  public filter : any = {};
  public dataExcel: ApplicationInterface[] = [];
  public perPage : number;
  public currentPage: number;
  public limit = 20;
  public pid;

  constructor(
    private service : ApplicationKeyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(){
    // this.list.isHidden = true;

    this.activatedRoute.params.subscribe(
      params => {
        this.pid = +params['pid'];
      }
    );


    this.service.getData(this.pid)
      .subscribe( res => {
        this.datas = res.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  getID(id){
    return this.service.getDataID(this.pid,id)
      .subscribe( res => {
        this.list = res.data;
      });
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
    this.service.activate(this.pid,id)
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
    this.service.deactivate(this.pid,id)
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
    this.service.getData(this.pid)
      .subscribe( res => {
        this.datas = res.data;
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
        this.service.delete(this.pid,id)
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
}
