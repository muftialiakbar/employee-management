import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {EmployeeService} from '../../../service/Employee.service';
import Swal from "sweetalert2";
import  {Http, Response, Headers} from  '@angular/http';

@Component({
  selector: 'app-view-employee2',
  templateUrl: './view-employee2.component.html',
  styleUrls: ['./view-employee2.component.scss']
})
export class ViewEmployee2Component implements OnInit {

  public datas: any = [];
  public dataPage: any = {};
  public list: any = [];
  public page: number = 1;
  public searchKey: FormControl = new FormControl();
  public group: string;
  public filter : any = {};
  public perPage : number;
  public currentPage: number;
  public limit = 20;


  constructor(
    private http: Http,
    private service: EmployeeService
    ) {}


  ngOnInit(){
    this.service.getData({})
      .subscribe( res => {
        this.datas = res;
      });

  }

  getData(){
    this.service.getData({})
      .subscribe( res => {
        this.datas = res;
      });
  }

  getID(id){
    return this.service.getDataID(id)
      .subscribe( res => {
        this.list = res;
      }, error1 => Swal('Server Error!', 'Please contact admin.', 'error'));
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
        this.service.delete( id)
          .subscribe(res => {
              Swal({
                title: 'Delete',
                text: 'Your file has been deleted',
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK'
              }).then((hasil) => {
                this.getData();
              });
            },
            error => console.log(error)
          );
      }
    });
  }

  convert(data){
    if(parseInt(data) >= 1000){
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return data;
    }
  }
}
