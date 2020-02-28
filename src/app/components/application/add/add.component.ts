import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {ApplicationService} from '../../../service/application.service';
import {ApplicationInterface} from '../../../interface/application.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public dataAdd: ApplicationInterface = {} as any;

  constructor(
    private service: ApplicationService,
    private router : Router
  ){}


  ngOnInit(){
      this.dataAdd.isActive = 0;
  }

  add(e){
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
              this.router.navigate(['']);
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
}
