import { Component, OnInit } from '@angular/core';
import {ApplicationInterface} from '../../../../interface/application.interface';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {ApplicationKeyService} from '../../../../service/application-key.service';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.scss']
})
export class AddKeyComponent implements OnInit {

  public dataAdd: ApplicationInterface = {} as any;
  public id : number;

  constructor(
    private service: ApplicationKeyService,
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
              this.router.navigate([this.id,'key']);
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
