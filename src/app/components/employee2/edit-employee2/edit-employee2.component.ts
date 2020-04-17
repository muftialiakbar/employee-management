import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../../service/Employee.service';
import {ApplicationInterface} from '../../../interface/application.interface';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-employee2',
  templateUrl: './edit-employee2.component.html',
  styleUrls: ['./edit-employee2.component.scss']
})
export class EditEmployee2Component implements OnInit {

  public editList: any  = {};
  public id: number;
  public Editor = ClassicEditor;
  public dataDate: ApplicationInterface = {} as any;
  public searchGroup: FormControl = new FormControl();
  public dataGroup :any = [];
  public maxDate =  moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');

  constructor(
    private service: EmployeeService,
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
        this.editList = res;
        this.dataDate.birthdate = res.birthdate;
      });

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

  edit(){
    if(this.dataDate.birthdate != null){
      this.editList.birthdate = moment(this.dataDate.birthdate).format('YYYY-MM-DD');
    }
    this.service.edit(this.editList)
      .subscribe( res => {
        Swal({
          title: 'Update',
          text: 'Your file has been update',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then( (hasil) => {
          this.router.navigate(['/home2']);
        });
      }, error => Swal('Server Error!', 'Please contact admin.', 'error'));
  }
}
