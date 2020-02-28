import { Component, OnInit } from '@angular/core';
import {ApplicationInterface} from '../../../../interface/application.interface';
import {ApplicationService} from '../../../../service/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {ApplicationHostService} from '../../../../service/application-host.service';

@Component({
  selector: 'app-edit-host',
  templateUrl: './edit-host.component.html',
  styleUrls: ['./edit-host.component.scss']
})
export class EditHostComponent implements OnInit {

  public editList: ApplicationInterface = {} as any;
  public id: number;
  public pid: number;
  public dataCheckName;

  constructor(
    private service: ApplicationHostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
        this.pid = +params['pid'];
      }
    );


    return this.service.getDataID(this.pid,this.id)
      .subscribe( res => {
        this.editList = res.data;
      });
  }

  edit(){
    this.service.edit(this.pid,this.editList, this.id)
      .subscribe( res => {
          if (res.status === 1){
            Swal({
              title: 'Update',
              text: 'Your file has been update',
              type: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK'
            }).then( (hasil) => {
              this.router.navigate([this.pid,'host']);
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
