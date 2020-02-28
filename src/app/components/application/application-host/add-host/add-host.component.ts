import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../../../service/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {ApplicationHostService} from '../../../../service/application-host.service';
import {ApplicationInterface} from '../../../../interface/application.interface';

@Component({
  selector: 'app-add-host',
  templateUrl: './add-host.component.html',
  styleUrls: ['./add-host.component.scss']
})
export class AddHostComponent implements OnInit {

  public dataAdd: ApplicationInterface = {} as any;
  public id : number;

  constructor(
    private service: ApplicationHostService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
  ){}


  ngOnInit(){
    this.dataAdd.isActive = 0;

    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['pid'];
      }
    );
  }

  add(e){
    this.service.add(this.id,this.dataAdd)
      .subscribe(res => {
          if (res.status === 1){
            Swal({
              title: 'Insert',
              text: 'Insert Success',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then((hasil) => {
              this.router.navigate([this.id,'host']);
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
