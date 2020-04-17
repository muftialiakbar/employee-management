import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationInterface} from '../../../interface/application.interface';
import Swal from "sweetalert2";
import {EmployeeService} from '../../../service/Employee.service';
import * as moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-employee2',
  templateUrl: './add-employee2.component.html',
  styleUrls: ['./add-employee2.component.scss']
})
export class AddEmployee2Component implements OnInit {

  public dataAdd: ApplicationInterface = {} as any;
  public dataDate: ApplicationInterface = {} as any;
  public Editor = ClassicEditor;
  public searchGroup: FormControl = new FormControl();
  public dataGroup :any = [];
  public maxDate =  moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');

  constructor(
    private router : Router,
    private service : EmployeeService,
  ){}


  ngOnInit(){
    this.dataAdd.description = '';


    this.dataGroup = {
      "data": [
        {
          "id": 2,
          "name": "Optik Melawai",
        },
        {
          "id": 3,
          "name": "Telkom",
        },
        {
          "id": 4,
          "name": "AKSI",
        },
        {
          "id": 5,
          "name": "Cwimie dan Siomay Bu Shinta",
        },
        {
          "id": 6,
          "name": "Hypermart",
        },
        {
          "id": 7,
          "name": "Cafe Geni",
        },
        {
          "id": 12,
          "name": "Mizzle",
        }
      ]
    }
  }

  add(e){
    if(this.dataDate.birthdate != null){
      this.dataAdd.birthdate = moment(this.dataDate.birthdate).format('YYYY-MM-DD');
    }
    this.service.add(this.dataAdd)
      .subscribe(res => {
        if (res.id > 0){
          Swal({
            title: 'Insert',
            text: 'Insert Success',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((hasil) => {
            this.router.navigate(['/home2']);
          });
        }else{
          Swal(
            'Oops...',
            res.status_message,
            'error'
          );
        }
      }, error => Swal('Server Error!', 'Please contact admin.', 'error'));
  }
}
